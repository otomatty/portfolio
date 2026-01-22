'use client';

import { X } from 'lucide-react';
import { motion } from 'motion/react';

interface CloseButtonProps {
  onClose: () => void;
}

export const CloseButton = ({ onClose }: CloseButtonProps) => {
  return (
    <motion.button
      className="absolute z-50 flex items-center gap-1.5 rounded-lg bg-foreground/80 backdrop-blur-xs text-primary-foreground border border-border py-1.5 px-3 transition-colors hover:bg-foreground/90 top-4 right-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <X className="h-4 w-4" aria-hidden="true" />
      <span className="text-sm font-medium">閉じる</span>
    </motion.button>
  );
};
