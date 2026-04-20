import {
  useEffect,
  useRef,
  useState
} from 'react';
import { motion } from 'framer-motion';
import { Briefcase, FileText, Building } from 'lucide-react';

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
    <div ref={sectionRef} className='w-full bg-black'>
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
            Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">{title}</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 font-medium text-center max-w-2xl mb-6">
            {date}
          </p>
          <p className="text-lg text-slate-400 text-center max-w-3xl mb-8 leading-relaxed">
            I like to build cool stuff.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 z-10 w-full px-4" style={{ pointerEvents: showContent ? 'auto' : 'none' }}>
            <a href="#projects" className="flex items-center justify-center whitespace-nowrap px-8 py-3 w-full sm:w-auto text-base md:text-lg rounded-full border-2 border-blue-700 bg-blue-500 text-white font-bold shadow-lg hover:bg-blue-600 transition-all hover:-translate-y-1">
              <Briefcase className="w-5 h-5 mr-3 shrink-0" /> <span>View My Work</span>
            </a>
            <a href="/Official_MaxwellPeng_Resume.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center whitespace-nowrap px-8 py-3 w-full sm:w-auto text-base md:text-lg rounded-full bg-black text-blue-500 border-2 border-blue-500 font-bold shadow-lg hover:bg-zinc-900 transition-all hover:-translate-y-1">
              <FileText className="w-5 h-5 mr-3 shrink-0" /> <span>View Resume</span>
            </a>
            <a href="/mansion" className="flex items-center justify-center whitespace-nowrap px-8 py-3 w-full sm:w-auto text-base md:text-lg rounded-full border-2 border-yellow-700 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold shadow-lg hover:shadow-yellow-500/40 transition-all hover:-translate-y-1">
              <Building className="w-5 h-5 mr-3 shrink-0" /> <span>Explore My Mansion</span>
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
