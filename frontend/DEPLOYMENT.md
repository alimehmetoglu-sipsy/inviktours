# Frontend Deployment Guide

## Vercel'e Deploy Etme

### 1. Vercel Hesabı Oluşturun

- https://vercel.com adresine gidin
- GitHub hesabınızla giriş yapın

### 2. Projeyi Import Edin

1. Vercel dashboard'da "Add New Project" butonuna tıklayın
2. GitHub repository'nizi seçin
3. **Configure Project** ekranında:
   - **Framework Preset**: Next.js (otomatik algılanır)
   - **Root Directory**: `frontend` seçin
   - **Build Command**: `npm run build` (otomatik)
   - **Output Directory**: `.next` (otomatik)

### 3. Environment Variables Ekleyin

"Environment Variables" bölümünde aşağıdaki değişkenleri ekleyin:

```
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-app.strapiapp.com
NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi-app.strapiapp.com/api
```

**ÖNEMLİ**: Strapi Cloud deployment'ınız tamamlandıktan sonra gerçek URL'yi buraya ekleyin.

### 4. Deploy Edin

"Deploy" butonuna tıklayın. İlk deployment 2-3 dakika sürer.

## Deployment Sonrası Ayarlar

### 1. Strapi CORS Güncelleme

Backend'de (`backend/config/middlewares.ts`) Vercel URL'inizi ekleyin:

```typescript
{
  name: 'strapi::cors',
  config: {
    origin: [
      'http://localhost:3000',
      'https://your-project.vercel.app'  // Vercel URL'inizi ekleyin
    ],
  },
}
```

### 2. Custom Domain (Opsiyonel)

Vercel'de:
1. Project Settings > Domains
2. Custom domain ekleyin
3. DNS ayarlarını yapılandırın

Domain eklendikten sonra Strapi CORS'a da bu domain'i ekleyin.

## Environment Variables Yönetimi

### Development
`.env.local` dosyası:
```bash
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337/api
```

### Production
Vercel dashboard > Project Settings > Environment Variables

### Preview Deployments

Preview deployment'lar için ayrı Strapi instance kullanmak isterseniz:

1. Vercel'de "Preview" environment için değişken ekleyin
2. `NEXT_PUBLIC_STRAPI_URL=https://staging-strapi.strapiapp.com` gibi

## Otomatik Deploymentlar

Vercel otomatik olarak:
- `main` branch'e push edilen her commit'i production'a deploy eder
- Diğer branch'lere push edilen commit'leri preview olarak deploy eder
- Pull request'lerde preview URL oluşturur

## Build Optimizasyonu

Next.js otomatik olarak:
- Image optimization
- Code splitting
- Static generation (SSG) ve Server-side rendering (SSR)
gerçekleştirir.

## Troubleshooting

### Build Hatası
- TypeScript hatalarını kontrol edin: `npm run build`
- ESLint hatalarını kontrol edin: `npm run lint`

### API Bağlantı Hatası
- Environment variables doğru mu kontrol edin
- Strapi CORS ayarlarını kontrol edin
- Network tab'de API isteklerini kontrol edin

### Image Yükleme Hatası
Strapi'den gelen görseller için `next.config.ts`'de domain ekleyin:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'your-strapi-app.strapiapp.com',
    },
  ],
}
```

## Monitoring

- Vercel Analytics: Project > Analytics
- Error tracking: Vercel'in built-in error tracking'i
- Performance metrics: Lighthouse scores

## CI/CD

Vercel otomatik CI/CD sağlar. Ek configuration gerekmez.

Custom CI/CD için GitHub Actions kullanabilirsiniz:
- Build test
- Lint check
- Type check

## Güvenlik

- API anahtarlarını asla client-side'da expose etmeyin
- Sadece `NEXT_PUBLIC_` prefix'li değişkenler client'a expose edilir
- Sensitive data için server-side API routes kullanın
