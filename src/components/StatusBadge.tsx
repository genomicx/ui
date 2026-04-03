import type { ReactNode } from 'react';

export type StatusBadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'muted';

export interface StatusBadgeProps {
  variant: StatusBadgeVariant;
  children: ReactNode;
}

export function StatusBadge({ variant, children }: StatusBadgeProps) {
  return (
    <span className={`gx-badge gx-badge--${variant}`}>
      {children}
    </span>
  );
}
