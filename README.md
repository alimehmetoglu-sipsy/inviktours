# 🏔️ Inviktours - Doğa Turları Platformu

Next.js 15 + Strapi 5 ile geliştirilmiş modern bir doğa turları web uygulaması.

## Proje Yapısı

```
inviktours/
├── frontend/          # Next.js uygulaması
├── backend/           # Strapi CMS
└── README.md
```

## Geliştirme Ortamı

### Gereksinimler

- Node.js 18.x veya 20.x
- npm veya yarn

### Kurulum

1. Projeyi klonlayın:
```bash
git clone <repository-url>
cd inviktours
```

2. Backend bağımlılıklarını yükleyin:
```bash
cd backend
npm install
cp .env.example .env
# .env dosyasındaki secret'ları güncelleyin (development için mevcut değerler kullanılabilir)
```

3. Frontend bağımlılıklarını yükleyin:
```bash
cd ../frontend
npm install
cp .env.example .env.local
```

### Yerel Geliştirme

1. Backend'i başlatın (terminal 1):
```bash
cd backend
npm run develop
```
Strapi admin paneli: http://localhost:1337/admin

2. Frontend'i başlatın (terminal 2):
```bash
cd frontend
npm run dev
```
Frontend: http://localhost:3000

## Deployment

### Strapi Cloud Deployment

1. [Strapi Cloud](https://cloud.strapi.io/) hesabı oluşturun
2. Yeni bir proje oluşturun
3. GitHub repository'nizi bağlayın ve `backend` dizinini seçin
4. Environment variables ekleyin:
   - `APP_KEYS`: İki rastgele string, virgülle ayrılmış
   - `API_TOKEN_SALT`: Rastgele string
   - `ADMIN_JWT_SECRET`: Rastgele string
   - `TRANSFER_TOKEN_SALT`: Rastgele string
   - `JWT_SECRET`: Rastgele string
5. Deploy edin

**Not:** Strapi Cloud otomatik olarak PostgreSQL veritabanı sağlar.

### Vercel Deployment (Frontend)

1. [Vercel](https://vercel.com) hesabı oluşturun
2. GitHub repository'nizi import edin
3. Root Directory olarak `frontend` seçin
4. Environment Variables ekleyin:
   ```
   NEXT_PUBLIC_STRAPI_URL=https://your-strapi-app.strapiapp.com
   NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi-app.strapiapp.com/api
   ```
5. Deploy edin

### Environment Variables

#### Backend (.env)
```bash
# Server
HOST=0.0.0.0
PORT=1337

# Secrets (Üretim için mutlaka değiştirin!)
APP_KEYS=key1,key2
API_TOKEN_SALT=random-string
ADMIN_JWT_SECRET=random-string
TRANSFER_TOKEN_SALT=random-string
JWT_SECRET=random-string

# Database (Strapi Cloud otomatik sağlar)
DATABASE_CLIENT=postgres
DATABASE_HOST=your-db-host
DATABASE_PORT=5432
DATABASE_NAME=your-db-name
DATABASE_USERNAME=your-db-user
DATABASE_PASSWORD=your-db-password
DATABASE_SSL=true
```

#### Frontend (.env.local)
```bash
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-app.strapiapp.com
NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi-app.strapiapp.com/api
```

## CORS Yapılandırması

Backend'de CORS ayarlarını güncelleyin (`backend/config/middlewares.ts`):

```typescript
origin: ['https://your-frontend-url.vercel.app']
```

## Teknolojiler

### Frontend
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS

### Backend
- Strapi 5
- SQLite (development)
- PostgreSQL (production)

## Güvenlik

- Production environment'ta mutlaka güçlü secret key'ler kullanın
- `.env` dosyalarını asla Git'e commit etmeyin
- CORS ayarlarını production domain'lerinizle güncelleyin

## Lisans

ISC
