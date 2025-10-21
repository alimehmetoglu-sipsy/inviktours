import { Metadata } from 'next';
import { getAdventuresForListing } from '@/lib/strapi';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdventureCard from '@/components/adventure/AdventureCard';

// Enable ISR with revalidation
export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: 'Maceralar - Inviktours',
  description: 'Macera turlarımızı keşfedin ve unutulmaz bir yolculuğa çıkın',
};

export default async function AdventuresPage() {
  let adventures;
  try {
    adventures = await getAdventuresForListing();
  } catch (error) {
    console.error('Failed to fetch adventures:', error);
    adventures = [];
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />

        <main className="flex-1">
          {/* Hero Section */}
          <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-12 bg-gradient-to-b from-background-light to-white dark:from-background-dark dark:to-background-dark/50">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
              <div className="flex flex-col gap-4 text-center">
                <h1 className="text-[#111811] dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">
                  Maceralarımız
                </h1>
                <p className="text-[#638863] dark:text-gray-400 text-lg">
                  Heyecan dolu maceralara katılmaya hazır mısınız?
                </p>
              </div>
            </div>
          </div>

          {/* Adventures Grid */}
          <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-12">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
              {!adventures || adventures.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <span className="material-symbols-outlined text-6xl text-[#638863] dark:text-gray-400 mb-4">
                    explore_off
                  </span>
                  <h2 className="text-[#111811] dark:text-white text-2xl font-bold mb-2">
                    Henüz Macera Bulunmuyor
                  </h2>
                  <p className="text-[#638863] dark:text-gray-400">
                    Strapi admin panelinden Adventures için public erişim iznini kontrol edin.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {adventures.map((adventure) => (
                    <AdventureCard key={adventure.documentId} adventure={adventure} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
