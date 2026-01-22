import { OrbitingCircles } from '@/components/magicui/orbiting-circles';
import { techStacks } from '@/data/tech-stack';
import { TechStackIcon } from './TechStackIcon';

export const TechStackGrid = () => (
  <div className="absolute right-2 top-4 h-[400px] w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_5%,#000_40%)] group-hover:scale-105 z-20">
    <div className="relative w-full h-full flex items-center justify-center mt-10">
      <OrbitingCircles radius={200} speed={0.1} iconSize={40}>
        {techStacks.outer.map((tech) => (
          <TechStackIcon key={tech.name} tech={tech} />
        ))}
      </OrbitingCircles>

      <OrbitingCircles radius={130} speed={0.2} iconSize={55} reverse>
        {techStacks.middle.map((tech) => (
          <TechStackIcon key={tech.name} tech={tech} />
        ))}
      </OrbitingCircles>

      <OrbitingCircles radius={70} speed={0.3} iconSize={70}>
        {techStacks.inner.map((tech) => (
          <TechStackIcon key={tech.name} tech={tech} />
        ))}
      </OrbitingCircles>
    </div>
  </div>
);
