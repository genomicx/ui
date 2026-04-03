import { useRef } from 'react';
import toast from 'react-hot-toast';
import type { ProgressUpdate } from '../types/progress';

interface LogConsoleProps {
  logs: string[];
  progress?: ProgressUpdate;
  title?: string;
}

export function LogConsole({ logs, progress, title = 'Console' }: LogConsoleProps) {
  const logRef = useRef<HTMLDivElement>(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(logs.join('\n')).then(() => {
      toast.success('Logs copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy logs');
    });
  };

  const isRunning = progress && progress.step !== 'idle' && progress.step !== 'Complete!';

  return (
    <div className="gx-console">
      {isRunning && (
        <div className="gx-console-progress">
          <div className="gx-console-progress-row">
            <span className="gx-console-progress-step">{progress!.step}</span>
            <span className="gx-console-progress-pct">{progress!.percent}%</span>
          </div>
          <div className="progress-bg">
            <div className="progress-bar" style={{ width: `${progress!.percent}%` }} />
          </div>
          {progress!.message && (
            <div className="gx-console-progress-msg">{progress!.message}</div>
          )}
        </div>
      )}

      <div className="gx-console-header">
        <div className="gx-console-title-row">
          <h3 className="gx-console-title">{title}</h3>
          <span className="gx-console-count">({logs.length} messages)</span>
        </div>
        <button onClick={copyToClipboard} className="gx-console-copy" disabled={logs.length === 0}>
          <svg className="gx-console-copy-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy
        </button>
      </div>

      <div ref={logRef} className="gx-console-body">
        {logs.length === 0 ? (
          <div className="gx-console-empty">No logs yet...</div>
        ) : (
          logs.map((log, i) => (
            <div key={i} className="gx-console-line">{log}</div>
          ))
        )}
      </div>
    </div>
  );
}
