'use client';

import { Toaster } from 'sonner';
import { useTheme } from 'next-themes';

export function ToastProvider() {
  const { theme } = useTheme();

  return (
    <Toaster
      theme={theme === 'dark' ? 'light' : 'dark'}
      toastOptions={{
        classNames: {
          toast: 'rounded-md border shadow-lg',
          title: 'font-semibold',
          description: 'text-sm opacity-80',
        },
      }}
    />
  );
}
