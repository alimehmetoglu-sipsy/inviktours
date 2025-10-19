'use client';

import { HeroSection as HeroSectionType } from '@/types/tour';
import { getStrapiMediaUrl } from '@/lib/strapi';

export default function HeroSection({ data }: { data: HeroSectionType }) {
  const hasVideo = data.heroVideo?.url;

  return (
    <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="@container">
          <div className="@[480px]:p-0">
            <div className="relative flex min-h-[480px] flex-col gap-6 @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4 overflow-hidden">
              {/* Video or Background Image */}
              {hasVideo ? (
                <>
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover @[480px]:rounded-xl"
                  >
                    <source src={getStrapiMediaUrl(data.heroVideo!.url)} type="video/mp4" />
                  </video>
                  {/* Video overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50 @[480px]:rounded-xl" />
                </>
              ) : (
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat @[480px]:rounded-xl"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("${getStrapiMediaUrl(data.backgroundImage.url)}")`
                  }}
                />
              )}

              {/* Content */}
              <div className="relative z-10 flex flex-col gap-2 text-center">
                <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                  {data.title}
                </h1>
                <h2 className="text-white text-base font-normal leading-normal @[480px]:text-lg @[480px]:font-normal @[480px]:leading-normal">
                  {data.subtitle}
                </h2>
              </div>
              <button className="relative z-10 flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-green-700 transition-colors">
                <span className="truncate">{data.buttonText}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
