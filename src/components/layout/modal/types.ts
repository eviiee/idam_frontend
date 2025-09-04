
import type { ReactNode, RefObject } from 'react'

export type ModalAction = {
    id?: string
    label: ReactNode
    onClick?: (close: () => void) => void | Promise<void>
    variant?: 'primary' | 'danger' | 'neutral'
    autoFocus?: boolean
    disabled?: boolean
}

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl'

export type ModalDescriptor = {
    id?: string
    title?: ReactNode
    content: ReactNode | ((controls: { close: () => void; id: string }) => ReactNode)
    actions?: ModalAction[]
    dismissible?: boolean
    onClose?: () => void
    size?: ModalSize
    initialFocusRef?: RefObject<HTMLElement>
}

export type ConfirmOptions = {
    title?: ReactNode
    description?: ReactNode
    confirmText?: ReactNode
    cancelText?: ReactNode
    danger?: boolean
    dismissible?: boolean
}