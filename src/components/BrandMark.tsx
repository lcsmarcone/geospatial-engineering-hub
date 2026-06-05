type BrandMarkProps = {
  className?: string;
};

const BrandMark = ({ className = '' }: BrandMarkProps) => {
  return (
    <span
      className={`relative flex items-center justify-center rounded-xl bg-[linear-gradient(135deg,hsl(var(--primary))_0%,hsl(190_90%_50%)_100%)] text-primary-foreground shadow-[0_0_24px_hsl(var(--primary)/0.28)] ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 40 40" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7 25c4-5 9-5 13 0s9 5 13 0"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
          opacity="0.32"
        />
        <path
          d="M7 30c4-5 9-5 13 0s9 5 13 0"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.5"
          opacity="0.22"
        />
        <path
          d="M11 12v16h7"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3.4"
        />
        <path
          d="M22 28V12l5.5 8 5.5-8v16"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3.4"
        />
        <circle cx="32.8" cy="28.4" r="1.8" fill="currentColor" opacity="0.86" />
        <circle cx="8.2" cy="10.4" r="1.3" fill="currentColor" opacity="0.58" />
      </svg>
    </span>
  );
};

export default BrandMark;
