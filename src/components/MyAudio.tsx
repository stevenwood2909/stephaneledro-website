import React, { useEffect, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { usePlayer } from '../contexts/PlayerContext';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface AudioFile {
  id: string;
  title: string;
  artist: string;
  audio_url: string;
  duration: number;
}

const musicAlbums = [
  {
    title: "La Folie des Passions",
    year: "2023",
    cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02646f93026d04b7c8e9151c23",
    spotifyUrl: "https://open.spotify.com/intl-fr/album/5lpy9zedmDEkp48BVJ0TTr?si=lU0-XKNiQBKBTvM4qzoYMw"
  },
  {
    title: "Ale Gena ( Badumes Band) ",
    year: "2010",
    cover: "https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e026c44289acd936815dda81a18",
    spotifyUrl: "https://open.spotify.com/intl-fr/album/6H4TP1OrZGTCNlgnJ53Wp0?utm_source=generator"
  }
 
];

const MyAudio = () => {
  const { t } = useLanguage();
  const { currentTrack, isPlaying, playTrack, pauseTrack } = usePlayer();
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAudioFiles = async () => {
      try {
        const { data, error } = await supabase
          .from('tracks')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) throw error;
        setAudioFiles(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load audio files');
      } finally {
        setLoading(false);
      }
    };

    fetchAudioFiles();
  }, []);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <section id="music" className="py-20 bg-section-pattern">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">{t('music.title')}</h2>

        {/* Audio Player List */}
        <div className="max-w-3xl mx-auto mb-16">
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent-light"></div>
            </div>
          ) : error ? (
            <div className="text-accent-dark text-center">{error}</div>
          ) : audioFiles.length === 0 ? (
            <div className="text-center text-zinc-400">{t('music.noTracks')}</div>
          ) : (
            <div className="bg-black/50 backdrop-blur-sm rounded-lg overflow-hidden border border-accent-light/10">
              {audioFiles.map((file) => (
                <div
                  key={file.id}
                  className={`flex items-center justify-between py-2 px-3 hover:bg-accent-light/5 transition-colors ${
                    currentTrack?.id === file.id ? 'bg-accent-light/10' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => {
                        if (currentTrack?.id === file.id && isPlaying) {
                          pauseTrack();
                        } else {
                          playTrack(file);
                        }
                      }}
                      className="w-8 h-8 rounded-full bg-accent text-black flex items-center justify-center hover:bg-accent-light transition-colors"
                      aria-label={currentTrack?.id === file.id && isPlaying ? 'Pause' : 'Play'}
                    >
                      {currentTrack?.id === file.id && isPlaying ? (
                        <Pause size={16} />
                      ) : (
                        <Play size={16} />
                      )}
                    </button>
                    <div className="min-w-0">
                      <h3 className="font-medium text-sm truncate">{file.title}</h3>
                      <p className="text-xs text-zinc-400 truncate">{file.artist}</p>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-400 ml-3">
                    {formatDuration(file.duration)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Albums Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {musicAlbums.map((album) => (
            <div key={album.title} className="group relative overflow-hidden rounded-lg">
              <img 
                src={album.cover} 
                alt={album.title}
                className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-xl font-bold">{album.title}</h3>
                <p className="text-zinc-400">{album.year}</p>
                
                <a 
                  href={album.spotifyUrl}
                  className="mt-4 inline-flex items-center space-x-2 text-accent-light hover:text-accent transition-colors"
                >
                  <Play size={20} />
                  <span>{t('music.listen')}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyAudio;