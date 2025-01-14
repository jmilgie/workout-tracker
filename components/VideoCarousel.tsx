import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronUp, ChevronDown } from 'lucide-react';

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
  const [showingRelated, setShowingRelated] = useState(false);
  const [relatedScrollIndex, setRelatedScrollIndex] = useState(0);

  const currentVideos = showingRelated ? relatedVideos : primaryVideos;
  const currentVideo = currentVideos[currentVideoIndex];

  if (!primaryVideos.length && !relatedVideos.length) return null;

  const VIDEOS_PER_PAGE = 5;
  const totalPages = Math.ceil(relatedVideos.length / VIDEOS_PER_PAGE);
  const canScrollUp = relatedScrollIndex > 0;
  const canScrollDown = relatedScrollIndex < totalPages - 1;

  const handleScrollUp = () => {
    setRelatedScrollIndex(prev => Math.max(0, prev - 1));
  };

  const handleScrollDown = () => {
    setRelatedScrollIndex(prev => Math.min(totalPages - 1, prev + 1));
  };

  const switchVideoType = (showRelated: boolean, index: number = 0) => {
    setShowingRelated(showRelated);
    setCurrentVideoIndex(index);
    setIsPlaying(false);
  };

  const getYouTubeEmbedURL = (link: string, autoplay: boolean = false) => {
    const videoId = new URL(link).searchParams.get('v');
    if (!videoId) return link;
    return `https://www.youtube.com/embed/${videoId}?${
      autoplay ? 'autoplay=1&' : ''
    }loop=1&playlist=${videoId}&mute=0&modestbranding=1&rel=0`;
  };

  const visibleRelatedVideos = relatedVideos.slice(
    relatedScrollIndex * VIDEOS_PER_PAGE,
    (relatedScrollIndex + 1) * VIDEOS_PER_PAGE
  );

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-lg overflow-hidden">
      <div className="flex">
        {/* Main video section */}
        <div className="flex-1 relative">
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
        </div>

        {/* Related videos sidebar */}
        {relatedVideos.length > 0 && (
          <div className="w-72 border-l border-gray-200">
            <div className="p-2 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">
                  {showingRelated ? 'Other Videos' : 'Related Videos'}
                </h3>
                {showingRelated && (
                  <button
                    onClick={() => switchVideoType(false)}
                    className="text-xs text-blue-600 hover:text-blue-700"
                  >
                    Back to Main
                  </button>
                )}
              </div>
            </div>

            <div className="relative">
              {canScrollUp && (
                <button
                  onClick={handleScrollUp}
                  className="sticky top-0 w-full p-1 bg-white border-b border-gray-200 hover:bg-gray-50"
                >
                  <ChevronUp className="w-4 h-4 mx-auto" />
                </button>
              )}

              <div className="space-y-2 p-2">
                {visibleRelatedVideos.map((video, index) => (
                  <button
                    key={index}
                    onClick={() => switchVideoType(!showingRelated, index + (relatedScrollIndex * VIDEOS_PER_PAGE))}
                    className="w-full flex gap-2 p-2 hover:bg-gray-50 rounded-lg"
                  >
                    <div className="w-24 flex-shrink-0">
                      <div className="relative aspect-video bg-gray-100 rounded overflow-hidden">
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sm line-clamp-2">{video.title}</p>
                    </div>
                  </button>
                ))}
              </div>

              {canScrollDown && (
                <button
                  onClick={handleScrollDown}
                  className="sticky bottom-0 w-full p-1 bg-white border-t border-gray-200 hover:bg-gray-50"
                >
                  <ChevronDown className="w-4 h-4 mx-auto" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCarousel;