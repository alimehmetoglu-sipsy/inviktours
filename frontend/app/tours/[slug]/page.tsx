import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getTourBySlug, getAllTourSlugs } from '@/lib/strapi';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentRenderer from '@/components/tour/ContentRenderer';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = await getAllTourSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);

  if (!tour) {
    return {
      title: 'Tur Bulunamadı - Inviktours',
    };
  }

  return {
    title: `${tour.title} - Inviktours`,
    description: tour.subtitle || 'Doğanın kalbine unutulmaz bir yolculuk',
  };
}

export default async function TourPage({ params }: PageProps) {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);

  if (!tour || !tour.contentSections) {
    notFound();
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />
        <main>
          <ContentRenderer sections={tour.contentSections} />
        </main>
        <Footer />
      </div>
    </div>
  );
}
