import { TripAttributes, TripInfo } from '@/types/adventure';

interface TripAttributesSectionProps {
  attributes?: TripAttributes;
  info?: TripInfo;
}

export default function TripAttributesSection({ attributes, info }: TripAttributesSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left Column - Trip Attributes */}
      <div className="space-y-6">
        {attributes?.style && (
          <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
            <h3 className="text-[#111811] dark:text-white font-bold mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">explore</span>
              <span>Tur Stili</span>
            </h3>
            <p className="text-[#638863] dark:text-gray-400">{attributes.styleDescription}</p>
          </div>
        )}

        {attributes?.service && (
          <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
            <h3 className="text-[#111811] dark:text-white font-bold mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">hotel</span>
              <span>Hizmet Seviyesi</span>
            </h3>
            <p className="text-[#638863] dark:text-gray-400">{attributes.serviceDescription}</p>
          </div>
        )}

        {attributes?.physical && (
          <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
            <h3 className="text-[#111811] dark:text-white font-bold mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">fitness_center</span>
              <span>Fiziksel Seviye</span>
            </h3>
            <p className="text-[#638863] dark:text-gray-400">{attributes.physicalDescription}</p>
          </div>
        )}

        {attributes?.groupType && (
          <div className="border-b border-gray-200 dark:border-gray-800 pb-4">
            <h3 className="text-[#111811] dark:text-white font-bold mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">groups</span>
              <span>Grup Tipi</span>
            </h3>
            <p className="text-[#638863] dark:text-gray-400">{attributes.groupTypeDescription}</p>
          </div>
        )}

        {info?.ageRequirement && (
          <div className="pb-4">
            <h3 className="text-[#111811] dark:text-white font-bold mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">person</span>
              <span>Yaş Gereksinimi</span>
            </h3>
            <p className="text-[#638863] dark:text-gray-400">{info.ageRequirement}</p>
          </div>
        )}
      </div>

      {/* Right Column - Visa Requirements */}
      <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg h-fit">
        <h3 className="text-[#111811] dark:text-white font-bold mb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">description</span>
          <span>Vize Gereksinimleri</span>
        </h3>
        <p className="text-[#638863] dark:text-gray-400 mb-4">
          {info?.visaRequirement || 'Rezervasyon yapmadan önce, geziye katıldığınız ve seyahat ettiğiniz ülkelere girmek için hangi belgelere ihtiyacınız olduğunu öğrenmek için kullanışlı giriş gereksinimleri aracımızı kullanın.'}
        </p>
        {info?.visaLink && (
          <a
            href={info.visaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-green-700 font-medium transition-colors"
          >
            <span>Giriş Gereksinimleri Aracını Görüntüle</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        )}
      </div>
    </div>
  );
}
