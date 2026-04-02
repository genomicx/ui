import { ReactNode } from 'react';
export interface NavBarProps {
    appName: string;
    appSubtitle?: string;
    version?: string;
    /** Extra items in the desktop nav (right side, before theme toggle) */
    actions?: ReactNode;
    /** Extra items in the mobile dropdown */
    mobileActions?: ReactNode;
}
export declare function NavBar({ appName, appSubtitle, version, actions, mobileActions }: NavBarProps): import("react/jsx-runtime").JSX.Element;
