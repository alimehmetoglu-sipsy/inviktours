import Link from 'next/link';
import type { CTASection as CTASectionType } from '@/types/home';

interface CTASectionProps {
  section: CTASectionType;
}

export default function CTASection({ section }: CTASectionProps) {
  return (
    <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-20 bg-gradient-to-br from-primary to-green-700 dark:from-primary/90 dark:to-green-800">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-col items-center text-center gap-8 text-white">
          <span className="material-symbols-outlined text-7xl opacity-90">{section.icon}</span>
          <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
            {section.title}
          </h2>
          <p className="text-lg md:text-xl max-w-2xl opacity-90">
            {section.description}
          </p>
          <Link
            href={section.buttonUrl}
            className="flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-xl"
          >
            <span>{section.buttonText}</span>
            <span className="material-symbols-outlined">{section.buttonIcon}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
