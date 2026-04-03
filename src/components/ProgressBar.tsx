export interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
}

export function ProgressBar({ value, label }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div className="gx-progress-wrap">
      <div
        className="progress-bg"
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="progress-bar" style={{ width: `${pct}%` }} />
      </div>
      {label && <p className="gx-progress-label">{label}</p>}
    </div>
  );
}
