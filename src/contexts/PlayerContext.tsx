import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';

interface Track {
  id: string;
  title: string;
  artist: string;
  audio_url: string;
  duration: number;
}

interface PlayerContextType {
  isPlaying: boolean;
  currentTrackIndex: number;
  volume: number;
  isMuted: boolean;
  tracks: Track[];
  currentTrack: Track | null;
  isLoading: boolean;
  togglePlay: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  currentTrackProgress: number;
  setCurrentTrackProgress: (currentTrackProgress: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentTrackProgress, setCurrentTrackProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // fetching track list from supabase
  const { data: tracks = [], isLoading } = useQuery({
    queryKey: ['tracks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tracks')
        .select('*')
        .order('created_at');

      if (error) throw error;
      return data as Track[];
    },
  });

  // setting current track
  const currentTrack = tracks[currentTrackIndex] || null;

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = currentTrackProgress;
      console.log(
        ' here srcCurrentposition ==> ' + audioRef.current.currentTime
      );
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
      if (isPlaying && audioRef.current) {
        audioRef.current.play();
      }
    } else {
      setCurrentTrackIndex(0);
      if (isPlaying && audioRef.current) {
        audioRef.current.play();
      }
    }
    // reset ttrack position
    setCurrentTrackProgress(0);
  };

  const previousTrack = () => {
    if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
      if (isPlaying && audioRef.current) {
        audioRef.current.play();
      }
    } else {
      setCurrentTrackIndex(tracks.length - 1);
      if (isPlaying && audioRef.current) {
        audioRef.current.play();
      }
    }
    // reset ttrack position
    setCurrentTrackProgress(0);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleTrackPosition = (newPosition: number) => {
    setCurrentTrackProgress((currentTrack.duration * newPosition) / 100);
    if (audioRef.current) {
      audioRef.current.currentTime =
        (currentTrack.duration * newPosition) / 100;
      console.log(audioRef.current);
      console.log(' position ==> ' + newPosition);
      console.log(' srcCurrentposition ==> ' + audioRef.current.currentTime);
    }
  };



  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        isPlaying,
        currentTrackIndex,
        volume,
        isMuted,
        tracks,
        currentTrack,
        isLoading,
        togglePlay,
        nextTrack,
        previousTrack,
        setVolume: handleVolumeChange,
        toggleMute,
        currentTrackProgress,
        setCurrentTrackProgress: handleTrackPosition,
      }}
    >
      <audio
        ref={audioRef}
        src={currentTrack?.audio_url}
        onEnded={nextTrack}
        className="hidden"
      />
      {children}
    </PlayerContext.Provider>
  );
};

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
