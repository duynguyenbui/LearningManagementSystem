import { IconBadge } from '@/components/icon-badge';
import { LucideIcon } from 'lucide-react';

export const InfoCard = ({
  icon: Icon,
  label,
  numberOfItems,
  variant,
}: {
  icon: LucideIcon;
  label: string;
  numberOfItems: number;
  variant?: 'default' | 'success';
}) => {
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3">
      <IconBadge variant={variant} icon={Icon} />
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-gray-500 text-sm">
          {numberOfItems} {numberOfItems === 1 ? 'Course' : 'Courses'}
        </p>
      </div>
    </div>
  );
};
