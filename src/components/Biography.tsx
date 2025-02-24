import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Biography = () => {
  const { t } = useLanguage();

  return (
    <section id="biography" className="py-20 bg-section-pattern">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">{t('bio.title')}</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?q=80&w=2070" 
              alt="Stéphane LE DRO performing"
              className="rounded-lg shadow-xl"
            />
          </div>
          
          <div className="space-y-6 text-zinc-300">
            <p>{t('bio.p1')}</p>
            <p>{t('bio.p2')}</p>
            <p>{t('bio.p3')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Biography;