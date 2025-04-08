import React from 'react';

interface LiveStreamProps {
  title: string;
  description: string;
  streamUrl: string;
  isLive: boolean;
  membershipTier: string;
}

const LiveStreamPlayer: React.FC<LiveStreamProps> = ({
  title,
  description,
  streamUrl,
  isLive,
  membershipTier,
}) => {
  // Extract YouTube video ID if needed
  const getYoutubeId = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  // Determine embed type based on URL
  const renderEmbed = () => {
    if (streamUrl.includes('youtube.com') || streamUrl.includes('youtu.be')) {
      const videoId = getYoutubeId(streamUrl);
      return (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full absolute top-0 left-0"
        ></iframe>
      );
    }
    
    return (
      <iframe
        src={streamUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full absolute top-0 left-0"
      ></iframe>
    );
  };

  return (
    <div className="w-full bg-gray-900 rounded-lg overflow-hidden shadow-lg">
      <div className="relative pt-[56.25%]">
        {renderEmbed()}
      </div>
      
      <div className="p-4 text-white">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">{title}</h2>
          {isLive && (
            <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-white mr-1 animate-pulse"></span>
              LIVE
            </span>
          )}
        </div>
        
        <p className="text-gray-300 text-sm mb-4">{description}</p>
        
        <div className="text-xs text-gray-400">
          Required tier: {membershipTier}
        </div>
      </div>
    </div>
  );
};

export default LiveStreamPlayer; 