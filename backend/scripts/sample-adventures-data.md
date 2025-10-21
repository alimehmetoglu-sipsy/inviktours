# Örnek Adventure Data - G Adventures Stili

Bu dosya, yeni G Adventures tarzı adventure sayfaları için 3 örnek adventure verisi içerir. Bu verileri Strapi Admin Panel'den manuel olarak girebilirsiniz.

## Önemli Notlar

1. **Strapi'yi yeniden başlatın**: Yeni component'lerin yüklenmesi için `npm run develop` komutunu çalıştırın
2. **Görseller**: Mainİmage ve images field'ları için Media Library'den görsel seçin veya yükleyin
3. **Rich Text**: Description field'ı Strapi'nin rich text editörünü kullanır

---

## Adventure 1: Absolute Turkey

### Temel Bilgiler
- **Title**: Absolute Turkey
- **Slug**: absolute-turkey
- **Subtitle**: Tarihi ve doğal güzelliklerin buluştuğu Türkiye turu
- **Duration**: 15
- **Start Location**: İstanbul
- **End Location**: İstanbul

### Description (Rich Text)
```
<p>Bu kapsamlı Türkiye turu, tarihi ve plajları, insan yapımı harikaları ve doğal fenomenleri, canlı ve misafirperver bir kültürü bir araya getiriyor. İstanbul'un saraylarını ve camilerini gezerek gezinize başlayın, ardından tuhaf Kapadokya'yı keşfederek yolculuğunuza devam edin.</p>

<p>Pamukkale'nin muhteşem beyaz uçurum şelalelerinden İstanbul'un hareketli pazarlarına kadar, yerel CEO'larımız (Baş Deneyim Görevlilerimiz) size bölgenin gizli mücevherlerini gösterecek ve Asya ile Avrupa'nın bu kavşak noktasından ayrıldıktan sonra uzun süre hatıralarınızda parlak bir şekilde yanmaya devam edecek.</p>
```

### Trip Attributes
- **Style**: Klasik
- **Style Description**: Tüm öne çıkanlar, kültür, erişim ve inanılmaz anlar, hepsi harika bir fiyata.
- **Service**: Standart
- **Service Description**: Karakterli konforlu turistik sınıf konaklama; toplu ve özel ulaşım karışımı.
- **Physical**: Hafif
- **Physical Description**: Çoğu fitness seviyesine uygun hafif yürüyüş ve trekking. Fazla zorlayıcı değil.
- **Group Type**: Küçük Grup
- **Group Type Description**: Küçük grup deneyimi; Maksimum 15, ortalama 10 kişi.

### Trip Info
- **Age Requirement**: 18 yaşından küçük tüm gezginler bir yetişkin eşliğinde olmalıdır.
- **Visa Requirement**: Rezervasyon yapmadan önce, gezinizde geçtiğiniz ve seyahat ettiğiniz ülkelere girmek için hangi belgelere ihtiyacınız olduğunu öğrenmek için kullanışlı giriş gereksinimleri aracımızı kullanın.
- **Visa Link**: https://www.evisa.gov.tr

### Itinerary (15 gün)

#### Gün 1: İstanbul
- **Day Number**: 1
- **Location**: İstanbul
- **Summary**: İstediğiniz zaman ulaşın.
- **Details**: <p>Akşam karşılama toplantımıza kadar planlanmış aktivite yok. Toplantıdan sonra, CEO'nuz ve diğer gezginlerle akşam yemeği için katılmayı seçebilirsiniz.</p>
- **Activities**:
  - Name: "Hoşgeldiniz Anı - CEO'nuz ve Grubunuzla Tanışın", Icon: "celebration", IsOptional: false

#### Gün 2: İstanbul
- **Day Number**: 2
- **Location**: İstanbul
- **Summary**: İstanbul'un tarihi yarımadasını rehberli yürüyüş turu.
- **Details**: <p>Sultanahmet Camii, Ayasofya ve Topkapı Sarayı'nı gezin. Kapalı Çarşı'da alışveriş yapma fırsatı.</p>
- **Meals**: Kahvaltı
- **Activities**:
  - Name: "Sultanahmet Camii Gezisi", Icon: "mosque", IsOptional: false
  - Name: "Ayasofya Müzesi", Icon: "museum", IsOptional: false
  - Name: "Topkapı Sarayı", Icon: "castle", IsOptional: false
  - Name: "Kapalı Çarşı Alışverişi", Icon: "shopping_bag", IsOptional: true

