'use client';

import { IconType } from 'react-icons';
import { Category } from '@prisma/client';
import {
  FcEngineering,
  FcFilmReel,
  FcMoneyTransfer,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from 'react-icons/fc';
import { CategoryItem } from './category-item';

const iconMap: Record<Category['name'], IconType> = {
  Accounting: FcMoneyTransfer,
  Music: FcMusic,
  Photography: FcOldTimeCamera,
  Fitness: FcSportsMode,
  'Computer Science': FcMultipleDevices,
  Filming: FcFilmReel,
  Engineering: FcEngineering,
};

export const Categories = ({ items }: { items: Category[] }) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};
