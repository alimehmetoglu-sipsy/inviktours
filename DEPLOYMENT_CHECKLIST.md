# Deployment Checklist

Bu checklist, projenizi production'a deploy ederken izlemeniz gereken adımları içerir.

## Hazırlık

- [ ] Kodunuz test edildi ve çalışıyor
- [ ] GitHub'a tüm değişiklikler push edildi
- [ ] `.env` dosyaları `.gitignore`'da
- [ ] Production için güvenli secret key'ler oluşturuldu

## 1. Strapi Backend Deployment (Strapi Cloud)

### 1.1 Strapi Cloud Hesabı
- [ ] https://cloud.strapi.io/ hesabı oluşturuldu
- [ ] GitHub repository bağlandı

### 1.2 Proje Oluşturma
- [ ] Yeni proje oluşturuldu
- [ ] Repository: `inviktours`
- [ ] Branch: `main` veya `master`
- [ ] Root Directory: `backend`

### 1.3 Environment Variables
- [ ] `NODE_ENV=production`
- [ ] `APP_KEYS` (2 rastgele key, virgülle ayrılmış)
- [ ] `API_TOKEN_SALT` (rastgele string)
- [ ] `ADMIN_JWT_SECRET` (rastgele string)
- [ ] `TRANSFER_TOKEN_SALT` (rastgele string)
- [ ] `JWT_SECRET` (rastgele string)

**Secret key oluşturmak için:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 1.4 Deployment
- [ ] Deploy butonu tıklandı
- [ ] Deployment başarılı
- [ ] Strapi URL not edildi: `https://_____.strapiapp.com`

### 1.5 Admin Kullanıcısı
- [ ] Admin panel açıldı: `https://_____.strapiapp.com/admin`
- [ ] İlk admin kullanıcısı oluşturuldu
- [ ] Giriş yapıldı

### 1.6 CORS Ayarları
- [ ] `backend/config/middlewares.ts` dosyası güncellendi
- [ ] Vercel domain CORS'a eklendi (Vercel deploy'dan sonra)
- [ ] Commit ve push yapıldı
- [ ] Strapi Cloud otomatik redeploy yaptı

## 2. Next.js Frontend Deployment (Vercel)

### 2.1 Vercel Hesabı
- [ ] https://vercel.com hesabı oluşturuldu
- [ ] GitHub ile bağlantı kuruldu

### 2.2 Proje Import
- [ ] "Add New Project" tıklandı
- [ ] Repository seçildi: `inviktours`
- [ ] Framework: Next.js
- [ ] Root Directory: `frontend`

### 2.3 Environment Variables
- [ ] `NEXT_PUBLIC_STRAPI_URL=https://_____.strapiapp.com`
- [ ] `NEXT_PUBLIC_STRAPI_API_URL=https://_____.strapiapp.com/api`

### 2.4 Deployment
- [ ] Deploy butonu tıklandı
- [ ] Deployment başarılı
- [ ] Vercel URL not edildi: `https://_____.vercel.app`

### 2.5 Strapi CORS Güncelleme
- [ ] Vercel URL Strapi CORS'a eklendi
- [ ] Backend commit ve push yapıldı
- [ ] Strapi Cloud otomatik redeploy yaptı

## 3. Test

### 3.1 Backend Test
- [ ] Strapi admin panel açılıyor
- [ ] API endpoints çalışıyor: `https://_____.strapiapp.com/api/users`

### 3.2 Frontend Test
- [ ] Frontend açılıyor
- [ ] Strapi'den veri çekiliyor
- [ ] Console'da CORS hatası yok
- [ ] Image'lar yükleniyor (varsa)

### 3.3 Integration Test
- [ ] Frontend → Backend API çağrıları çalışıyor
- [ ] Authentication çalışıyor (varsa)
- [ ] Form submit'ler çalışıyor (varsa)

## 4. Post-Deployment

### 4.1 Monitoring
- [ ] Vercel Analytics aktif
- [ ] Error tracking kontrol edildi

### 4.2 Dokümantasyon
- [ ] Production URL'leri dokümante edildi
- [ ] Takım üyeleriyle paylaşıldı

### 4.3 Güvenlik
- [ ] Tüm secret key'ler güçlü
- [ ] `.env` dosyaları Git'te yok
- [ ] CORS sadece production domain'lere izin veriyor

## 5. Opsiyonel

### 5.1 Custom Domain
- [ ] Vercel'de custom domain eklendi
- [ ] DNS ayarları yapıldı
- [ ] Custom domain Strapi CORS'a eklendi

### 5.2 Analytics
- [ ] Google Analytics eklendi (isteğe bağlı)
- [ ] Vercel Analytics yapılandırıldı

### 5.3 SEO
- [ ] Meta tags eklendi
- [ ] robots.txt oluşturuldu
- [ ] sitemap.xml oluşturuldu

## Troubleshooting

### Build Hatası
1. Lokal'de `npm run build` çalıştır
2. TypeScript hatalarını düzelt
3. Commit ve push yap

### API Connection Error
1. Environment variables kontrol et
2. Strapi CORS ayarlarını kontrol et
3. Network tab'de requests kontrol et

### CORS Error
1. `backend/config/middlewares.ts` kontrolü
2. Vercel URL doğru mu?
3. Strapi redeploy edildi mi?

## İletişim

Deploy sırasında sorun yaşarsanız:
- Vercel Docs: https://vercel.com/docs
- Strapi Docs: https://docs.strapi.io
- Strapi Cloud Docs: https://docs.strapi.io/cloud

---

**Deployment Tarihi**: ___________
**Deployed By**: ___________
**Production URLs**:
- Frontend: ___________
- Backend: ___________
