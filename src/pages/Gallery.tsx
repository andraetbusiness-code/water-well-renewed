import { Helmet } from "react-helmet-async";
import { PageLayout, PageHero } from "@/components/layout/PageLayout";
import serviceVisit from "@/assets/site/service-visit.webp";
import installed from "@/assets/site/installed-system.webp";
import waterTest from "@/assets/site/water-test-demo.webp";
import { site } from "@/data/site";

const items = [
  { src: serviceVisit, w: 900, h: 1200, alt: "A technician working on a home water system" },
  { src: installed, w: 505, h: 760, alt: "Two installed water treatment tanks" },
  { src: waterTest, w: 1200, h: 900, alt: "A water test demonstration in a kitchen" },
];

const Gallery = () => (
  <PageLayout>
    <Helmet>
      <title>Our Work | Select Source Water</title>
      <link rel="canonical" href={`${site.url}/gallery/`} />
    </Helmet>
    <PageHero title="Our work." />
    <section className="py-16 md:py-24">
      <div className="container grid gap-6 md:grid-cols-3">
        {items.map((i) => (
          <img key={i.src} src={i.src} width={i.w} height={i.h} alt={i.alt} loading="lazy" className="aspect-[3/4] w-full rounded-lg object-cover" />
        ))}
      </div>
    </section>
  </PageLayout>
);

export default Gallery;
