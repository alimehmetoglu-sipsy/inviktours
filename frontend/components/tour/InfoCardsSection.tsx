import { InfoCardsSection as InfoCardsSectionType } from '@/types/tour';

export default function InfoCardsSection({ data }: { data: InfoCardsSectionType }) {
  return (
    <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-4 p-4">
          {data.cards.map((card) => (
            <div key={card.id} className="flex flex-1 gap-3 rounded-lg border border-[#dce5dc] dark:border-gray-700 bg-white dark:bg-background-dark/50 p-4 flex-col">
              <span className="material-symbols-outlined text-[#111811] dark:text-gray-300">{card.icon}</span>
              <div className="flex flex-col gap-1">
                <h2 className="text-[#111811] dark:text-white text-base font-bold leading-tight">{card.label}</h2>
                <p className="text-[#638863] dark:text-gray-400 text-sm font-normal leading-normal">{card.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
