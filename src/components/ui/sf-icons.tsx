import * as React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export function SFPlayIcon({ size = 18, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M7.55 4.38C6.69 3.88 5.6 4.5 5.6 5.5v13c0 1 1.09 1.62 1.95 1.12l11.24-6.5c.86-.5.86-1.74 0-2.24L7.55 4.38Z" />
    </svg>
  );
}

export function SFPauseIcon({ size = 18, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <rect x="6" y="4.5" width="4.4" height="15" rx="1.6" />
      <rect x="13.6" y="4.5" width="4.4" height="15" rx="1.6" />
    </svg>
  );
}

export function SFSpeakerWaveIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M11.2 5.4c.54-.45 1.35-.06 1.35.64v11.92c0 .7-.81 1.09-1.35.64L6.8 15H3.9a1.4 1.4 0 0 1-1.4-1.4v-3.2A1.4 1.4 0 0 1 3.9 9h2.9l4.4-3.6Z"
        fill="currentColor"
      />
      <path
        d="M15.8 8.9a4.5 4.5 0 0 1 0 6.2M18.6 6.3a8.2 8.2 0 0 1 0 11.4"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SFSpeakerSlashIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M11.2 5.4c.54-.45 1.35-.06 1.35.64v5.7L7.3 6.5l3.9-1.1Zm1.35 11.5v1.06c0 .7-.81 1.09-1.35.64L6.8 15H3.9a1.4 1.4 0 0 1-1.4-1.4v-3.2c0-.46.22-.87.56-1.12l9.49 7.62Z"
        fill="currentColor"
      />
      <path
        d="M4 4l16 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SFArrowUpRightIcon({ size = 15, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M7.5 16.5 16.8 7.2M9 7h8v8"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SFArrowDownIcon({ size = 15, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M12 5.5v12.2M6.8 12.8 12 18l5.2-5.2"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SFChevronLeftIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="m14.8 6.4-5.6 5.6 5.6 5.6"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SFChevronRightIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="m9.2 6.4 5.6 5.6-5.6 5.6"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SFPaperplaneIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M20.9 3.55c.56-.24 1.15.27.97.86l-4.55 15.16c-.2.66-1.06.8-1.45.24l-3.68-5.22-3.43 2.53a.75.75 0 0 1-1.19-.6v-3.77l8.53-6.64-10.33 5.2-3.13-1.4c-.63-.28-.61-1.19.04-1.44L20.9 3.55Z" />
    </svg>
  );
}

export function SFGiftIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M8.7 3.2c1.45 0 2.66 1.07 3.3 2.38.64-1.31 1.85-2.38 3.3-2.38 1.67 0 2.9 1.12 2.9 2.58 0 .85-.4 1.59-1.04 2.02H19.6c.77 0 1.4.63 1.4 1.4v2c0 .66-.46 1.21-1.08 1.36v6.04c0 1.1-.9 2-2 2H12.9v-8h-1.8v8H6.08c-1.1 0-2-.9-2-2v-6.04A1.4 1.4 0 0 1 3 11.2v-2c0-.77.63-1.4 1.4-1.4h2.44A2.52 2.52 0 0 1 5.8 5.78c0-1.46 1.23-2.58 2.9-2.58Zm0 1.65c-.75 0-1.25.43-1.25.93 0 .56.5 1.02 1.25 1.02h2.25c-.34-.96-1.2-1.95-2.25-1.95Zm6.6 0c-1.05 0-1.91.99-2.25 1.95h2.25c.75 0 1.25-.46 1.25-1.02 0-.5-.5-.93-1.25-.93Z" />
    </svg>
  );
}

export function SFMegaphoneIcon({ size = 16, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M18.6 3.7c.74-.32 1.55.22 1.55 1.02v12.56c0 .8-.81 1.34-1.55 1.02l-9.95-4.32V8.02L18.6 3.7ZM7.15 8.15v5.7H5.2A2.2 2.2 0 0 1 3 11.65v-1.3a2.2 2.2 0 0 1 2.2-2.2h1.95Zm.3 7.2 1.8.78v2.62a1.4 1.4 0 0 1-1.4 1.4h-.5a1.4 1.4 0 0 1-1.36-1.07l-.74-2.98a3.2 3.2 0 0 0 2.2-.75Z" />
    </svg>
  );
}
