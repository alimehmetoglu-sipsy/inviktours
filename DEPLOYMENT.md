# 🚀 Deployment Rehberi - Inviktours

Production'a deploy etmek için adım adım rehber.

## 📋 Deployment Özeti

1. ✅ **Backend** → Strapi Cloud (PostgreSQL otomatik)
2. ✅ **Frontend** → Vercel
3. ✅ **Data Migration** → Manuel (Admin Panel) - Sadece 2 tur var, çok hızlı!

---

## 1️⃣ Strapi Cloud Deployment

### Adım 1: Hesap Oluştur

1. https://cloud.strapi.io adresine git
2. **Sign up with GitHub** ile kayıt ol

### Adım 2: Proje Oluştur

1. Dashboard'da **"Create Project"** butonuna tıkla
2. **Connect GitHub**:
   - Repository seç: `inviktours`
   - Base directory: `backend`
3. **Region** seç (Europe - Frankfurt önerilir)
4. **Plan** seç (Free tier yeterli)

### Adım 3: Environment Variables

Strapi Cloud dashboard → Settings → Variables

```env
# Node Environment
NODE_ENV=production

# Public URL (Strapi Cloud size verecek, deploy sonrası ekleyin)
PUBLIC_URL=https://your-project-name.strapiapp.com

# CORS (Vercel URL'inizi ekleyin, ilk başta localhost bırakabilirsiniz)
CORS_ORIGINS=http://localhost:3000

# Secrets - YENİ DEĞERLER OLUŞTURUN!
# Komut: node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
APP_KEYS=<KEY1>,<KEY2>,<KEY3>,<KEY4>
API_TOKEN_SALT=<RANDOM_STRING>
ADMIN_JWT_SECRET=<RANDOM_STRING>
TRANSFER_TOKEN_SALT=<RANDOM_STRING>
JWT_SECRET=<RANDOM_STRING>
```

**🔐 Secret Oluşturma:**

Terminal'de çalıştır (4 kez):
```bash
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
```

Her çıktıyı `APP_KEYS`'e virgülle ayırarak ekle.

> **ÖNEMLİ:** DATABASE variables eklemeyin! Strapi Cloud otomatik PostgreSQL sağlar.

### Adım 4: Deploy

1. **"Deploy"** butonuna tıkla
2. İlk deploy ~5-10 dakika sürer
3. Logs'u izle: **"View Logs"**

### Adım 5: Admin Kullanıcı Oluştur

Deploy tamamlandıktan sonra:

1. Strapi URL'ine git: `https://your-project-name.strapiapp.com/admin`
2. İlk admin kullanıcısını oluştur:
   - Firstname
   - Lastname
   - Email
   - Password (güçlü şifre!)

### Adım 6: Public Permissions Ayarla

Strapi Admin → Settings → Users & Permissions → Roles → Public

**İzinleri Aç:**
- ✅ **Tour**: find, findOne
- ✅ **Global**: find
- ✅ **Home**: find
- ✅ **Upload**: find, findOne (resimler için)

**Save** butonuna tıkla.

---

## 2️⃣ Vercel Deployment (Frontend)

### Adım 1: Hesap Oluştur

1. https://vercel.com adresine git
2. **Continue with GitHub** ile giriş yap

### Adım 2: Proje Import

1. Dashboard'da **"Add New..." → Project**
2. **Import Git Repository**:
   - Repository seç: `inviktours`
   - **Import** tıkla

### Adım 3: Konfigürasyon

**Framework Preset:** Next.js (otomatik algılanır)

**Root Directory:**
- **Edit** tıkla
- `frontend` yaz
- **Continue**

**Build Settings:**
- Build Command: `npm run build` (otomatik)
- Output Directory: `.next` (otomatik)
- Install Command: `npm install` (otomatik)

### Adım 4: Environment Variables

**Add Environment Variable:**

```env
Variable: NEXT_PUBLIC_STRAPI_URL
Value: https://your-project-name.strapiapp.com
```

**Environments:**
- ✅ Production
- ✅ Preview
- ✅ Development

### Adım 5: Deploy

1. **Deploy** butonuna tıkla
2. Deploy ~2-3 dakika sürer
3. Deploy tamamlandığında **"Visit"** tıkla

---

## 3️⃣ CORS Ayarlarını Güncelle

Frontend deploy edildikten sonra:

### Vercel URL'ini Al

