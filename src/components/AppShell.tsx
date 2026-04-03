import type { ReactNode } from 'react';
import { NavBar, type NavBarProps } from './NavBar';
import { AppFooter } from './AppFooter';

interface AppShellProps extends NavBarProps {
  children: ReactNode;
  onReportBug?: () => void;
}

export function AppShell({ children, onReportBug, ...navProps }: AppShellProps) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--gx-bg)' }}>
      <NavBar {...navProps} />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <AppFooter appName={navProps.appName} onReportBug={onReportBug} />
    </div>
  );
}