#### Gün 3: İstanbul - Çanakkale
- **Day Number**: 3
- **Day Range**: 3
- **Location**: Çanakkale
- **Summary**: Gelibolu Savaş Alanlarını ziyaret ederek Çanakkale'ye hareket.
- **Details**: <p>Tarihi Gelibolu Yarımadası'nda rehberli tur. ANZAC Koyu, Lone Pine ve Chunuk Bair anıtlarını ziyaret edin.</p>
- **Meals**: Kahvaltı
- **Accommodation**: Otel
- **Activities**:
  - Name: "Gelibolu Savaş Alanları Turu", Icon: "history_edu", IsOptional: false

#### Gün 4-5: Selçuk/Kuşadası
- **Day Number**: 4
- **Day Range**: 4-5
- **Location**: Selçuk/Kuşadası
- **Summary**: Efes antik kentini keşfedin ve Aegean sahilinde dinlenin.
- **Details**: <p>Efes'in iyi korunmuş antik kalıntılarını gezin. Celsus Kütüphanesi ve Büyük Tiyatro'yu görün. Serbest zaman plajda rahatlamak için.</p>
- **Meals**: Kahvaltı (2x)
- **Accommodation**: Otel
- **Activities**:
  - Name: "Efes Antik Kenti Turu", Icon: "account_balance", IsOptional: false
  - Name: "Meryem Ana Evi", Icon: "church", IsOptional: true
  - Name: "Şirince Köyü Gezisi", Icon: "landscape", IsOptional: true

#### Gün 6: Pamukkale
- **Day Number**: 6
- **Location**: Pamukkale
- **Summary**: Pamukkale'nin beyaz travertenlerini ve Hierapolis antik kentini keşfedin.
- **Details**: <p>Doğal kalsiyum havuzlarında yüzme fırsatı. Hierapolis antik kenti ve Kleopatra Havuzu ziyareti.</p>
- **Meals**: Kahvaltı, Akşam Yemeği
- **Accommodation**: Otel
- **Activities**:
  - Name: "Pamukkale Travertenleri", Icon: "pool", IsOptional: false
  - Name: "Hierapolis Antik Kenti", Icon: "ruin_bar", IsOptional: false
  - Name: "Kleopatra Antik Havuzu", Icon: "hot_tub", IsOptional: true

#### Gün 7-9: Kaş
- **Day Number**: 7
- **Day Range**: 7-9
- **Location**: Kaş
- **Summary**: Akdeniz kıyısında serbest zaman.
- **Details**: <p>Plajda rahatlamak, deniz kayağı yapmak veya Kekova adası tekne turuna katılmak için serbest zaman.</p>
- **Meals**: Kahvaltı (3x)
- **Accommodation**: Otel
- **Activities**:
  - Name: "Kekova Tekne Turu", Icon: "sailing", IsOptional: true
  - Name: "Deniz Kayağı", Icon: "kayaking", IsOptional: true
  - Name: "Dalış", Icon: "scuba_diving", IsOptional: true

#### Gün 10-11: Kapadokya
- **Day Number**: 10
- **Day Range**: 10-11
- **Location**: Kapadokya
- **Summary**: Kapadokya'nın peri bacalarını ve yeraltı şehirlerini keşfedin.
- **Details**: <p>Göreme Açık Hava Müzesi'ni gezin. Yeraltı şehrini keşfedin. Sıcak hava balonu turu opsiyonel.</p>
- **Meals**: Kahvaltı (2x)
- **Accommodation**: Mağara Otel
- **Activities**:
  - Name: "Göreme Açık Hava Müzesi", Icon: "landscape", IsOptional: false
  - Name: "Yeraltı Şehri Turu", Icon: "stairs", IsOptional: false
  - Name: "Sıcak Hava Balonu Turu", Icon: "air", IsOptional: true

