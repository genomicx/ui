import { ReactNode } from 'react';
import { NavBarProps } from './NavBar';
interface AppShellProps extends NavBarProps {
    children: ReactNode;
    onReportBug?: () => void;
}
export declare function AppShell({ children, onReportBug, ...navProps }: AppShellProps): import("react/jsx-runtime").JSX.Element;
export {};
