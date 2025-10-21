import { TimelineSection as TimelineSectionType } from '@/types/adventure';

export default function TimelineSection({ data }: { data: TimelineSectionType }) {
  return (
    <>
      <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <h2 className="text-[#111811] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">{data.title}</h2>
        </div>
      </div>
      <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div className="grid grid-cols-[40px_1fr] gap-x-2 px-4">
            {data.items.map((item, index) => (
              <div key={item.id} className="contents">
                <div className="flex flex-col items-center gap-1 pt-3">
                  <span className="material-symbols-outlined text-primary">{item.icon}</span>
                  {index < data.items.length - 1 && <div className="w-[1.5px] bg-[#dce5dc] dark:bg-gray-700 h-2 grow"></div>}
                </div>
                <div className="flex flex-1 flex-col py-3">
                  <p className="text-[#111811] dark:text-white text-base font-medium leading-normal">{item.day}</p>
                  <p className="text-[#638863] dark:text-gray-400 text-base font-normal leading-normal">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
