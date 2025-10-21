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
    <Link
      href={`/adventures/${adventure.slug}`}
      className="group flex flex-col rounded-xl overflow-hidden border border-[#dce5dc] dark:border-gray-700 bg-white dark:bg-background-dark/50 hover:shadow-lg transition-shadow"
    >
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

        {/* Price Badge */}
        {adventure.price && (
          <div className="absolute top-4 right-4 bg-primary text-white px-4 py-2 rounded-lg font-bold">
            {formatPrice(adventure.price)} TL
          </div>
        )}
      </div>

      {/* Adventure Info */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-[#111811] dark:text-white text-xl font-bold leading-tight mb-2 group-hover:text-primary transition-colors">
          {adventure.title}
        </h3>

        {adventure.subtitle && (
          <p className="text-[#638863] dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {adventure.subtitle}
          </p>
        )}

        {/* Adventure Details */}
        <div className="flex flex-wrap gap-4 mt-auto pt-4 border-t border-[#dce5dc] dark:border-gray-700">
          {adventure.duration && (
            <div className="flex items-center gap-2 text-[#638863] dark:text-gray-400 text-sm">
              <span className="material-symbols-outlined text-base">calendar_month</span>
              <span>{adventure.duration}</span>
            </div>
          )}

          {adventure.difficulty && (
            <div className="flex items-center gap-2 text-[#638863] dark:text-gray-400 text-sm">
              <span className="material-symbols-outlined text-base">hiking</span>
              <span>{adventure.difficulty}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
