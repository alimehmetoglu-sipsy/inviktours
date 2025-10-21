import { PricingSection as PricingSectionType } from '@/types/adventure';

export default function PricingSection({ data }: { data: PricingSectionType }) {
  const formatPrice = (price: number) => new Intl.NumberFormat('tr-TR').format(price);

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
            <div className="flex flex-col items-start md:items-end justify-center pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-[#dce5dc] dark:border-gray-700 md:pl-8 mt-4 md:mt-0">
              <p className="text-sm text-[#638863] dark:text-gray-400">{data.priceLabel}</p>
              <p className="text-4xl font-bold text-[#111811] dark:text-white">{formatPrice(data.price)} {data.currency}</p>
              <button className="mt-4 flex w-full md:w-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-green-700 transition-colors">
                <span className="truncate">{data.buttonText}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
