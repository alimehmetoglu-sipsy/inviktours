import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAdventureBySlug } from '@/lib/strapi';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdventureDetailLayout from '@/components/adventure/AdventureDetailLayout';
import ContentRenderer from '@/components/adventure/ContentRenderer';

// Enable ISR with revalidation
export const revalidate = 3600; // Revalidate every hour

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const adventure = await getAdventureBySlug(slug);

  if (!adventure) {
    return {
      title: 'Macera Bulunamadı - Inviktours',
    };
  }

  return {
    title: `${adventure.title} - Inviktours`,
    description: adventure.subtitle || adventure.description?.substring(0, 160) || 'Heyecan dolu bir maceraya katılın',
  };
}

export default async function AdventurePage({ params }: PageProps) {
  const { slug } = await params;
  const adventure = await getAdventureBySlug(slug);

  if (!adventure) {
    notFound();
  }

  // Use new G Adventures style layout if adventure has itinerary or trip attributes
  const useNewLayout = adventure.itinerary || adventure.tripAttributes || adventure.description;

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />
        <main>
          {useNewLayout ? (
            <AdventureDetailLayout adventure={adventure} />
          ) : adventure.contentSections ? (
            <ContentRenderer sections={adventure.contentSections} />
          ) : (
            <div className="px-4 py-20 text-center">
              <h1 className="text-2xl font-bold mb-4">{adventure.title}</h1>
              <p className="text-gray-600">İçerik yakında eklenecek...</p>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}
