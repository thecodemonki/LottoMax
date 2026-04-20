import {
  useEffect,
  useRef,
  useState
} from 'react';
import { motion } from 'framer-motion';

const ScrollExpandMedia = ({
  mediaType = 'image',
  mediaSrc,
  title,
  date,
  scrollToExpand,
  children,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);

  const sectionRef = useRef(null);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0015;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
      if (!touchStartY) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.01 : 0.008; 
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }

        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = () => {
      setTouchStartY(0);
    };

    const handleScroll = () => {
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  // Image stays a constant size (profile picture size)
  const mediaSize = 200 + (scrollProgress * 40); // slightly grows from 200 to 240
  // Image stays in the true center rather than moving to the top
  const topPosition = 50; 

  return (
    <div ref={sectionRef} className='w-full bg-transparent'>
      <section className='relative flex flex-col items-center justify-start min-h-[100dvh] w-full overflow-hidden'>
        
        {/* The persistent profile picture layer */}
        <div
          className='absolute z-20 transition-none rounded-full overflow-hidden border-4 border-white shadow-[0_10px_30px_rgba(0,0,0,0.15)]'
          style={{
            width: `${mediaSize}px`,
            height: `${mediaSize}px`,
            top: `${topPosition}vh`,
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <img
            src={mediaSrc}
            alt='Profile'
            className='w-full h-full object-cover'
          />
        </div>

        {/* Planet Orbit System (centered exactly on profile picture) */}
        <div
          className='absolute z-10 transition-opacity duration-700 delay-150'
          style={{
            top: `${topPosition}vh`,
            left: '50%',
            opacity: showContent ? 1 : 0,
            transform: 'translate(-50%, -50%)',
            pointerEvents: showContent ? 'auto' : 'none'
          }}
        >
            {/* Work (Jupiter) */}
            <a href="#projects" className="absolute -top-[20px] -left-[140px] sm:-top-[20px] sm:-left-[240px] group flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 rounded-full transition-transform duration-500 hover:scale-110">
              <div className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(217,119,6,0.6)] group-hover:shadow-[0_0_50px_rgba(217,119,6,0.9)] transition-shadow duration-500 z-0"></div>
              <div className="absolute inset-0 rounded-full z-10 bg-[length:150%_auto] bg-center" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg")', backgroundColor: '#b45309' }}></div>
              <div className="absolute inset-0 rounded-full shadow-[inset_-16px_-16px_30px_rgba(0,0,0,0.9),inset_4px_4px_10px_rgba(255,255,255,0.3)] z-20 pointer-events-none"></div>
              <span className="z-30 text-white tracking-widest uppercase text-xs sm:text-sm font-black bg-black/60 px-2 py-1 rounded-md backdrop-blur-[2px] group-hover:bg-black/90 transition-colors">Work</span>
            </a>

            {/* Resume (Neptune) */}
            <a href="/Official_MaxwellPeng_Resume.pdf" target="_blank" rel="noopener noreferrer" className="absolute top-[20px] left-[100px] sm:top-[40px] sm:left-[160px] group flex items-center justify-center w-20 h-20 sm:w-28 sm:h-28 rounded-full transition-transform duration-500 hover:scale-110">
              <div className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(14,165,233,0.6)] group-hover:shadow-[0_0_50px_rgba(14,165,233,0.9)] transition-shadow duration-500 z-0"></div>
              <div className="absolute inset-0 rounded-full z-10 bg-[length:150%_auto] bg-center" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg")', backgroundColor: '#0284c7' }}></div>
              <div className="absolute inset-0 rounded-full shadow-[inset_-12px_-12px_24px_rgba(0,0,0,0.9),inset_3px_3px_8px_rgba(255,255,255,0.3)] z-20 pointer-events-none"></div>
              <span className="z-30 text-white tracking-widest uppercase text-xs sm:text-sm font-black bg-black/60 px-2 py-1 rounded-md backdrop-blur-[2px] group-hover:bg-black/90 transition-colors">Resume</span>
            </a>

            {/* Mansion (Mars) */}
            <a href="/mansion" className="absolute -top-[130px] left-[10px] sm:-top-[180px] sm:left-[20px] group flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 rounded-full transition-transform duration-500 hover:scale-110">
              <div className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(225,29,72,0.6)] group-hover:shadow-[0_0_50px_rgba(225,29,72,0.9)] transition-shadow duration-500 z-0"></div>
              <div className="absolute inset-0 rounded-full z-10 bg-[length:150%_auto] bg-center" style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg")', backgroundColor: '#be123c' }}></div>
              <div className="absolute inset-0 rounded-full shadow-[inset_-12px_-12px_24px_rgba(0,0,0,0.9),inset_3px_3px_8px_rgba(255,255,255,0.3)] z-20 pointer-events-none"></div>
              <span className="z-30 text-white tracking-widest uppercase text-[10px] sm:text-xs font-black bg-black/60 px-2 py-1 rounded-md backdrop-blur-[2px] group-hover:bg-black/90 transition-colors">Mansion</span>
            </a>
        </div>

        {/* Initial "Scroll to continue" text */}
        <div 
          className="absolute top-[65vh] left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10"
          style={{ opacity: 1 - (scrollProgress * 2) }} // fades out early
        >
          <p className="text-slate-400 font-medium tracking-wide animate-pulse">{scrollToExpand}</p>
          <p className="text-slate-500 mt-2 text-xl">↓</p>
        </div>

        {/* Final Hero Text & Content (fades in) */}
        <div 
          className="absolute w-full flex flex-col items-center px-4 z-10 pointer-events-none"
          style={{ top: 'calc(50vh + 140px)', opacity: scrollProgress, transform: `translateY(${20 - (scrollProgress * 20)}px)` }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-white text-center mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">{title}</span>
          </h1>
          <div className="text-xl md:text-2xl text-slate-300 font-medium text-center max-w-2xl mb-6 flex flex-wrap justify-center gap-x-2">
            {date.split(' ').map((word, i) => {
              const start = 0.3 + (i * 0.2);
              const end = start + 0.2;
              let wordOpacity = 0;
              if (scrollProgress >= end) wordOpacity = 1;
              else if (scrollProgress > start) wordOpacity = (scrollProgress - start) / 0.2;

              return (
                <span 
                  key={i} 
                  style={{ 
                    opacity: wordOpacity, 
                    transform: `translateY(${wordOpacity < 1 ? 15 - wordOpacity * 15 : 0}px)`, 
                    display: 'inline-block' 
                  }}
                >
                  {word}
                </span>
              );
            })}
          </div>
          <p className="text-lg text-slate-400 text-center max-w-3xl mb-8 leading-relaxed">
            I like to build cool stuff.
          </p>
        </div>

      </section>

      {/* The rest of the portfolio (About, Projects, etc) */}
      <motion.section
        className='flex flex-col w-full'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 50 }}
        transition={{ duration: 0.7 }}
      >

        {children}
      </motion.section>
    </div>
  );
};

export default ScrollExpandMedia;
