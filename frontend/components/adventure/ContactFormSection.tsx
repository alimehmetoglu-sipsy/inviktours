import { ContactFormSection as ContactFormSectionType } from '@/types/adventure';

export default function ContactFormSection({ data }: { data: ContactFormSectionType }) {
  return (
    <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <h2 className="text-[#111811] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-10">{data.title}</h2>
        <div className="p-4">
          <form className="flex flex-col gap-4 rounded-lg border border-[#dce5dc] dark:border-gray-700 bg-white dark:bg-background-dark/50 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#111811] dark:text-gray-300" htmlFor="name">{data.nameLabel}</label>
                <input className="mt-1 block w-full rounded border-[#dce5dc] dark:border-gray-600 dark:bg-background-dark shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 sm:text-sm h-10 px-3" id="name" type="text" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111811] dark:text-gray-300" htmlFor="email">{data.emailLabel}</label>
                <input className="mt-1 block w-full rounded border-[#dce5dc] dark:border-gray-600 dark:bg-background-dark shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 sm:text-sm h-10 px-3" id="email" type="email" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#111811] dark:text-gray-300" htmlFor="phone">{data.phoneLabel}</label>
              <input className="mt-1 block w-full rounded border-[#dce5dc] dark:border-gray-600 dark:bg-background-dark shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 sm:text-sm h-10 px-3" id="phone" type="tel" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#111811] dark:text-gray-300" htmlFor="message">{data.messageLabel}</label>
              <textarea className="mt-1 block w-full rounded border-[#dce5dc] dark:border-gray-600 dark:bg-background-dark shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 sm:text-sm p-3" id="message" rows={4}></textarea>
            </div>
            <div className="flex justify-end">
              <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-green-700 transition-colors" type="submit">
                <span className="truncate">{data.buttonText}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
