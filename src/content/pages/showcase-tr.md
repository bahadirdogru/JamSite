---
title: "UI Blokları"
description: "Tailwind Plus tarzı modüler UI blok örnekleri - Hero, Feature, CTA, Stats, Testimonials, FAQ"
lang: tr
pageId: showcase
blocks:
  - type: hero
    layout: split
    badge: "Yeni Sürüm v2.0"
    title: "Modern Jamstack Deneyimi"
    subtitle: "Tailwind Plus tarzında, JamSite ile kullanıma hazır premium bileşenler. Modüler yapısıyla projenizi hızlandırın."
    primaryCtaText: "Hemen Başlayın"
    primaryCtaHref: "/getting-started/"
    secondaryCtaText: "Özellikleri Keşfet"
    secondaryCtaHref: "/features/"
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
  - type: feature
    layout: grid
    heading: "Bileşen Gücü"
    subheading: "Her biri Tailwind 4 ile optimize edilmiş, performans odaklı bloklar."
    features:
      - title: Hız
        description: "Statik üretim ile anında yüklenen sayfalar."
        icon: "⚡"
      - title: SEO
        description: "Arama motorları için mükemmel yapı."
        icon: "🔍"
      - title: Dark Mode
        description: "Göz dostu karanlık tema desteği."
        icon: "🌙"
  - type: feature
    layout: screenshot
    heading: "Yönetim Paneli"
    subheading: "İçeriğinizi kolayca yönetin, gerisini JamSite halletsin."
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
    features:
      - title: Dashboards
        description: "Verilerinizi görselleştirin."
        icon: "📊"
      - title: Analytics
        description: "Ziyaretçi trafiğini takip edin."
        icon: "📈"
      - title: Reports
        description: "Detaylı raporlar oluşturun."
        icon: "📄"
  - type: stats
    stats:
      - value: "99"
        label: "Lighthouse Puanı"
      - value: "0"
        label: "JS Bağımlılığı"
      - value: "100%"
        label: "Responsive"
  - type: testimonials
    heading: "Müşteri Yorumları"
    testimonials:
      - quote: "JamSite sayesinde sitemiz artık çok daha hızlı ve modern görünüyor."
        author: "Ahmet Yılmaz"
        role: "CEO, TechNode"
      - quote: "Modüler blok yapısı sayfa oluşturma sürecimizi %50 hızlandırdı."
        author: "Ayşe Demir"
        role: "Frontend Geliştirici"
  - type: faq
    layout: accordion
    heading: "Sık Sorulan Sorular"
    items:
      - question: "JamSite ücretsiz mi?"
        answer: "Evet, JamSite açık kaynaklıdır ve MIT lisansı ile korunmaktadır."
      - question: "Kendi tasarımımı ekleyebilir miyim?"
        answer: "Kesinlikle. Tailwind CSS 4 kullanarak her bileşeni özelleştirebilirsiniz."
  - type: cta
    variant: panel
    title: "Geleceğin Web Sitelerini Bugün İnşa Edin"
    description: "Siz de Jamstack dünyasına adım atın ve performansın keyfini çıkarın."
    ctaText: "Dokümantasyonu Oku"
    ctaHref: "/getting-started/"
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80"
---

Bu sayfa tüm blok türlerini sırayla gösterir. İçerik bu dosyanın frontmatter'ındaki `blocks` dizisinden okunur.
