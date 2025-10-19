import type { ContentSection } from '@/types/tour';
import dynamic from 'next/dynamic';

// Dynamically import section components to reduce initial bundle size
const HeroSection = dynamic(() => import('./HeroSection'));
const InfoCardsSection = dynamic(() => import('./InfoCardsSection'));
const TimelineSection = dynamic(() => import('./TimelineSection'));
const GallerySection = dynamic(() => import('./GallerySection'));
const PricingSection = dynamic(() => import('./PricingSection'));
const ContactFormSection = dynamic(() => import('./ContactFormSection'));

interface ContentRendererProps {
  sections: ContentSection[];
}

export default function ContentRenderer({ sections }: ContentRendererProps) {
  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <>
      {sections.map((section) => {
        switch (section.__component) {
          case 'tour.hero-section':
            return <HeroSection key={section.id} data={section} />;
          case 'tour.info-cards-section':
            return <InfoCardsSection key={section.id} data={section} />;
          case 'tour.timeline-section':
            return <TimelineSection key={section.id} data={section} />;
          case 'tour.gallery-section':
            return <GallerySection key={section.id} data={section} />;
          case 'tour.pricing-section':
            return <PricingSection key={section.id} data={section} />;
          case 'tour.contact-form-section':
            return <ContactFormSection key={section.id} data={section} />;
          default:
            console.warn(`Unknown component type: ${(section as { __component?: string }).__component}`);
            return null;
        }
      })}
    </>
  );
}
