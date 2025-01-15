import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Video {
  link: string;
  title: string;
  thumbnail: string;
}

interface VideoCarouselProps {
  primaryVideos?: Video[];
  relatedVideos?: Video[];
}

const VideoCarousel = ({ primaryVideos = [], relatedVideos = [] }: VideoCarouselProps) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
    // Initialize activeTab based on available videos
  const [activeTab, setActiveTab] = useState<'main' | 'related'>(() => {
    if (primaryVideos.length > 0) return 'main';
    if (relatedVideos.length > 0) return 'related';
    return 'main';
  });
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const currentVideos = activeTab === 'main' ? primaryVideos : relatedVideos;
  const currentVideo = currentVideos[currentVideoIndex];
  const hasVideos = currentVideos.length > 0;

  const getYouTubeEmbedURL = (link: string, autoplay: boolean = false) => {
    const videoId = new URL(link).searchParams.get('v');
    if (!videoId) return link;
    return `https://www.youtube.com/embed/${videoId}?${
      autoplay ? 'autoplay=1&' : ''
    }loop=1&playlist=${videoId}&mute=0&modestbranding=1&rel=0`;
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    
    const container = carouselRef.current;
    const scrollAmount = container.clientWidth * 0.75;
    const newScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;
    
    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  const handleVideoSelect = (index: number) => {
    setCurrentVideoIndex(index);
    setIsPlaying(false);
  };

  const switchTab = (tab: 'main' | 'related') => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setCurrentVideoIndex(0);
    setIsPlaying(false);
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
    }
  };

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      handleScroll('right');
    }
    if (isRightSwipe) {
      handleScroll('left');
    }
  };

  if (!primaryVideos.length && !relatedVideos.length) return null;

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-lg overflow-hidden">
      {/* Main video player */}
      <div className="w-full">
        <div className="relative pb-[56.25%]">
          <div className="absolute inset-0">
            {currentVideo && isPlaying ? (
              <iframe
                src={getYouTubeEmbedURL(currentVideo.link, true)}
                title={currentVideo.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : currentVideo ? (
              <div className="w-full h-full relative">
                <Image
                  src={currentVideo.thumbnail}
                  alt={currentVideo.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="w-16 h-16 flex items-center justify-center rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 shadow-lg transition-all group"
                  >
                    <div className="w-0 h-0 border-y-[12px] border-y-transparent border-l-[20px] border-l-blue-600 ml-1 group-hover:border-l-blue-700" />
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Selected video title */}
      {currentVideo && (
        <div className="px-4 py-3 text-center border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-medium text-gray-900">{currentVideo.title}</h2>
        </div>
      )}

      {/* Tabs - only show if we have multiple video types */}
      {primaryVideos.length > 0 && relatedVideos.length > 0 && (
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => switchTab('main')}
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                activeTab === 'main'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Main Videos
            </button>
            <button
              onClick={() => switchTab('related')}
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                activeTab === 'related'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Equipment-Related Videos
            </button>
          </div>
        </div>
      )}

      {/* Thumbnail carousel - only render if there are videos */}
      {hasVideos && (
        <div className="relative bg-white p-4">
          {/* Scroll buttons - only visible on desktop */}
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 hidden lg:block"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Scrollable thumbnail container */}
          <div 
            ref={carouselRef}
            className="overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="flex gap-4 px-4 lg:px-12">
              {currentVideos.map((video, index) => (
                <div
                  key={index}
                  className="snap-start"
                >
                  <button
                    onClick={() => handleVideoSelect(index)}
                    className={`flex-shrink-0 group ${
                      index === currentVideoIndex ? 'ring-2 ring-blue-600 rounded-lg' : ''
                    }`}
                  >
                    <div className="w-32 md:w-40 space-y-1">
                      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          className="object-cover group-hover:opacity-90 transition-opacity"
                        />
                      </div>
                      <p className="text-xs text-gray-600 truncate text-left px-1">
                        {video.title}
                      </p>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right scroll button - only visible on desktop */}
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 hidden lg:block"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoCarousel;