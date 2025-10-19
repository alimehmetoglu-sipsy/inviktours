import qs from 'qs';
import type { Tour, StrapiResponse, StrapiSingleResponse, Global, TourCard, StrapiMedia } from '@/types/tour';
import type { Home, HomeResponse } from '@/types/home';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

/**
 * Fetch data from Strapi API
 */
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {},
  params: object = {}
): Promise<T> {
  const queryString = qs.stringify(params, {
    encodeValuesOnly: true,
  });

  const url = `${STRAPI_URL}/api${endpoint}${queryString ? `?${queryString}` : ''}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch from Strapi: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

/**
 * Get all tours
 */
export async function getAllTours(): Promise<Tour[]> {
  const data = await fetchAPI<StrapiResponse<Tour[]>>(
    '/tours',
    { next: { revalidate: 60 } },
    {
      populate: {
        contentSections: {
          on: {
            'tour.hero-section': {
              populate: ['backgroundImage'],
            },
            'tour.info-cards-section': {
              populate: ['cards'],
            },
            'tour.timeline-section': {
              populate: ['items'],
            },
            'tour.gallery-section': {
              populate: {
                images: {
                  populate: ['image'],
                },
              },
            },
            'tour.pricing-section': {
              populate: ['includedItems', 'excludedItems'],
            },
            'tour.contact-form-section': {
              populate: '*',
            },
          },
        },
      },
    }
  );

  return data.data;
}

/**
 * Get a single tour by slug
 */
export async function getTourBySlug(slug: string): Promise<Tour | null> {
  const data = await fetchAPI<StrapiResponse<Tour[]>>(
    '/tours',
    { next: { revalidate: 60 } },
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: {
        contentSections: {
          on: {
            'tour.hero-section': {
              populate: ['backgroundImage'],
            },
            'tour.info-cards-section': {
              populate: ['cards'],
            },
            'tour.timeline-section': {
              populate: ['items'],
            },
            'tour.gallery-section': {
              populate: {
                images: {
                  populate: ['image'],
                },
              },
            },
            'tour.pricing-section': {
              populate: ['includedItems', 'excludedItems'],
            },
            'tour.contact-form-section': {
              populate: '*',
            },
          },
        },
      },
    }
  );

  return data.data[0] || null;
}

/**
 * Get all tour slugs for static generation
 */
export async function getAllTourSlugs(): Promise<string[]> {
  const data = await fetchAPI<StrapiResponse<Tour[]>>(
    '/tours',
    { next: { revalidate: 60 } },
    {
      fields: ['slug'],
    }
  );

  return data.data.map((tour) => tour.slug);
}

/**
 * Get Strapi media URL
 */
export function getStrapiMediaUrl(url: string): string {
  if (url.startsWith('http')) {
    return url;
  }
  return `${STRAPI_URL}${url}`;
}

/**
 * Get global settings (navigation, site info, etc.)
 */
export async function getGlobalSettings(): Promise<Global | null> {
  try {
    const data = await fetchAPI<StrapiSingleResponse<Global>>(
      '/global',
      { next: { revalidate: 3600 } }, // Cache for 1 hour
      {
        populate: '*',
      }
    );

    return data.data;
  } catch (error) {
    console.error('Failed to fetch global settings:', error);
    return null;
  }
}

/**
 * Get tours for listing page (lighter payload)
 */
export async function getToursForListing(): Promise<TourCard[]> {
  try {
    const data = await fetchAPI<StrapiResponse<Tour[]>>(
      '/tours',
      { next: { revalidate: 60 } },
      {
        populate: {
          contentSections: {
            populate: '*',
          },
        },
      }
    );

    // Transform tours to card format
    return data.data.map((tour) => {
      const heroSection = tour.contentSections?.find(
        (section) => section.__component === 'tour.hero-section'
      ) as unknown as { backgroundImage?: StrapiMedia };

      const infoCardsSection = tour.contentSections?.find(
        (section) => section.__component === 'tour.info-cards-section'
      ) as unknown as { cards?: Array<{ label: string; value: string }> };

      const pricingSection = tour.contentSections?.find(
        (section) => section.__component === 'tour.pricing-section'
      ) as unknown as { price?: number };

      // Extract duration and difficulty from info cards
      const durationCard = infoCardsSection?.cards?.find(
        (card) => card.label === 'Süre'
      );
      const difficultyCard = infoCardsSection?.cards?.find(
        (card) => card.label === 'Zorluk'
      );

      return {
        id: tour.id,
        documentId: tour.documentId,
        title: tour.title,
        slug: tour.slug,
        subtitle: tour.subtitle,
        heroImage: heroSection?.backgroundImage,
        price: pricingSection?.price,
        duration: durationCard?.value,
        difficulty: difficultyCard?.value,
      };
    });
  } catch (error) {
    console.error('Failed to fetch tours for listing:', error);
    return [];
  }
}

/**
 * Get home page content
 */
export async function getHomeContent(): Promise<Home | null> {
  try {
    const data = await fetchAPI<HomeResponse>(
      '/home',
      { next: { revalidate: 60 } },
      {
        populate: {
          contentSections: {
            populate: '*',
          },
        },
      }
    );

    return data.data;
  } catch (error) {
    console.error('Failed to fetch home content:', error);
    return null;
  }
}
