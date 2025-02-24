import React from 'react';
import { Play } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const MyVideo = () => {
  const { t } = useLanguage();

  const videos = [
    {
      title: "Burnout",
      description: t('video.description_burnout'),
      thumbnail: "https://img.youtube.com/vi/D9xePI2FGxg/maxresdefault.jpg",
      youtubeUrl: "https://www.youtube.com/watch_popup?v=D9xePI2FGxg&autoplay=1"
    },
    {
      title: "La folie des passions (teaser 2023)",
      description: t('video.description_folie'),
      thumbnail: "https://img.youtube.com/vi/dRLmGg-xQu8/maxresdefault.jpg",
      youtubeUrl: "https://www.youtube.com/watch_popup?v=dRLmGg-xQu8"
    },
    {
      title: "Belomi Benna",
      description: t('video.description_belomi'),
      thumbnail: "https://img.youtube.com/vi/YhMgUTvV4XY/maxresdefault.jpg",
      youtubeUrl: "https://www.youtube.com/watch?v=YhMgUTvV4XY"
    },
    {
      title: "Addis",
      description: t('video.description_addis'),
      thumbnail: "https://img.youtube.com/vi/Tce6sK95jyY/maxresdefault.jpg",
      youtubeUrl: "https://www.youtube.com/watch_popup?v=Tce6sK95jyY"
    }
  ];

  const handlePlayClick = (youtubeUrl: string, e: React.MouseEvent) => {
    e.preventDefault();
    window.open(youtubeUrl, '_blank');
  };

  return (
    <section id="video" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">{t('video.title')}</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div key={video.title} className="group relative overflow-hidden rounded-lg">
              <div className="aspect-video relative">
                <img 
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* YouTube play button overlay */}
                <button
                  onClick={(e) => handlePlayClick(video.youtubeUrl, e)}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={`Play ${video.title} on YouTube`}
                >
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    <Play size={32} className="text-white ml-1" />
                  </div>
                </button>
              </div>
              <div className="p-4 bg-zinc-900">
                <h3 className="text-xl font-bold mb-2">{video.title}</h3>
                <p className="text-zinc-400 text-sm mb-4">{video.description}</p>
                <a 
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-red-500 hover:text-red-400 transition-colors"
                >
                  <span>{t('video.watch')}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyVideo;