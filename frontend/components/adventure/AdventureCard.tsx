import Link from 'next/link';
import Image from 'next/image';
import { AdventureCard as AdventureCardType } from '@/types/adventure';
import { getStrapiMediaUrl } from '@/lib/strapi';

interface AdventureCardProps {
  adventure: AdventureCardType;
}

export default function AdventureCard({ adventure }: AdventureCardProps) {
  const formatPrice = (price: number) => new Intl.NumberFormat('tr-TR').format(price);

  return (
    <div className="group flex flex-col rounded-xl overflow-hidden border border-[#dce5dc] dark:border-gray-700 bg-white dark:bg-background-dark/50 hover:shadow-lg transition-all duration-300">
      {/* Adventure Image */}
      <div className="relative h-64 overflow-hidden bg-[#dce5dc] dark:bg-gray-800">
        {adventure.heroImage ? (
          <Image
            src={getStrapiMediaUrl(adventure.heroImage.url)}
            alt={adventure.heroImage.alternativeText || adventure.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#638863] dark:text-gray-400">
            <span className="material-symbols-outlined text-6xl">landscape</span>
          </div>
        )}
      </div>

      {/* Adventure Info */}
      <div className="flex flex-col flex-1 p-6">
        {/* Title - Clickable */}
        <Link href={`/adventures/${adventure.slug}`}>
          <h3 className="text-[#111811] dark:text-white text-xl font-bold leading-tight mb-3 group-hover:text-primary transition-colors cursor-pointer hover:underline">
            {adventure.title}
          </h3>
        </Link>

        {adventure.subtitle && (
          <p className="text-[#638863] dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {adventure.subtitle}
          </p>
        )}

        {/* Adventure Details in Single Row */}
        {(adventure.duration || adventure.difficulty) && (
          <div className="flex items-center gap-4 text-sm mb-4 flex-wrap">
            {adventure.duration && (
              <div className="flex items-center gap-1.5 text-[#638863] dark:text-gray-400">
                <span className="material-symbols-outlined text-base">schedule</span>
                <span className="font-medium">{adventure.duration}</span>
              </div>
            )}
            {adventure.difficulty && (
              <div className="flex items-center gap-1.5 text-[#638863] dark:text-gray-400">
                <span className="material-symbols-outlined text-base">hiking</span>
                <span className="font-medium">{adventure.difficulty}</span>
              </div>
            )}
          </div>
        )}

        {/* Price */}
        {adventure.price && (
          <div className="flex flex-col mt-auto pt-4 border-t border-[#dce5dc] dark:border-gray-700">
            <span className="text-[#638863] dark:text-gray-400 text-xs mb-1">Kişi Başı</span>
            <div className="text-primary font-bold text-2xl mb-4">
              {formatPrice(adventure.price)} TRY
            </div>
          </div>
        )}

        {/* CTA Button - Full Width */}
        <Link
          href={`/adventures/${adventure.slug}`}
          className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-sm text-center w-full block mt-2"
        >
          Detayları Gör
        </Link>
      </div>
    </div>
  );
}
