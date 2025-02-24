import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <nav className="fixed w-full bg-black/90 backdrop-blur-sm z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <a href="#" className="text-2xl font-bold">
            Stéphane LE DRO
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#biography" className="hover:text-yellow-500 transition-colors">{t('nav.biography')}</a>
            <a href="#concerts" className="hover:text-yellow-500 transition-colors">{t('nav.concerts')}</a>
            <a href="#music" className="hover:text-yellow-500 transition-colors">{t('nav.music')}</a>
            <a href="#video" className="hover:text-yellow-500 transition-colors">{t('nav.video')}</a>
            <a href="#contact" className="hover:text-yellow-500 transition-colors">{t('nav.contact')}</a>
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden fixed inset-x-0 bg-black/95 backdrop-blur-sm transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="px-4 py-2 space-y-1 text-sm">
          <a 
            href="#biography" 
            className="block py-2 px-3 hover:bg-zinc-800/50 rounded-lg transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {t('nav.biography')}
          </a>
          <a 
            href="#concerts" 
            className="block py-2 px-3 hover:bg-zinc-800/50 rounded-lg transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {t('nav.concerts')}
          </a>
          <a 
            href="#music" 
            className="block py-2 px-3 hover:bg-zinc-800/50 rounded-lg transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {t('nav.music')}
          </a>
          <a 
            href="#video" 
            className="block py-2 px-3 hover:bg-zinc-800/50 rounded-lg transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {t('nav.video')}
          </a>
          <a 
            href="#contact" 
            className="block py-2 px-3 hover:bg-zinc-800/50 rounded-lg transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {t('nav.contact')}
          </a>
          <div className="py-2 px-3">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;