Deploy sonrası Vercel size bir URL verecek:
- `https://your-app.vercel.app`

### Strapi Cloud'da CORS Güncelle

1. Strapi Cloud Dashboard → Settings → Variables
2. `CORS_ORIGINS` değişkenini bul
3. Güncelle:
   ```
   https://your-app.vercel.app,https://your-app-*.vercel.app
   ```
4. **Save**
5. **Redeploy** (Deploy sekmesinde "Trigger Deploy")

---

## 4️⃣ Manuel Data Migration

SQLite'dan PostgreSQL'e veri taşıma - Sadece **2 tur + ayarlar** var, çok hızlı!

### Global Settings

Strapi Admin → Content Manager → Single Types → Global

**Ekle:**
```
Site Name: Inviktours
Site Description: Doğanın kalbine unutulmaz yolculuklar

Navigation Links:
  1. Label: Turlar, URL: /tours, Order: 0
  2. Label: Bölgeler, URL: #, Order: 1
  3. Label: Blog, URL: #, Order: 2
  4. Label: Hakkımızda, URL: #, Order: 3

Contact Button Text: İletişim
Contact Button URL: #

Footer Text: © 2025 Inviktours. Tüm hakları saklıdır.
```

**Save**

### Home Page Content

Content Manager → Single Types → Home Page

**Content Sections Ekle (sırasıyla):**

**1. Hero Section:**
```
Badge Text: Doğa ile Bütünleşin
Badge Icon: eco
Title: Doğanın Kalbine Unutulmaz
Highlighted Text: Yolculuklar
Description: Türkiye'nin en güzel doğa rotalarında profesyonel rehberlik eşliğinde maceraya hazır olun.
Primary Button Text: Turları Keşfet
Primary Button URL: /tours
Secondary Button Text: Daha Fazla Bilgi
Secondary Button URL: #features
```

**2. Stats Section:**
```
Stats:
  - Value: 100+, Label: Mutlu Gezgin, Order: 0
  - Value: {toursCount}+, Label: Farklı Rota, Order: 1
  - Value: 5★, Label: Memnuniyet, Order: 2
```

**3. Featured Tours Section:**
```
Title: Öne Çıkan Turlar
Subtitle: En popüler doğa rotalarımızı keşfedin
Number of Tours: 3
View All Button Text: Tüm Turları Gör
View All Button URL: /tours
```

**4. Features Section:**
```
Title: Neden Inviktours?
Subtitle: Doğa turlarında güvenilir tercihiniz

Features (6 adet):
  1. Icon: verified_user, Title: Profesyonel Rehberlik, Description: Deneyimli ve sertifikalı rehberlerimizle güvenli yolculuklar, Order: 0
  2. Icon: groups, Title: Küçük Gruplar, Description: Kalabalık gruplar değil, samimi ve keyifli deneyimler, Order: 1
  3. Icon: nature_people, Title: Doğa Dostu, Description: Sürdürülebilir turizm anlayışıyla doğaya saygılı turlar, Order: 2
  4. Icon: star, Title: Yüksek Memnuniyet, Description: Katılımcılarımızın %95'i bizi tekrar tercih ediyor, Order: 3
  5. Icon: photo_camera, Title: Fotoğraf Fırsatları, Description: Eşsiz manzaralar ve unutulmaz anılar için özel durma noktaları, Order: 4
  6. Icon: support_agent, Title: 7/24 Destek, Description: Tur öncesi, sırası ve sonrasında yanınızdayız, Order: 5
```

**5. CTA Section:**
```
Icon: explore
Title: Maceraya Hazır mısınız?
Description: Doğanın size sunduğu eşsiz güzellikleri keşfetmek için hemen bir tura katılın. İlk adımı atın, gerisini biz halledelim!
Button Text: Hemen Keşfet
Button URL: /tours
```

**Save**

### Turlar (2 adet)

Local'inizde kayıtlı tur bilgilerini kopyalayarak oluşturun.

Content Manager → Collection Types → Tour → Create new entry

#### Tur 1: Karadeniz Yaylaları

**Basic Info:**
```
Title: Karadeniz Yaylaları ve Fırtına Vadisi Macerası
Slug: karadeniz-yaylalari-ve-firtina-vadisi-macerasi
Subtitle: Doğanın kalbine unutulmaz bir yolculuk
```

**Content Sections:**

