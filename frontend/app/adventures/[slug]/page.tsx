import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAdventureBySlug } from '@/lib/strapi';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
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
    description: adventure.subtitle || 'Heyecan dolu bir maceraya katılın',
  };
}

export default async function AdventurePage({ params }: PageProps) {
  const { slug } = await params;
  const adventure = await getAdventureBySlug(slug);

  if (!adventure || !adventure.contentSections) {
    notFound();
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />
        <main>
          <ContentRenderer sections={adventure.contentSections} />
        </main>
        <Footer />
      </div>
    </div>
  );
}
