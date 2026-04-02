import type { ReactNode } from 'react';
import { NavBar, type NavBarProps } from './NavBar';
import { AppFooter } from './AppFooter';

interface AppShellProps extends NavBarProps {
  children: ReactNode;
  onReportBug?: () => void;
}

export function AppShell({ children, onReportBug, ...navProps }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--gx-bg)' }}>
      <NavBar {...navProps} />
      <main className="flex-1">
        {children}
      </main>
      <AppFooter appName={navProps.appName} onReportBug={onReportBug} />
    </div>
  );
}
