import { ProgressUpdate } from '../types/progress';
interface LogConsoleProps {
    logs: string[];
    progress?: ProgressUpdate;
    title?: string;
}
export declare function LogConsole({ logs, progress, title }: LogConsoleProps): import("react/jsx-runtime").JSX.Element;
export {};
