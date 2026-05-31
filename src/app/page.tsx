import { Hero } from '@/components/sections/hero/Hero';
import Reveal from '@/components/sections/reveal/Reveal';
import Specs from '@/components/sections/specs/Specs';
import Design from '@/components/sections/design/Design';
import Performance from '@/components/sections/performance/Performance';
import Battery from '@/components/sections/battery/Battery';
import CTA from '@/components/sections/cta/CTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Reveal />
      <Specs />
      <Design />
      <Performance />
      <Battery />
      <CTA />
    </>
  );
}
