import React from 'react';
import {
  Music,
  Calendar,
  Disc,
  Mail,
  Youtube,
  Instagram,
  Facebook,
} from 'lucide-react';
import { useLanguage } from './contexts/LanguageContext';
import { PlayerProvider } from './contexts/PlayerContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Biography from './components/Biography';
//import MyAudio from './components/MyAudio';
import MyVideo from './components/MyVideo';
import Concerts from './components/Concerts';
import Contact from './components/Contact';
import AudioPlayer from './components/AudioPlayer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const { t } = useLanguage();
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <PlayerProvider>
        <div className="min-h-screen bg-black text-zinc-100">
          <Navbar />
          <main className="pb-24">
            <Hero />
            <Biography />
            <Concerts />
            <MyVideo />
            <Contact />
          </main>
          <footer className="bg-black/50 py-8 mb-24 border-t border-accent-light/10">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="text-sm text-zinc-400">
                  {t('footer.rights')}
                </div>
                <div className="flex space-x-4 mt-4 md:mt-0">
                  <a
                    href="https://www.youtube.com/@stephaneledromusic"
                    className="text-zinc-400 hover:text-accent transition-colors"
                  >
                    <Youtube size={20} />
                  </a>
                  <a
                    href="https://www.instagram.com/steph.ledro/"
                    className="text-zinc-400 hover:text-accent transition-colors"
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href="https://www.facebook.com/stephane.ledro"
                    className="text-zinc-400 hover:text-accent transition-colors"
                  >
                    <Facebook size={20} />
                  </a>
                </div>
              </div>
            </div>
          </footer>
          <AudioPlayer />
        </div>
      </PlayerProvider>
    </QueryClientProvider>
  );
}

export default App;