#### Gün 12: Ankara
- **Day Number**: 12
- **Location**: Ankara
- **Summary**: Ankara'ya seyahat ve Anıtkabir ziyareti.
- **Details**: <p>Başkent Ankara'yı ziyaret edin. Anıtkabir ve Anadolu Medeniyetleri Müzesi'ni gezin.</p>
- **Meals**: Kahvaltı
- **Accommodation**: Otel
- **Activities**:
  - Name: "Anıtkabir Ziyareti", Icon: "monument", IsOptional: false
  - Name: "Anadolu Medeniyetleri Müzesi", Icon: "museum", IsOptional: false

#### Gün 13-14: İstanbul
- **Day Number**: 13
- **Day Range**: 13-14
- **Location**: İstanbul
- **Summary**: İstanbul'a dönüş ve serbest zaman.
- **Details**: <p>İstanbul'da keşfetmek, alışveriş yapmak veya isteğe bağlı turlar için serbest zaman. Boğaz turu, Türk hamamı deneyimi gibi opsiyonel aktiviteler.</p>
- **Meals**: Kahvaltı (2x)
- **Accommodation**: Otel
- **Activities**:
  - Name: "Boğaz Turu", Icon: "directions_boat", IsOptional: true
  - Name: "Türk Hamamı", Icon: "spa", IsOptional: true
  - Name: "Whirling Dervishes Gösterisi", Icon: "theater_comedy", IsOptional: true

#### Gün 15: İstanbul
- **Day Number**: 15
- **Location**: İstanbul
- **Summary**: İstediğiniz zaman ayrılın.
- **Details**: <p>Ekstra konaklama rezervasyonu yapılmadıysa, check-out saati 12:00'dir.</p>
- **Meals**: Kahvaltı

---

## Adventure 2: Cappadocia Explorer

### Temel Bilgiler
- **Title**: Cappadocia Explorer
- **Slug**: cappadocia-explorer
- **Subtitle**: Kapadokya'nın büyülü dünyasında 7 gün
- **Duration**: 7
- **Start Location**: Kayseri
- **End Location**: Kayseri

### Description (Rich Text)
```
<p>Kapadokya'nın eşsiz coğrafyasını ve zengin tarihini keşfedin. Peri bacaları arasında yürüyün, yeraltı şehirlerini gezin ve sıcak hava balonunda gökyüzüne yükselip muhteşem manzaraları izleyin.</p>

<p>Bu 7 günlük macera, Kapadokya'nın tüm önemli noktalarını kapsar: Göreme Açık Hava Müzesi'nin kaya kiliseleri, Ihlara Vadisi'nin doğal güzelliği, Ürgüp'ün şarap mahzenlerı ve daha fazlası. Mağara otelde kalın ve bölgenin eşsiz atmosferini yaşayın.</p>
```

### Trip Attributes
- **Style**: Aktif
- **Style Description**: Doğa, yürüyüş ve kültür odaklı aktif keşif turu.
- **Service**: Konfor
- **Service Description**: Özenle seçilmiş oteller ve butik mağara oteller.
- **Physical**: Orta
- **Physical Description**: Günde 3-5 saat yürüyüş içerir. Orta fitness seviyesi gerektirir.
- **Group Type**: Küçük Grup
- **Group Type Description**: Maksimum 12 kişi, ortalama 8 kişi.

### Trip Info
- **Age Requirement**: 12 yaş ve üzeri.
- **Visa Requirement**: Türkiye vatandaşları için vize gerekmez. Yabancı misafirler için e-Vize sistemi mevcuttur.

### Itinerary (7 gün)

#### Gün 1: Kayseri - Göreme
- **Day Number**: 1
- **Location**: Göreme
- **Summary**: Kayseri Havaalanı'ndan transfer ve Göreme'ye yerleşme.
- **Meals**: Akşam Yemeği
- **Accommodation**: Mağara Otel

#### Gün 2: Göreme
- **Day Number**: 2
- **Location**: Göreme
- **Summary**: Göreme Açık Hava Müzesi ve Love Valley yürüyüşü.
- **Meals**: Kahvaltı
- **Accommodation**: Mağara Otel
- **Activities**:
  - Name: "Göreme Açık Hava Müzesi", Icon: "museum", IsOptional: false
  - Name: "Love Valley Trekking", Icon: "hiking", IsOptional: false
  - Name: "Sıcak Hava Balonu (Sabah)", Icon: "air", IsOptional: true

