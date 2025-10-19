import Link from 'next/link';
import TourCard from '@/components/tour/TourCard';
import type { FeaturedToursSection as FeaturedToursSectionType } from '@/types/home';
import type { TourCard as TourCardType } from '@/types/tour';

interface FeaturedToursSectionProps {
  section: FeaturedToursSectionType;
  tours: TourCardType[];
}

export default function FeaturedToursSection({ section, tours }: FeaturedToursSectionProps) {
  const featuredTours = tours.slice(0, section.numberOfTours);

  if (featuredTours.length === 0) {
    return null;
  }

  return (
    <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-20 bg-white dark:bg-background-dark/50">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-col gap-4 mb-12">
          <h2 className="text-[#111811] dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
            {section.title}
          </h2>
          <p className="text-[#638863] dark:text-gray-400 text-lg">
            {section.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredTours.map((tour) => (
            <TourCard key={tour.documentId} tour={tour} />
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href={section.viewAllButtonUrl}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-bold hover:bg-primary hover:text-white transition-all"
          >
            <span>{section.viewAllButtonText}</span>
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
