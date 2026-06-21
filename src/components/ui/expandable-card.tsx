import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion, type HTMLMotionProps } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { cn } from '@/lib/utils';

type ExpandableCardId = string | number;

interface ExpandableCardGroupContextValue {
  activeId: ExpandableCardId | null;
  setActiveId: (id: ExpandableCardId | null) => void;
}

const ExpandableCardGroupContext =
  createContext<ExpandableCardGroupContextValue | null>(null);

function useExpandableCardGroup() {
  const context = useContext(ExpandableCardGroupContext);
  if (!context) {
    throw new Error('ExpandableCard must be used within ExpandableCardGroup');
  }
  return context;
}

export function ExpandableCardGroup({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<ExpandableCardId | null>(null);

  useEffect(() => {
    if (activeId !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeId]);

  return (
    <ExpandableCardGroupContext.Provider value={{ activeId, setActiveId }}>
      {children}
    </ExpandableCardGroupContext.Provider>
  );
}

export function ExpandableTag({
  label,
  accentColor,
}: {
  label: string;
  accentColor?: string;
}) {
  const backgroundColor = accentColor
    ? `color-mix(in srgb, ${accentColor} 14%, #f5f5f5)`
    : '#e5e5e5';

  return (
    <span
      className="tech-badge inline-flex h-6 items-center rounded-md px-2.5 text-[0.7rem] font-medium leading-none text-[#525252]"
      style={{ backgroundColor }}
    >
      {label}
    </span>
  );
}

function AccentAnchor({
  id,
  accentColor,
  expanded,
}: {
  id: ExpandableCardId;
  accentColor: string;
  expanded: boolean;
}) {
  return (
    <motion.div
      layoutId={`accent-${id}`}
      className={cn('w-full shrink-0 rounded-lg', expanded ? 'mb-4 h-24' : 'mb-3 h-3')}
      style={{
        background: `linear-gradient(180deg, ${accentColor} 0%, ${accentColor}dd 72%, ${accentColor}55 100%)`,
      }}
    />
  );
}

export interface ExpandableCardProps {
  id: ExpandableCardId;
  title: string;
  description: string;
  accentColor?: string;
  image?: string;
  link?: string;
  collapsedContent?: ReactNode;
  children?: ReactNode;
  className?: string;
  collapsedClassName?: string;
  collapsedTitleClassName?: string;
  collapsedDescriptionClassName?: string;
  accentGradient?: boolean;
  showExpandAffordance?: boolean;
  whileHover?: HTMLMotionProps<'button'>['whileHover'];
}

export function ExpandableCard({
  id,
  title,
  description,
  accentColor = '#3b82f6',
  image,
  link,
  collapsedContent,
  children,
  className,
  collapsedClassName,
  collapsedTitleClassName,
  collapsedDescriptionClassName,
  accentGradient = false,
  showExpandAffordance = false,
  whileHover,
}: ExpandableCardProps) {
  const { activeId, setActiveId } = useExpandableCardGroup();
  const isActive = activeId === id;
  const modalRef = useRef<HTMLDivElement>(null);

  const onClose = () => setActiveId(null);

  useOutsideClick(modalRef, () => {
    if (isActive) {
      onClose();
    }
  });

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isActive]);

  const cardLayoutId = `card-${id}`;
  const titleLayoutId = `title-${id}`;
  const descLayoutId = `desc-${id}`;
  const imageLayoutId = `image-${id}`;

  const collapsedBackgroundStyle = accentGradient
    ? {
        backgroundImage: `linear-gradient(180deg, color-mix(in srgb, ${accentColor} 10%, #f5f5f5) 0%, #f5f5f5 52%)`,
      }
    : undefined;

  return (
    <>
      <motion.button
        type="button"
        layoutId={cardLayoutId}
        onClick={() => setActiveId(id)}
        whileHover={whileHover}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={collapsedBackgroundStyle}
        className={cn(
          'expandable-card relative flex cursor-pointer flex-col text-left',
          'rounded-3xl border border-[#e5e5e5] bg-[#f5f5f5] shadow-sm',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3b82f6]',
          collapsedClassName,
          className,
        )}
      >
        {image ? (
          <motion.div layoutId={imageLayoutId} className="mb-4">
            <img
              src={image}
              alt=""
              className="h-24 w-full rounded-lg border border-[#e5e5e5] object-cover"
            />
          </motion.div>
        ) : (
          <AccentAnchor id={id} accentColor={accentColor} expanded={false} />
        )}
        <motion.h3
          layoutId={titleLayoutId}
          className={cn(
            'text-lg font-bold leading-tight text-[#0a0a0a]',
            collapsedTitleClassName,
          )}
        >
          {title}
        </motion.h3>
        <motion.p
          layoutId={descLayoutId}
          className={cn(
            'mt-2 line-clamp-2 text-sm leading-snug text-[#525252]',
            collapsedDescriptionClassName,
          )}
        >
          {description}
        </motion.p>
        {collapsedContent ? (
          <div className="mt-auto pt-4">{collapsedContent}</div>
        ) : null}
        {showExpandAffordance ? (
          <span
            className="pointer-events-none absolute bottom-4 right-4 z-[1] rounded-full p-1 text-[#525252]"
            aria-hidden
          >
            <Plus size={18} />
          </span>
        ) : null}
      </motion.button>

      <AnimatePresence>
        {isActive ? (
          <motion.div
            key={`modal-backdrop-${id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
            onClick={onClose}
          >
            <motion.div
              ref={modalRef}
              layoutId={cardLayoutId}
              onClick={(event) => event.stopPropagation()}
              className={cn(
                'relative flex max-h-[min(90vh,40rem)] w-full max-w-lg flex-col overflow-y-auto',
                'rounded-3xl border border-[#e5e5e5] bg-[#f5f5f5] p-6 shadow-lg',
              )}
            >
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 z-10 rounded-full p-1 text-[#525252] transition-colors hover:bg-[#e5e5e5] hover:text-[#0a0a0a]"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {image ? (
                <motion.div layoutId={imageLayoutId} className="mb-4 pr-8">
                  <img
                    src={image}
                    alt=""
                    className="h-40 w-full rounded-xl border border-[#e5e5e5] object-cover"
                  />
                </motion.div>
              ) : (
                <AccentAnchor id={id} accentColor={accentColor} expanded />
              )}

              <motion.h3
                layoutId={titleLayoutId}
                className="pr-8 text-2xl font-bold text-[#0a0a0a]"
              >
                {title}
              </motion.h3>
              <motion.p
                layoutId={descLayoutId}
                className="mt-2 text-sm font-medium leading-relaxed text-[#525252]"
              >
                {description}
              </motion.p>

              {link ? (
                <a
                  href={link}
                  className="mt-4 inline-flex items-center gap-1 font-semibold text-[#0a0a0a] transition-all hover:translate-x-1 hover:text-black"
                  {...(link !== '#'
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  onClick={(event) => {
                    if (link === '#') {
                      event.preventDefault();
                    }
                  }}
                >
                  View project →
                </a>
              ) : null}

              {children ? <div className="mt-4">{children}</div> : null}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
