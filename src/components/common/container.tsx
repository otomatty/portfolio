import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/**
 * コンテンツの最大幅を制限し、一貫したレイアウトを提供するコンテナコンポーネント
 * @param children - コンテナ内に表示するコンテンツ
 * @param className - 追加のスタイルクラス
 */
export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        'container max-w-6xl py-20 mx-auto px-4 sm:px-6 lg:px-8',
        className
      )}
    >
      {children}
    </div>
  );
}
