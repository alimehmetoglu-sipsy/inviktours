import type { FeaturesSection as FeaturesSectionType } from '@/types/home';

interface FeaturesSectionProps {
  section: FeaturesSectionType;
}

export default function FeaturesSection({ section }: FeaturesSectionProps) {
  // Sort features by order
  const sortedFeatures = [...section.features].sort((a, b) => a.order - b.order);

  return (
    <div id="features" className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-20 bg-background-light dark:bg-background-dark">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-col gap-4 mb-12 text-center">
          <h2 className="text-[#111811] dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
            {section.title}
          </h2>
          <p className="text-[#638863] dark:text-gray-400 text-lg">
            {section.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedFeatures.map((feature, index) => (
            <div
              key={`feature-${feature.title}-${index}`}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-background-dark/50 border border-[#dce5dc] dark:border-gray-700 hover:border-primary transition-all hover:shadow-lg"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary text-3xl">{feature.icon}</span>
              </div>
              <h3 className="text-[#111811] dark:text-white text-xl font-bold mb-2">
                {feature.title}
              </h3>
              <p className="text-[#638863] dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
