import type { StatsSection as StatsSectionType } from '@/types/home';

interface StatsSectionProps {
  section: StatsSectionType;
  toursCount?: number;
}

export default function StatsSection({ section, toursCount }: StatsSectionProps) {
  // Sort stats by order
  const sortedStats = [...section.stats].sort((a, b) => a.order - b.order);

  return (
    <div className="grid grid-cols-3 gap-8 mt-12 w-full max-w-2xl">
      {sortedStats.map((stat, index) => {
        // Replace {toursCount} placeholder with actual count
        const displayValue = stat.value.replace('{toursCount}', toursCount?.toString() || '0');

        return (
          <div key={`stat-${stat.label}-${index}`} className="flex flex-col items-center">
            <span className="text-4xl md:text-5xl font-black text-primary">{displayValue}</span>
            <span className="text-sm md:text-base text-[#638863] dark:text-gray-400 mt-1">{stat.label}</span>
          </div>
        );
      })}
    </div>
  );
}
