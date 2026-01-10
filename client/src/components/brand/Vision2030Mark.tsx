import { cn } from '@/lib/utils';
import vision2030Logo from '@assets/vision2030.png';

interface Vision2030MarkProps {
  size?: 'sm' | 'md';
  variant?: 'inline' | 'watermark';
  showDisclaimer?: boolean;
  className?: string;
}

const sizeMap = {
  sm: 'h-5 md:h-6',
  md: 'h-9 md:h-11',
};

export default function Vision2030Mark({
  size = 'md',
  variant = 'inline',
  showDisclaimer = false,
  className,
}: Vision2030MarkProps) {
  if (variant === 'watermark') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          src={vision2030Logo}
          alt=""
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 md:w-96 opacity-[0.06] select-none"
          aria-hidden="true"
        />
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col', className)}>
      <img
        src={vision2030Logo}
        alt="Vision 2030"
        className={cn('w-auto object-contain', sizeMap[size])}
      />
      {showDisclaimer && (
        <p className="text-[10px] md:text-xs text-gray-500 mt-1 leading-tight">
          Use of the Vision 2030 logo indicates alignment with national priorities, not endorsement.
        </p>
      )}
    </div>
  );
}
