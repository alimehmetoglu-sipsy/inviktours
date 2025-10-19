import Image from 'next/image';
import { GallerySection as GallerySectionType } from '@/types/tour';
import { getStrapiMediaUrl } from '@/lib/strapi';

export default function GallerySection({ data }: { data: GallerySectionType }) {
  return (
    <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <h2 className="text-[#111811] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-10">{data.title}</h2>
        <div className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.images.map((img) => (
              <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={getStrapiMediaUrl(img.image.url)}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
