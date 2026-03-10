---
title: "UI Blocks"
description: "Tailwind Plus style modular UI block examples - Hero, Feature, CTA, Stats, Testimonials, FAQ"
lang: en
pageId: showcase
blocks:
  - type: hero
    layout: split
    badge: "New Release v2.0"
    title: "Modern Jamstack Experience"
    subtitle: "Tailwind Plus style premium components, ready to use with JamSite. Speed up your project with modular architecture."
    primaryCtaText: "Get Started Now"
    primaryCtaHref: "/getting-started/"
    secondaryCtaText: "Explore Features"
    secondaryCtaHref: "/features/"
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
  - type: feature
    layout: grid
    heading: "Component Power"
    subheading: "Performance-oriented blocks, each optimized with Tailwind 4."
    features:
      - title: Speed
        description: "Instantly loading pages with static generation."
        icon: "⚡"
      - title: SEO
        description: "Perfect structure for search engines."
        icon: "🔍"
      - title: Dark Mode
        description: "Eye-friendly dark theme support."
        icon: "🌙"
  - type: feature
    layout: screenshot
    heading: "Admin Panel"
    subheading: "Manage your content easily, let JamSite handle the rest."
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
    features:
      - title: Dashboards
        description: "Visualize your data."
        icon: "📊"
      - title: Analytics
        description: "Track visitor traffic."
        icon: "📈"
      - title: Reports
        description: "Create detailed reports."
        icon: "📄"
  - type: stats
    stats:
      - value: "99"
        label: "Lighthouse Score"
      - value: "0"
        label: "JS Dependency"
      - value: "100%"
        label: "Responsive"
  - type: testimonials
    heading: "Customer Reviews"
    testimonials:
      - quote: "Thanks to JamSite, our site now looks much faster and more modern."
        author: "Ahmet Yılmaz"
        role: "CEO, TechNode"
      - quote: "Modular block structure accelerated our page creation process by 50%."
        author: "Ayşe Demir"
        role: "Frontend Developer"
  - type: faq
    layout: accordion
    heading: "Frequently Asked Questions"
    items:
      - question: "Is JamSite free?"
        answer: "Yes, JamSite is open source and protected under the MIT license."
      - question: "Can I add my own design?"
        answer: "Absolutely. You can customize every component using Tailwind CSS 4."
  - type: cta
    variant: panel
    title: "Build the Websites of the Future Today"
    description: "Step into the Jamstack world and enjoy the performance."
    ctaText: "Read Documentation"
    ctaHref: "/getting-started/"
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80"
---

This page displays all block types in order. Content is read from the `blocks` array in this file's frontmatter.
