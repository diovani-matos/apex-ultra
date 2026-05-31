import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

ScrollTrigger.defaults({ markers: false });

export { gsap, ScrollTrigger, ScrollToPlugin };
