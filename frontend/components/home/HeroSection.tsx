import Link from 'next/link';
import type { HeroSection as HeroSectionType } from '@/types/home';

interface HeroSectionProps {
  section: HeroSectionType;
  toursCount?: number;
}

export default function HeroSection({ section }: HeroSectionProps) {
  return (
    <div className="relative px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background-light to-primary/5 dark:from-primary/5 dark:via-background-dark dark:to-primary/10 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
      </div>

      <div className="layout-content-container flex flex-col max-w-[960px] flex-1 relative z-10">
        <div className="flex flex-col items-center text-center gap-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <span className="material-symbols-outlined text-primary text-sm">{section.badgeIcon}</span>
            <span className="text-primary text-sm font-medium">{section.badgeText}</span>
          </div>

          <h1 className="text-[#111811] dark:text-white text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-[-0.033em] max-w-4xl">
            {section.title}{' '}
            <span className="text-primary">{section.highlightedText}</span>
          </h1>

          <p className="text-[#638863] dark:text-gray-400 text-lg md:text-xl max-w-2xl">
            {section.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              href={section.primaryButtonUrl}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-green-700 transition-all hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>{section.primaryButtonText}</span>
              <span className="material-symbols-outlined">{section.primaryButtonIcon}</span>
            </Link>
            <a
              href={section.secondaryButtonUrl}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-background-dark border-2 border-[#dce5dc] dark:border-gray-700 text-[#111811] dark:text-white rounded-xl font-bold text-lg hover:border-primary transition-all"
            >
              <span>{section.secondaryButtonText}</span>
              <span className="material-symbols-outlined">{section.secondaryButtonIcon}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