#### Gün 3: Yeraltı Şehri
- **Day Number**: 3
- **Location**: Derinkuyu
- **Summary**: Derinkuyu yeraltı şehrini keşfedin.
- **Meals**: Kahvaltı, Öğle Yemeği
- **Accommodation**: Mağara Otel
- **Activities**:
  - Name: "Derinkuyu Yeraltı Şehri", Icon: "stairs", IsOptional: false

#### Gün 4: Ihlara Vadisi
- **Day Number**: 4
- **Location**: Ihlara Vadisi
- **Summary**: Ihlara Vadisi'nde doğa yürüyüşü.
- **Meals**: Kahvaltı, Öğle Yemeği
- **Accommodation**: Mağara Otel
- **Activities**:
  - Name: "Ihlara Vadisi Trekking", Icon: "nature_people", IsOptional: false

#### Gün 5: Ürgüp
- **Day Number**: 5
- **Location**: Ürgüp
- **Summary**: Ürgüp şarap tadımı ve çömlekçilik atölyesi.
- **Meals**: Kahvaltı
- **Accommodation**: Mağara Otel
- **Activities**:
  - Name: "Şarap Tadımı", Icon: "wine_bar", IsOptional: false
  - Name: "Avanos Çömlekçilik Atölyesi", Icon: "palette", IsOptional: true

#### Gün 6: Kapadokya
- **Day Number**: 6
- **Location**: Kapadokya
- **Summary**: At safari veya ATV turu ile vadi keşfi.
- **Meals**: Kahvaltı
- **Accommodation**: Mağara Otel
- **Activities**:
  - Name: "ATV Safari", Icon: "two_wheeler", IsOptional: true
  - Name: "At Safari", Icon: "agriculture", IsOptional: true

#### Gün 7: Kayseri
- **Day Number**: 7
- **Location**: Kayseri
- **Summary**: Havaalanına transfer.
- **Meals**: Kahvaltı

---

## Adventure 3: Mediterranean Coast Adventure

### Temel Bilgiler
- **Title**: Mediterranean Coast Adventure
- **Slug**: mediterranean-coast-adventure
- **Subtitle**: Akdeniz'in turkuaz sularında 10 günlük macera
- **Duration**: 10
- **Start Location**: Antalya
- **End Location**: Fethiye

### Description (Rich Text)
```
<p>Türkiye'nin muhteşem Akdeniz kıyısını keşfedin! Antalya'nın tarihi sokaklarından Fethiye'nin sakin koylarına kadar uzanan bu 10 günlük macera, deniz, doğa ve kültürü bir araya getiriyor.</p>

<p>Likya Yolu'nda yürüyüş yapın, Ölüdeniz'in turkuaz sularında yüzün, antik kentleri keşfedin ve geleneksel Türk mutfağının tadını çıkarın. Deniz kayağı, dalış ve yamaç paraşütü gibi aktivitelerle dolu bu tur, adrenalin tutkunları için ideal.</p>
```

### Trip Attributes
- **Style**: Aktif & Deniz
- **Style Description**: Deniz sporları, doğa yürüyüşleri ve kültürel keşifler.
- **Service**: Konfor
- **Service Description**: Plaja yakın konforlu oteller ve butik pansiyonlar.
- **Physical**: Orta-Yüksek
- **Physical Description**: Günlük trekking ve deniz aktiviteleri. İyi fitness seviyesi gerektirir.
- **Group Type**: Küçük Grup
- **Group Type Description**: Maksimum 10 kişi, ortalama 6 kişi.

### Trip Info
- **Age Requirement**: 16 yaş ve üzeri. 18 yaş altı gezginler yetişkin eşliğinde olmalıdır.
- **Visa Requirement**: Türkiye vatandaşları için vize gerekmez.

### Itinerary (10 gün)

#### Gün 1: Antalya
- **Day Number**: 1
- **Location**: Antalya
- **Summary**: Varış ve Kaleiçi oryantasyon turu.
- **Meals**: Akşam Yemeği
- **Accommodation**: Butik Otel
- **Activities**:
  - Name: "Kaleiçi Yürüyüş Turu", Icon: "directions_walk", IsOptional: false

