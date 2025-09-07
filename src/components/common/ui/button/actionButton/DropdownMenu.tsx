'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import styles from './dropdownMenu.module.scss';
import { EllipsisVertical } from 'lucide-react';
// import { MoreVertical } from 'lucide-react';

export type DropdownAction = {
  label: string;
  onClick: () => void;
};

type DropdownMenuProps = {
  actions: DropdownAction[];
};

export default function DropdownMenu({ actions }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 감지
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className={styles.wrapper}>
      <button
        ref={triggerRef}
        className={styles.trigger}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(prev => !prev)}
      >
        <EllipsisVertical size="0.9rem" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            className={styles.menu}
            role="menu"
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          >
            {actions.map((action, idx) => (
              <button
                key={idx}
                role="menuitem"
                className={clsx(styles.menuItem)}
                onClick={() => {
                  action.onClick();
                  setOpen(false);
                }}
              >
                <span>{action.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
