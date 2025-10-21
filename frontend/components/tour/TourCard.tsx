import Link from 'next/link';
import { TourCard as TourCardType } from '@/types/tour';
import { getStrapiMediaUrl } from '@/lib/strapi';

interface TourCardProps {
  tour: TourCardType;
}

export default function TourCard({ tour }: TourCardProps) {
  const formatPrice = (price: number) => new Intl.NumberFormat('tr-TR').format(price);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const calculateDuration = () => {
    if (!tour.startDate || !tour.endDate) return null;
    const start = new Date(tour.startDate);
    const end = new Date(tour.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const duration = calculateDuration();
  const backgroundImage = tour.heroImage
    ? getStrapiMediaUrl(tour.heroImage.url)
    : '/images/placeholder-tour.jpg';

  return (
    <div className="group flex flex-col rounded-xl overflow-hidden border border-[#dce5dc] dark:border-gray-700 bg-white dark:bg-background-dark/50 hover:shadow-lg transition-all duration-300">
      {/* Tour Image with Background */}
      <div
        className="relative h-72 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      </div>

      {/* Tour Info */}
      <div className="flex flex-col flex-1 p-6">
        {/* Duration */}
        {duration && (
          <div className="text-[#638863] dark:text-gray-400 text-sm font-semibold uppercase tracking-wide mb-3">
            {duration} Günlük Tur
          </div>
        )}

        {/* Trip Title */}
        <h3 className="text-[#111811] dark:text-white text-xl font-bold leading-tight mb-2 group-hover:text-primary transition-colors">
          {tour.title}
        </h3>

        {/* Departure Date */}
        {tour.startDate && (
          <p className="text-[#638863] dark:text-gray-400 text-sm mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-base">calendar_today</span>
            <span>Başlangıç: {formatDate(tour.startDate)}</span>
          </p>
        )}

        {/* Price and CTA Row */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#dce5dc] dark:border-gray-700">
          {/* Price */}
          {tour.price && (
            <div className="flex flex-col">
              <span className="text-[#638863] dark:text-gray-400 text-xs mb-1">Kişi Başı</span>
              <div className="text-primary font-bold text-2xl">
                {formatPrice(tour.price)} {tour.currency || 'TRY'}
              </div>
            </div>
          )}

          {/* CTA Button */}
          <Link
            href={`/tours/${tour.slug}`}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-sm"
          >
            Detayları Gör
          </Link>
        </div>
      </div>
    </div>
  );
}
