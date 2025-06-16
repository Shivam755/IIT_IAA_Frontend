'use client';
import { usePathname, useRouter } from 'next/navigation';

const Tabs = () => {
    const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { name: 'Course', path: '' },
    { name: 'Instance', path: '/instance' },
  ];
  return (
    <div className="flex border-b border-gray-300">
      {tabs.map((tab) => {
        const isActive = pathname === tab.path;

        return (
          <button
            key={tab.path}
            onClick={() => router.push(tab.path)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
              isActive
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-blue-600'
            }`}
          >
            {tab.name}
          </button>
        );
      })}
    </div>
  )
}

export default Tabs