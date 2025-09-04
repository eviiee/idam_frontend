'use client'

import React, { createContext, useContext, useMemo, useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'
import styles from './modal.module.scss'
import type { ModalDescriptor, ConfirmOptions } from './types'

declare global {
    interface CSSStyleDeclaration {
        msOverflowStyle: string;
    }
}

// ---------- Utilities ----------
let lockCount = 0
function getScrollbarWidth() {
    if (typeof window === 'undefined') return 0
    const scrollDiv = document.createElement('div')
    scrollDiv.style.visibility = 'hidden'
    scrollDiv.style.overflow = 'scroll'
    scrollDiv.style.msOverflowStyle = 'scrollbar'
    scrollDiv.style.position = 'absolute'
    scrollDiv.style.top = '-9999px'
    scrollDiv.style.width = '50px'
    scrollDiv.style.height = '50px'
    document.body.appendChild(scrollDiv)
    const inner = document.createElement('div')
    inner.style.width = '100%'
    inner.style.height = '100%'
    scrollDiv.appendChild(inner)
    const scrollbarWidth = scrollDiv.offsetWidth - inner.offsetWidth
    scrollDiv.parentNode?.removeChild(scrollDiv)
    return scrollbarWidth
}

function lockBodyScroll() {
    if (typeof document === 'undefined') return () => { }
    lockCount++
    if (lockCount === 1) {
        const sbw = getScrollbarWidth()
        const bodyStyle = document.querySelector<HTMLDivElement>("div.scroller")?.style
        if (!bodyStyle) return
        bodyStyle.overflow = 'hidden'
        const currentPaddingRight = parseInt(window.getComputedStyle(document.body).paddingRight || '0', 10)
        bodyStyle.paddingRight = `${currentPaddingRight + sbw}px`
    }
    return () => {
        lockCount = Math.max(0, lockCount - 1)
        if (lockCount === 0) {
            const bodyStyle = document.querySelector<HTMLDivElement>("div.scroller")?.style
            if (!bodyStyle) return
            bodyStyle.overflow = ''
            bodyStyle.paddingRight = ''
        }
    }
}

function getFocusableElements(container: HTMLElement): HTMLElement[] {
    const selectors = [
        'a[href]', 'area[href]', 'button:not([disabled])',
        'input:not([disabled]):not([type="hidden"])',
        'select:not([disabled])', 'textarea:not([disabled])',
        'iframe', 'object', 'embed',
        '*[tabindex]:not([tabindex="-1"])', '*[contenteditable="true"]',
    ]
    return Array.from(container.querySelectorAll<HTMLElement>(selectors.join(','))).filter((el) =>
        !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
    )
}

// ---------- Context ----------

type ModalStackItem = {
    id: string
    triggerEl: HTMLElement | null
    options: ModalDescriptor
}

export type ModalContextValue = {
    open: (opts: ModalDescriptor) => string
    close: (id?: string) => void
    closeAll: () => void
    confirm: (opts: ConfirmOptions) => Promise<boolean>
}

const ModalContext = createContext<ModalContextValue | null>(null)

export const useModal = () => {
    const ctx = useContext(ModalContext)
    if (!ctx) throw new Error('useModal must be used within <ModalProvider />')
    return ctx
}

function createId() {
    return Math.random().toString(36).slice(2, 9)
}

// ---------- Provider + Renderer ----------

export function ModalProvider({ children }: { children: React.ReactNode }) {
    const [stack, setStack] = useState<ModalStackItem[]>([])
    const portalRef = useRef<HTMLElement | null>(null)
    const hostRef = useRef<HTMLDivElement | null>(null) // ✅ 앱 내용 래퍼
    const mounted = typeof window !== 'undefined'

    useEffect(() => {
        if (!mounted) return
        const existing = document.getElementById('modal-portal-root') as HTMLElement | null
        portalRef.current = existing ?? (() => {
            const n = document.createElement('div')
            n.id = 'modal-portal-root'
            document.body.appendChild(n)
            return n
        })()
    }, [mounted])

    // ❗ body가 아닌 hostRef만 비활성화
    useEffect(() => {
        if (!mounted) return
        if (stack.length === 0) return

        const unlock = lockBodyScroll()
        const host = hostRef.current
        if (host) {
            const hadAriaHidden = host.getAttribute('aria-hidden')
            if ((host as any).inert !== undefined) {
                (host as any).inert = true
            } else {
                host.setAttribute('aria-hidden', 'true')
            }
            return () => {
                unlock?.()
                if ((host as any).inert !== undefined) {
                    (host as any).inert = false
                } else {
                    if (hadAriaHidden === null) host.removeAttribute('aria-hidden')
                    else host.setAttribute('aria-hidden', hadAriaHidden)
                }
            }
        }

        // host가 없더라도 스크롤락은 해제
        return () => unlock?.()
    }, [mounted, stack.length])

    const api = useMemo<ModalContextValue>(() => ({
        open: (opts) => {
            const id = opts.id ?? createId()
            const triggerEl = typeof document !== 'undefined' ? (document.activeElement as HTMLElement | null) : null
            setStack((prev) => [...prev, { id, triggerEl, options: { dismissible: true, size: 'md', ...opts, id } }])
            return id
        },
        close: (id) => {
            setStack((prev) => {
                const next = id ? prev.filter((m) => m.id !== id) : prev.slice(0, -1)
                const removed = id ? prev.find((m) => m.id === id) : prev[prev.length - 1]
                queueMicrotask(() => {
                    removed?.options.onClose?.()
                    removed?.triggerEl?.focus?.()
                })
                return next
            })
        },
        closeAll: () => {
            setStack((prev) => {
                prev.forEach((m) => m.options.onClose?.())
                const top = prev[0]
                queueMicrotask(() => top?.triggerEl?.focus?.())
                return []
            })
        },
        confirm: (opts) => new Promise<boolean>((resolve) => {
            const id = createId()
            const onResolve = (value: boolean) => {
                api.close(id)
                resolve(value)
            }
            const description = opts.description
            const title = opts.title ?? 'Confirm'
            const dismissible = opts.dismissible ?? true
            const confirmText = opts.confirmText ?? 'Confirm'
            const cancelText = opts.cancelText ?? 'Cancel'
            const danger = opts.danger ?? false
            setStack((prev) => [
                ...prev,
                {
                    id,
                    triggerEl: typeof document !== 'undefined' ? (document.activeElement as HTMLElement | null) : null,
                    options: {
                        id,
                        title,
                        content: description ?? null,
                        dismissible,
                        actions: [
                            { label: cancelText, variant: 'neutral', onClick: () => onResolve(false) },
                            { label: confirmText, variant: danger ? 'danger' : 'primary', autoFocus: true, onClick: () => onResolve(true) },
                        ],
                    },
                },
            ])
        }),
    }), [])

    return (
        <ModalContext.Provider value={api}>
            {children}
            {mounted && portalRef.current && createPortal(
                <ModalStackRenderer stack={stack} onClose={api.close} />,
                portalRef.current
            )}
        </ModalContext.Provider>
    )
}

function ModalStackRenderer({ stack, onClose }: { stack: ModalStackItem[]; onClose: (id?: string) => void }) {
    return (
        <AnimatePresence>
            {stack.map((item, idx) => (
                <SingleModal
                    key={item.id}
                    item={item}
                    isTop={idx === stack.length - 1}
                    onRequestClose={() => onClose(item.id)}
                    stackIndex={idx}
                />
            ))}
        </AnimatePresence>
    )
}

function SingleModal({ item, isTop, onRequestClose, stackIndex }: { item: ModalStackItem; isTop: boolean; onRequestClose: () => void; stackIndex: number }) {
    const { options } = item
    const dismissible = options.dismissible ?? true
    const dialogRef = useRef<HTMLDivElement | null>(null)
    const titleId = useRef(`modal-title-${item.id}`)
    const bodyId = useRef(`modal-body-${item.id}`)

    useEffect(() => {
        const node = dialogRef.current
        if (!node) return

        const focusables = getFocusableElements(node)
        const auto = focusables.find((el) => (el as HTMLButtonElement).autofocus) ||
            node.querySelector('[data-autofocus="true"]') as HTMLElement | null

            ; (options.initialFocusRef?.current || (auto as HTMLElement) || focusables[0] || node).focus()

        function onKeyDown(e: KeyboardEvent) {
            if (!isTop) return
            if (e.key === 'Escape' && dismissible) {
                e.stopPropagation()
                onRequestClose()
            } else if (e.key === 'Tab') {
                const f = getFocusableElements(node!)
                if (f.length === 0) {
                    e.preventDefault()
                    return
                }
                const currentIndex = f.indexOf(document.activeElement as HTMLElement)
                const nextIndex = (currentIndex + (e.shiftKey ? -1 : 1) + f.length) % f.length
                if (!f.includes(document.activeElement as HTMLElement)) {
                    e.preventDefault()
                    f[0].focus()
                } else {
                    e.preventDefault()
                    f[nextIndex].focus()
                }
            }
        }

        document.addEventListener('keydown', onKeyDown, true)
        return () => document.removeEventListener('keydown', onKeyDown, true)
    }, [dismissible, isTop, onRequestClose, options.initialFocusRef])

    const content = typeof options.content === 'function'
        ? options.content({ close: onRequestClose, id: item.id })
        : options.content

    const width = options.size === 'sm' ? 320 : options.size === 'lg' ? 720 : options.size === 'xl' ? 960 : 560

    return (
        <>
            {/* Backdrop: sits under dialog, handles outside clicks */}
            <motion.div
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                onClick={() => { if (dismissible) onRequestClose() }}
                className={styles.backdrop}
                style={{ zIndex: 1000 + stackIndex * 2 }}
            />

            {/* Dialog itself: fixed-centered, receives pointer events */}
            <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby={options.title ? titleId.current : undefined}
                aria-describedby={bodyId.current}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                ref={dialogRef}
                tabIndex={-1}
                className={clsx(styles.dialog, styles[options.size ?? 'md'])}
                style={{ width, zIndex: 1001 + stackIndex * 2, translateX: "-50%", translateY: "-50%" }}
            >
                {options.title && (
                    <div className={styles.header}>
                        <h2 id={titleId.current}>{options.title}</h2>
                        {/* optional close in header */}
                        <button aria-label="Close" className={styles.closeButton} onClick={() => onRequestClose()}>
                            ×
                        </button>
                    </div>
                )}

                <div id={bodyId.current} className={clsx(styles.body, 'no-scrollbar')}>
                    {content}
                </div>

                {Array.isArray(options.actions) && options.actions.length > 0 && (
                    <div className={styles.footer}>
                        {options.actions.map((a, idx) => (
                            <button
                                key={a.id ?? idx}
                                data-autofocus={a.autoFocus ? 'true' : undefined}
                                onClick={() => a.onClick?.(onRequestClose)}
                                autoFocus={a.autoFocus}
                                disabled={a.disabled}
                                className={clsx(styles.button, styles[a.variant ?? 'neutral'])}
                            >
                                {a.label}
                            </button>
                        ))}
                    </div>
                )}
            </motion.div>
        </>
    )
}