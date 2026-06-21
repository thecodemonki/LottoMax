import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { cn } from '@/lib/utils';

export interface iProject {
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  link: string;
  image?: string;
  color?: string;
}

const CARD_WIDTH = 300;
const SCROLL_AMOUNT = CARD_WIDTH + 16;

function ProjectTag({ label }: { label: string }) {
  return (
    <span className="rounded-md bg-[#e5e5e5] px-2 py-1 text-xs font-medium text-[#525252]">
      {label}
    </span>
  );
}

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: iProject;
  index: number;
  onOpen: () => void;
}) {
  const rotation = index % 2 === 0 ? -1.5 : 1.5;
  const accent = project.color ?? '#3b82f6';
  const previewTags = project.tags.slice(0, 4);

  return (
    <motion.button
      type="button"
      layoutId={`project-card-${project.title}`}
      onClick={onOpen}
      whileHover={{ rotate: rotation, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className={cn(
        'relative flex h-[22rem] w-[18.75rem] shrink-0 cursor-pointer flex-col',
        'rounded-3xl border border-[#e5e5e5] bg-[#f5f5f5] p-5 text-left shadow-sm',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3b82f6]',
      )}
      style={{ borderLeftWidth: 4, borderLeftColor: accent }}
    >
      {project.image && (
        <motion.div layoutId={`project-image-${project.title}`} className="mb-4">
          <img
            src={project.image}
            alt=""
            className="h-24 w-full rounded-lg border border-[#e5e5e5] object-cover"
          />
        </motion.div>
      )}
      <motion.h3
        layoutId={`project-title-${project.title}`}
        className="text-lg font-bold leading-tight text-[#0a0a0a]"
      >
        {project.title}
      </motion.h3>
      <motion.p
        layoutId={`project-tagline-${project.title}`}
        className="mt-2 line-clamp-2 text-sm leading-snug text-[#525252]"
      >
        {project.tagline}
      </motion.p>
      <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
        {previewTags.map((tag) => (
          <ProjectTag key={tag} label={tag} />
        ))}
      </div>
    </motion.button>
  );
}

function ExpandedProjectCard({
  project,
  onClose,
}: {
  project: iProject;
  onClose: () => void;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const accent = project.color ?? '#3b82f6';

  useOutsideClick(modalRef, onClose);

  useEffect(() => {
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div
      ref={modalRef}
      layoutId={`project-card-${project.title}`}
      onClick={(event) => event.stopPropagation()}
      className={cn(
        'relative flex max-h-[min(90vh,40rem)] w-full max-w-lg flex-col overflow-y-auto',
        'rounded-3xl border border-[#e5e5e5] bg-[#f5f5f5] p-6 shadow-lg',
      )}
      style={{ borderLeftWidth: 4, borderLeftColor: accent }}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full p-1 text-[#525252] transition-colors hover:bg-[#e5e5e5] hover:text-[#0a0a0a]"
        aria-label="Close"
      >
        <X size={18} />
      </button>

      {project.image && (
        <motion.div layoutId={`project-image-${project.title}`} className="mb-4 pr-8">
          <img
            src={project.image}
            alt=""
            className="h-40 w-full rounded-xl border border-[#e5e5e5] object-cover"
          />
        </motion.div>
      )}

      <motion.h3
        layoutId={`project-title-${project.title}`}
        className="pr-8 text-2xl font-bold text-[#0a0a0a]"
      >
        {project.title}
      </motion.h3>
      <motion.p
        layoutId={`project-tagline-${project.title}`}
        className="mt-2 text-sm font-medium text-[#525252]"
      >
        {project.tagline}
      </motion.p>

      <p className="mt-4 text-base leading-relaxed text-[#525252]">{project.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <ProjectTag key={tag} label={tag} />
        ))}
      </div>

      {project.link && (
        <a
          href={project.link}
          className="mt-6 inline-flex items-center gap-1 font-semibold text-[#0a0a0a] transition-all hover:translate-x-1 hover:text-black"
          {...(project.link !== '#'
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
          onClick={(event) => {
            if (project.link === '#') {
              event.preventDefault();
            }
          }}
        >
          View project →
        </a>
      )}
    </motion.div>
  </motion.div>
  );
}

export function ProjectCarousel({ projects }: { projects: iProject[] }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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

  useEffect(() => {
    if (openIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [openIndex]);

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

  const openProject = openIndex !== null ? projects[openIndex] : null;

  return (
    <div className="w-full">
      <div
        ref={carouselRef}
        tabIndex={0}
        onKeyDown={onCarouselKeyDown}
        className="flex w-full gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            onOpen={() => setOpenIndex(index)}
          />
        ))}
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

      <AnimatePresence>
        {openProject && (
          <ExpandedProjectCard
            key={openProject.title}
            project={openProject}
            onClose={() => setOpenIndex(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