1. **Hero Section:**
   - Title: Karadeniz Yaylaları ve Fırtına Vadisi Macerası
   - Subtitle: Doğanın kalbine unutulmaz bir yolculuk
   - Background Image: Upload et (local'deki resimler: `backend/.tmp/data.db.backup`)

2. **Info Cards Section:**
   - Süre: 7 Gün / 6 Gece
   - Zorluk: Orta Seviye
   - Konaklama: Butik Oteller
   - Ulaşım: Özel Araç

3. **Timeline Section:**
   (Günlük program)

4. **Gallery Section:**
   (Resimler)

5. **Pricing Section:**
   - Price: 12500
   - Included/Excluded Items

6. **Contact Form Section**

**Save and Publish**

> **💡 İpucu:** Local Strapi'den export ettiğiniz `data-backup.tar.gz` dosyasını açıp içeriği görebilirsiniz.

---

## 5️⃣ Test

### Frontend Test

1. Vercel URL'ine git: `https://your-app.vercel.app`
2. Kontrol et:
   - ✅ Ana sayfa yükleniyor
   - ✅ Turlar sayfası çalışıyor
   - ✅ Tur detay sayfası açılıyor
   - ✅ Resimler görünüyor
   - ✅ Navbar ve Footer dinamik

### Backend Test

1. Strapi URL'ine git: `https://your-project.strapiapp.com/api/tours`
2. Turlar JSON olarak görünmeli

---

## 🔧 Troubleshooting

### Strapi Deploy Başarısız

**Hata:** Build failed

**Çözüm:**
1. Logs kontrol et
2. Environment variables doğru mu?
3. `backend/package.json` dependencies güncel mi?

### Vercel Build Başarısız

**Hata:** "NEXT_PUBLIC_STRAPI_URL is not defined"

**Çözüm:**
1. Environment Variable eklenmiş mi?
2. Tüm environment'lar seçili mi? (Production, Preview, Development)
3. Redeploy yap

### CORS Hatası

**Hata:** "Access-Control-Allow-Origin"

**Çözüm:**
1. Strapi Cloud → Variables → `CORS_ORIGINS`
2. Vercel URL'ini ekle
3. Strapi'yi redeploy et

### Resimler Görünmüyor

**Hata:** Images not loading

**Çözüm:**
1. `next.config.ts` → `images.remotePatterns` kontrol
2. `*.strapiapp.com` ekli mi?
3. Strapi'de Upload permissions açık mı?

---

## 📊 Deployment Checklist

### Before Deploy

- [ ] SQLite verileri yedeklendi
- [ ] Environment variables hazır
- [ ] CORS domains belirlendi
- [ ] Secrets oluşturuldu

### Strapi Cloud

- [ ] Proje oluşturuldu
- [ ] GitHub bağlandı
- [ ] Environment variables eklendi
- [ ] Deploy başarılı
- [ ] Admin user oluşturuldu
- [ ] Public permissions ayarlandı

### Data Migration

- [ ] Global settings eklendi
- [ ] Home page content eklendi
- [ ] Turlar eklendi (2 adet)
- [ ] Resimler upload edildi

### Vercel

- [ ] Proje import edildi
- [ ] Root directory ayarlandı (`frontend`)
- [ ] Environment variables eklendi
- [ ] Deploy başarılı
- [ ] CORS güncellendi

### Testing

- [ ] Ana sayfa çalışıyor
- [ ] Turlar sayfası çalışıyor
- [ ] Tur detay çalışıyor
- [ ] Resimler yükleniyor
- [ ] API çalışıyor

---

## 🎉 Deployment Tamamlandı!

Artık siteniz production'da!

**Frontend:** https://your-app.vercel.app
**Backend:** https://your-project.strapiapp.com/admin

### Custom Domain (Opsiyonel)

**Vercel:**
1. Settings → Domains → Add Domain
2. DNS kayıtlarını ekle
3. SSL otomatik

**Strapi Cloud:**
- Pro plan gerekiyor custom domain için

---

## 📞 Destek

Sorularınız için:
- Strapi Docs: https://docs.strapi.io
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs

---

**⏱️ Tahmini Süre:**
- Strapi Cloud Deploy: ~10 dakika
- Vercel Deploy: ~3 dakika
- Manuel Data Migration: ~15 dakika
- **Toplam: ~30 dakika**

Başarılar! 🚀