#### Gün 2: Antalya
- **Day Number**: 2
- **Location**: Antalya
- **Summary**: Perge ve Aspendos antik kentleri turu.
- **Meals**: Kahvaltı
- **Accommodation**: Butik Otel
- **Activities**:
  - Name: "Perge Antik Kenti", Icon: "account_balance", IsOptional: false
  - Name: "Aspendos Tiyatrosu", Icon: "theater_comedy", IsOptional: false

#### Gün 3-4: Olimpos
- **Day Number**: 3
- **Day Range**: 3-4
- **Location**: Olimpos
- **Summary**: Likya Yolu trekking ve Chimaera (Yanartaş) ziyareti.
- **Meals**: Kahvaltı (2x), Akşam Yemeği (1x)
- **Accommodation**: Ağaç Ev
- **Activities**:
  - Name: "Likya Yolu Trekking", Icon: "hiking", IsOptional: false
  - Name: "Chimaera (Yanartaş)", Icon: "local_fire_department", IsOptional: false
  - Name: "Olimpos Antik Kenti", Icon: "ruin_bar", IsOptional: false

#### Gün 5-6: Kaş
- **Day Number**: 5
- **Day Range**: 5-6
- **Location**: Kaş
- **Summary**: Deniz kayağı, dalış ve Kekova tekne turu.
- **Meals**: Kahvaltı (2x)
- **Accommodation**: Otel
- **Activities**:
  - Name: "Kekova Tekne Turu", Icon: "sailing", IsOptional: false
  - Name: "Deniz Kayağı", Icon: "kayaking", IsOptional: true
  - Name: "Scuba Dalış", Icon: "scuba_diving", IsOptional: true

#### Gün 7-8: Ölüdeniz
- **Day Number**: 7
- **Day Range**: 7-8
- **Location**: Ölüdeniz
- **Summary**: Yamaç paraşütü ve Butterfly Valley trekking.
- **Meals**: Kahvaltı (2x)
- **Accommodation**: Otel
- **Activities**:
  - Name: "Babadağ Yamaç Paraşütü", Icon: "paragliding", IsOptional: true
  - Name: "Butterfly Valley Tekne Turu", Icon: "directions_boat", IsOptional: false
  - Name: "Likya Yolu - Kabak", Icon: "hiking", IsOptional: false

#### Gün 9: Fethiye
- **Day Number**: 9
- **Location**: Fethiye
- **Summary**: Fethiye pazarı ve Kayaköy hayalet köyü.
- **Meals**: Kahvaltı
- **Accommodation**: Otel
- **Activities**:
  - Name: "Fethiye Pazarı", Icon: "storefront", IsOptional: false
  - Name: "Kayaköy Hayalet Köyü", Icon: "villa", IsOptional: false

#### Gün 10: Fethiye
- **Day Number**: 10
- **Location**: Fethiye
- **Summary**: Ayrılış.
- **Meals**: Kahvaltı

---

## Strapi'ye Veri Girişi İçin Adımlar

1. **Backend'i başlatın**: `cd backend && npm run develop`
2. **Strapi Admin Panel**: http://localhost:1337/admin
3. **Content Manager > Adventures** bölümüne gidin
4. **"Create new entry"** tıklayın
5. Yukarıdaki verileri ilgili field'lara girin:
   - Temel bilgileri doldurun
   - Description için Rich Text Editor kullanın
   - Trip Attributes ve Trip Info component'lerini doldurun
   - Her bir Itinerary Day için "Add component" yapın ve verileri girin
   - Activities için her gün içinde "Add component" yaparak aktiviteleri ekleyin
6. **Media Library**: MainImage ve Images için görsel yükleyin
7. **Publish** butonuna tıklayın

### Görseller İçin Öneriler
- **Main Image**: 1200x600px manzara görselleri
- **Gallery Images**: 800x800px kare görselleri
- Unsplash.com veya Pexels.com'dan ücretsiz Türkiye görselleri kullanabilirsiniz

---

Tüm işlemler tamamlandıktan sonra frontend'de `npm run dev` ile projeyi başlatın ve http://localhost:3000/adventures/{slug} adresinden sonuçları görün!
