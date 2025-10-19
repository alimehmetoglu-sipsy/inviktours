# Backend - Strapi CMS

## Geliştirme

```bash
npm run develop    # Development mode with auto-reload
npm run start      # Production mode
npm run build      # Build for production
```

## Strapi Cloud Deployment Adımları

1. **Strapi Cloud Hesabı Oluşturun**
   - https://cloud.strapi.io/ adresine gidin
   - Hesap oluşturun veya giriş yapın

2. **Yeni Proje Oluşturun**
   - "Create Project" butonuna tıklayın
   - GitHub repository'nizi seçin
   - Branch: `main` veya `master`
   - Root Directory: `backend`

3. **Environment Variables Ekleyin**

   Aşağıdaki değişkenleri ekleyin (güvenli rastgele değerler kullanın):

   ```
   NODE_ENV=production
   APP_KEYS=key1,key2
   API_TOKEN_SALT=random-token-salt
   ADMIN_JWT_SECRET=admin-jwt-secret
   TRANSFER_TOKEN_SALT=transfer-token-salt
   JWT_SECRET=jwt-secret
   ```

4. **Database Ayarları**

   Strapi Cloud otomatik olarak PostgreSQL veritabanı sağlar. Manuel konfigürasyon gerekmez.

5. **Deploy**

   "Deploy" butonuna tıklayın. İlk deployment 5-10 dakika sürebilir.

6. **Admin Kullanıcısı Oluşturun**

   Deployment tamamlandıktan sonra:
   - Strapi admin panel URL'sine gidin: `https://your-app.strapiapp.com/admin`
   - İlk admin kullanıcısını oluşturun

## API Tokens

Production'da frontend'in Strapi'ye erişebilmesi için API Token oluşturmalısınız:

1. Strapi Admin Panel > Settings > API Tokens
2. "Create new API Token" butonuna tıklayın
3. İsim verin (örn: "Frontend Token")
4. Token type: "Read-Only" veya "Full Access"
5. Token'ı kopyalayın ve güvenli bir yerde saklayın

## CORS Ayarları

Production'da `config/middlewares.ts` dosyasında CORS ayarlarını güncelleyin:

```typescript
origin: ['https://your-frontend-domain.vercel.app']
```

## Veritabanı Migrasyonu

Yerel SQLite'tan Strapi Cloud PostgreSQL'e geçiş için:

1. Yerel ortamda içerik oluşturun
2. Settings > Transfer Tokens > Create new Transfer Token
3. `npm run strapi transfer` komutuyla veri transfer edin

## Troubleshooting

**Build Hatası**: TypeScript hatalarını kontrol edin
**Database Error**: Environment variables'ı kontrol edin
**CORS Error**: `config/middlewares.ts` dosyasındaki domain'leri kontrol edin
