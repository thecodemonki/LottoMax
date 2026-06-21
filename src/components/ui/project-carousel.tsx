import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  ExpandableCard,
  ExpandableTag,
} from '@/components/ui/expandable-card';

export interface ProjectCarouselItem {
  id: number;
  title: string;
  description: string;
  tech: string[];
  link?: string;
  color?: string;
  highlights?: string[];
  image?: string;
}

const CARD_WIDTH = 300;
const SCROLL_AMOUNT = CARD_WIDTH + 16;

export function ProjectCarousel({ projects }: { projects: ProjectCarouselItem[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll, projects.length]);

  const scroll = (direction: 'left' | 'right') => {
    carouselRef.current?.scrollBy({
      left: direction === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
      behavior: 'smooth',
    });
  };

  const onCarouselKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') scroll('left');
    if (event.key === 'ArrowRight') scroll('right');
  };

  return (
    <div className="w-full">
      <div
        ref={carouselRef}
        tabIndex={0}
        onKeyDown={onCarouselKeyDown}
        className="flex w-full gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project, index) => {
          const rotation = index % 2 === 0 ? -1.5 : 1.5;
          const previewTags = project.tech.slice(0, 4);

          return (
            <ExpandableCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              accentColor={project.color}
              image={project.image}
              link={project.link}
              whileHover={{ rotate: rotation, scale: 1.02 }}
              collapsedClassName="h-[22rem] w-[18.75rem] shrink-0 p-5"
              collapsedContent={
                <div className="flex flex-wrap gap-1.5">
                  {previewTags.map((tag) => (
                    <ExpandableTag key={tag} label={tag} />
                  ))}
                </div>
              }
            >
              {project.highlights && project.highlights.length > 0 ? (
                <ul className="project-highlights">
                  {project.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              ) : null}
              <div className="project-tech mt-4 flex flex-wrap gap-2">
                {project.tech.map((tag) => (
                  <ExpandableTag key={tag} label={tag} />
                ))}
              </div>
            </ExpandableCard>
          );
        })}
      </div>

      <div className="mt-2 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e5e5e5] bg-white text-[#0a0a0a] transition-all hover:translate-x-[-2px] disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Scroll left"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e5e5e5] bg-white text-[#0a0a0a] transition-all hover:translate-x-[2px] disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Scroll right"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
