<script>
  import HeroSection from "./HeroSection.svelte";
  import FeatureSection from "./FeatureSection.svelte";
  import CTASection from "./CTASection.svelte";
  import StatsSection from "./StatsSection.svelte";
  import TestimonialsSection from "./TestimonialsSection.svelte";
  import FAQSection from "./FAQSection.svelte";

  let { blocks = [], langPrefix = "" } = $props();

  function prefixHref(href) {
    if (!href || href.startsWith("http") || href.startsWith("#")) return href;
    const base = langPrefix || "";
    if (href.startsWith("/")) return base + href;
    return base + "/" + href;
  }
</script>

{#each blocks ?? [] as block}
  {#if block.type === "hero"}
    <HeroSection
      layout={block.layout}
      badge={block.badge}
      title={block.title}
      subtitle={block.subtitle}
      primaryCtaText={block.primaryCtaText}
      primaryCtaHref={prefixHref(block.primaryCtaHref)}
      secondaryCtaText={block.secondaryCtaText}
      secondaryCtaHref={block.secondaryCtaHref ? prefixHref(block.secondaryCtaHref) : ""}
      image={block.image}
      imageAlt={block.imageAlt}
    />
  {:else if block.type === "feature"}
    <FeatureSection
      layout={block.layout}
      heading={block.heading}
      subheading={block.subheading}
      features={block.features ?? []}
      image={block.image}
    />
  {:else if block.type === "cta"}
    <CTASection
      variant={block.variant}
      title={block.title}
      description={block.description}
      ctaText={block.ctaText}
      ctaHref={prefixHref(block.ctaHref)}
      image={block.image}
    />
  {:else if block.type === "stats"}
    <StatsSection stats={block.stats ?? []} />
  {:else if block.type === "testimonials"}
    <TestimonialsSection
      heading={block.heading}
      testimonials={block.testimonials ?? []}
    />
  {:else if block.type === "faq"}
    <FAQSection 
      layout={block.layout}
      heading={block.heading} 
      items={block.items ?? []} 
    />
  {/if}
{/each}


