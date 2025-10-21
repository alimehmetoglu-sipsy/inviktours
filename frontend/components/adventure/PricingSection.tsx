import { PricingSection as PricingSectionType } from '@/types/adventure';

export default function PricingSection({ data }: { data: PricingSectionType }) {
  return (
    <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <h2 className="text-[#111811] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-10">{data.title}</h2>
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-8 rounded-lg border border-[#dce5dc] dark:border-gray-700 bg-white dark:bg-background-dark/50 p-6">
            <div className="flex flex-col flex-1">
              <h3 className="text-lg font-bold text-[#111811] dark:text-white">{data.includedTitle}</h3>
              <ul className="mt-4 space-y-2 text-[#638863] dark:text-gray-400">
                {data.includedItems.map((item) => (
                  <li key={item.id} className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">check_circle</span> {item.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col flex-1">
              <h3 className="text-lg font-bold text-[#111811] dark:text-white">{data.excludedTitle}</h3>
              <ul className="mt-4 space-y-2 text-[#638863] dark:text-gray-400">
                {data.excludedItems.map((item) => (
                  <li key={item.id} className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-gray-400">cancel</span> {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
