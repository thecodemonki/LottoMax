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
  // Image moves up from center (50vh) to top hero position (~25vh)
  const topPosition = 50 - (scrollProgress * 25); 

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
          className="absolute top-[45vh] w-full flex flex-col items-center px-4 z-10"
          style={{ opacity: scrollProgress, transform: `translateY(${20 - (scrollProgress * 20)}px)` }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-white text-center mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">{title}</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 font-medium text-center max-w-2xl mb-6">
            {date}
          </p>
          <p className="text-lg text-slate-400 text-center max-w-3xl mb-8 leading-relaxed">
            I like to build cool stuff.
          </p>

          <div className="flex flex-row flex-wrap justify-center items-center gap-6 sm:gap-10 z-10 w-full px-4 mt-4" style={{ pointerEvents: showContent ? 'auto' : 'none' }}>
            
            {/* Planet 1 - Jupiter (Work) */}
            <a href="#projects" className="group relative flex flex-col items-center justify-center w-28 h-28 sm:w-36 sm:h-36 rounded-full transition-transform duration-500 hover:scale-110">
              <div className="absolute inset-0 rounded-full shadow-[inset_-16px_-16px_25px_rgba(0,0,0,0.9),0_0_20px_rgba(217,119,6,0.3)] z-10 transition-all duration-500 group-hover:shadow-[inset_-16px_-16px_25px_rgba(0,0,0,0.9),0_0_45px_rgba(217,119,6,0.9)]"></div>
              <div className="absolute top-[10%] left-[15%] w-10 h-10 bg-white/20 rounded-full blur-[8px] z-20"></div>
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute inset-0" style={{ 
                  backgroundColor: '#d97706',
                  backgroundImage: 'repeating-linear-gradient(5deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.15) 8%, transparent 8%, transparent 15%, rgba(0,0,0,0.05) 15%, rgba(0,0,0,0.05) 25%), radial-gradient(circle at 30% 30%, #fde68a 0%, #b45309 60%, #451a03 100%)'
                }}></div>
              </div>
              <span className="z-30 relative text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)] tracking-widest uppercase text-sm font-black">Work</span>
            </a>

            {/* Planet 2 - Neptune / Ice Giant (Resume) */}
            <a href="/Official_MaxwellPeng_Resume.pdf" target="_blank" rel="noopener noreferrer" className="group relative flex flex-col items-center justify-center w-28 h-28 sm:w-36 sm:h-36 rounded-full transition-transform duration-500 hover:scale-110">
              <div className="absolute inset-0 rounded-full shadow-[inset_-16px_-16px_25px_rgba(0,0,0,0.9),0_0_20px_rgba(14,165,233,0.3)] z-10 transition-all duration-500 group-hover:shadow-[inset_-16px_-16px_25px_rgba(0,0,0,0.9),0_0_45px_rgba(14,165,233,0.9)]"></div>
              <div className="absolute top-[10%] left-[15%] w-10 h-10 bg-white/20 rounded-full blur-[8px] z-20"></div>
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute inset-0" style={{ 
                  backgroundColor: '#0284c7',
                  backgroundImage: 'repeating-linear-gradient(-10deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 5%, transparent 5%, transparent 12%, rgba(0,0,0,0.05) 12%, rgba(0,0,0,0.05) 20%), radial-gradient(circle at 30% 30%, #bae6fd 0%, #0369a1 60%, #082f49 100%)'
                }}></div>
              </div>
              <span className="z-30 relative text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)] tracking-widest uppercase text-sm font-black">Resume</span>
            </a>

            {/* Planet 3 - Rocky Crimson (Mansion) */}
            <a href="/mansion" className="group relative flex flex-col items-center justify-center w-28 h-28 sm:w-36 sm:h-36 rounded-full transition-transform duration-500 hover:scale-110">
              <div className="absolute inset-0 rounded-full shadow-[inset_-16px_-16px_25px_rgba(0,0,0,0.9),0_0_20px_rgba(225,29,72,0.3)] z-10 transition-all duration-500 group-hover:shadow-[inset_-16px_-16px_25px_rgba(0,0,0,0.9),0_0_45px_rgba(225,29,72,0.9)]"></div>
              <div className="absolute top-[10%] left-[15%] w-10 h-10 bg-white/20 rounded-full blur-[8px] z-20"></div>
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute inset-0" style={{ 
                  backgroundColor: '#be123c',
                  backgroundImage: 'radial-gradient(circle at 30% 30%, #fecdd3 0%, #e11d48 50%, #4c0519 100%)'
                }}></div>
                <div className="absolute inset-0 opacity-40 mix-blend-multiply" style={{
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")'
                }}></div>
              </div>
              <span className="z-30 relative text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)] tracking-widest uppercase text-sm font-black">Mansion</span>
            </a>

          </div>
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
