'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Adventure } from '@/types/adventure';
import { getStrapiMediaUrl } from '@/lib/strapi';
import OverviewTab from './OverviewTab';
import ItineraryTab from './ItineraryTab';

interface AdventureDetailLayoutProps {
  adventure: Adventure;
}

type Tab = 'overview' | 'itinerary';

export default function AdventureDetailLayout({ adventure }: AdventureDetailLayoutProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  return (
    <div className="bg-white dark:bg-background-dark">
      {/* Title Block */}
      <div className="px-4 md:px-10 lg:px-40 py-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-[#111811] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] mb-2">
                {adventure.title}
              </h1>
              <h2 className="text-[#638863] dark:text-gray-400 text-lg md:text-xl">
                {adventure.duration && adventure.startLocation && adventure.endLocation && (
                  <>
                    {adventure.duration} gün, {adventure.startLocation} - {adventure.endLocation}
                  </>
                )}
                {adventure.subtitle && !adventure.duration && adventure.subtitle}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-3xl">explore</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Image */}
      {adventure.mainImage && (
        <div className="w-full h-[400px] md:h-[500px] relative overflow-hidden">
          <Image
            src={getStrapiMediaUrl(adventure.mainImage.url)}
            alt={adventure.mainImage.alternativeText || adventure.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Tab Navigation */}
      <div className="px-4 md:px-10 lg:px-40 bg-white dark:bg-background-dark border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-[1200px] mx-auto">
          <ul className="flex gap-6">
            <li>
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-2 text-base font-medium border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-[#638863] dark:text-gray-400 hover:text-[#111811] dark:hover:text-white'
                }`}
              >
                Genel Bakış
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('itinerary')}
                className={`py-4 px-2 text-base font-medium border-b-2 transition-colors ${
                  activeTab === 'itinerary'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-[#638863] dark:text-gray-400 hover:text-[#111811] dark:hover:text-white'
                }`}
              >
                Detaylı Program
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-4 md:px-10 lg:px-40 py-8">
        <div className="max-w-[1200px] mx-auto">
          {activeTab === 'overview' ? (
            <OverviewTab adventure={adventure} />
          ) : (
            <ItineraryTab adventure={adventure} />
          )}
        </div>
      </div>
    </div>
  );
}
