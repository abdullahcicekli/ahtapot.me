import { cn } from '@/lib/utils';
import { getInitial } from '@/lib/utils';

type AvatarColor = 'green' | 'blue' | 'purple' | 'yellow' | 'pink' | 'orange' | 'teal';

interface AvatarProps {
  name: string;
  color: AvatarColor;
  className?: string;
}

const colorClasses: Record<AvatarColor, string> = {
  green: 'bg-success',
  blue: 'bg-sky-400',
  purple: 'bg-violet-400',
  yellow: 'bg-warning',
  pink: 'bg-pink-400',
  orange: 'bg-orange-400',
  teal: 'bg-teal-400',
};

export function Avatar({ name, color, className }: AvatarProps) {
  return (
    <div
      className={cn(
        'w-10 h-10 rounded-full flex items-center justify-center font-semibold text-primary-dark',
        colorClasses[color],
        className
      )}
    >
      {getInitial(name)}
    </div>
  );
}
