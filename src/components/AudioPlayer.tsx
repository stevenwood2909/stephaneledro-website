import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { usePlayer } from '../contexts/PlayerContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Slider } from '@mui/material';

const AudioPlayer = () => {
  const {
    isPlaying,
    currentTrack,
    volume,
    isMuted,
    isLoading,
    togglePlay,
    nextTrack,
    previousTrack,
    setVolume,
    toggleMute,
    currentTrackIndex,
    tracks,
    currentTrackProgress,
    setCurrentTrackProgress,
  } = usePlayer();
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { language } = useLanguage();

  const currentPercentage = currentTrack
    ? (currentTrackProgress / currentTrack.duration) * 100
    : 0;
  console.log('current percentage = %D', currentPercentage);

  // handle volume change
  const handleVolumeChange = (event: Event, newValue: number | number[]) => {
    setVolume(newValue as number);
  };

  // handle time update when source is played
  const handleTimeUpdate = () => {
    if (audioRef.current /*&& !isDragging*/) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // handle track position changed
  const handleSeeking = (newTime: any) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime as number;
    }
   
  };
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      if (audioRef.current.src !== currentTrack.audio_url) {
        audioRef.current.src = currentTrack.audio_url;
      }

      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          console.error('Error playing audio:', error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900/80 backdrop-blur-md border-t border-zinc-800/50 px-2 py-2 z-50">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={nextTrack}
      />

      <div className="container mx-auto flex items-center gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1 md:flex-none md:w-48">
          <div className="w-8 h-8 bg-zinc-800/50 rounded flex-shrink-0" />
          <div className="min-w-0 hidden sm:block">
            <div className="font-medium text-sm truncate">
              {currentTrack?.title || 'No track selected'}
            </div>
            <div className="text-xs text-zinc-400 truncate">
              {currentTrack?.artist || ''}
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-2xl">
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={previousTrack}
              //disabled={currentTrackIndex === 0}
              className="text-zinc-400 hover:text-primary-400 transition-colors p-1"
              aria-label={
                language === 'en' ? 'Previous track' : 'Piste précédente'
              }
            >
              <SkipBack size={16} />
            </button>

            <button
              onClick={togglePlay}
              className="w-8 h-8 rounded-full bg-primary-500 text-black flex items-center justify-center hover:bg-primary-400 transition-colors"
              aria-label={
                isPlaying
                  ? language === 'en'
                    ? 'Pause'
                    : 'Pause'
                  : language === 'en'
                  ? 'Play'
                  : 'Lecture'
              }
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>

            <button
              onClick={nextTrack}
              //disabled={currentTrackIndex === tracks.length - 1}
              className="text-zinc-400 hover:text-primary-400 transition-colors p-1"
              aria-label={language === 'en' ? 'Next track' : 'Piste suivante'}
            >
              <SkipForward size={16} />
            </button>
          </div>

          <div className="flex items-center gap-1 mt-1">
            <span className="text-xs text-zinc-400 w-8 text-right">
              {formatTime(progress)}
            </span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={progress}
              onChange={(e) => handleSeeking(e.target.value)}
              // onMouseDown={handleProgressStart}
              // onMouseUp={handleProgressEnd}
              // onTouchStart={handleProgressStart}
              // onTouchEnd={handleProgressEnd}
              className="flex-1 h-1 bg-zinc-800/50 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500"
            />
            <span className="text-xs text-zinc-400 w-8">
              {
                formatTime(duration)
              }
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 w-24">
          <button
            onClick={toggleMute}
            className="text-zinc-400 hover:text-primary-400 transition-colors p-1"
            aria-label={
              isMuted
                ? language === 'en'
                  ? 'Unmute'
                  : 'Activer le son'
                : language === 'en'
                ? 'Mute'
                : 'Couper le son'
            }
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          <Slider sx={{
    color: 'success.main'
  }}
            value={[volume]}
            min={0}
            max={1}
            step={0.01}
            onChange={handleVolumeChange}
            className="w-24 "
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
