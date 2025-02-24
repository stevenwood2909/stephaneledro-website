import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.biography': 'Biography',
    'nav.video': 'Video',
    'nav.music': 'Music',
    'nav.concerts': 'Concerts',
    'nav.contact': 'Contact',

    // Hero
    'hero.title': 'Clarinettist & Saxophonist',
    'hero.cta': 'Discover More',

    // Biography
    'bio.title': 'Biography',
    'bio.p1':
      'Stéphane LE DRO has shaped his musical identity through a rich career, from traditional Breton music (Gwenfol Orchestra) to soul/funk (Heatwave) through world music (Mahmoud Ahmed & Badume’s Band, Zambrocal, Yvan Knorst). He also studied jazz with Jean-Philippe Lavergne at the CRD in Saint-Brieuc then at the CIM in Paris.',
    'bio.p2':
      'In his solo project, he invites us on a journey through different musical landscapes. His bass clarinet, sometimes playful, sometimes angry, always captivating, immerses us in a musical universe which gives pride of place to heady rhythms and inspired improvisations... The looper allows him to orchestrate his music live, and to enrich it with astonishing sound textures. The diffusion of sound in Quadriphony is a real immersive experience for the listener.',
    'bio.p3': ' ',

    // Video
    'video.title': 'Video',
    'video.watch': 'Watch on YouTube',

    // video descriptions
    'video.description_burnout': 'Live performance in solo',
    'video.description_belomi':
      'Concert with Mahmoud Ahmed & Badumes Band in Hertme ( Netherland )',
    'video.description_addis': 'Live recording in solo',
    'video.description_folie': 'With Yvan Knorst trio ( teaser 2023 ) ',

    // Music
    'music.title': 'Music',
    'music.listen': 'Listen on Spotify',
    'music.noTracks': 'No tracks available',

    // Concerts
    'concerts.title': 'Upcoming Concerts',
    'concerts.getTickets': 'Get Tickets',
    'concerts.noConcerts': 'No upcoming concerts scheduled',

    // Contact
    'contact.title': 'Contact',
    'contact.subtitle': 'Get in Touch',
    'contact.description':
      "For bookings, collaborations, or any inquiries, please don't hesitate to reach out.",
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',

    // Footer
    'footer.rights': '© 2025 Stéphane LE DRO. All rights reserved.',
  },
  fr: {
    // Navigation
    'nav.biography': 'Biographie',
    'nav.video': 'Vidéo',
    'nav.music': 'Musique',
    'nav.concerts': 'Concerts',
    'nav.contact': 'Contact',

    // Hero
    'hero.title': 'Clarinettiste & Saxophoniste',
    'hero.cta': 'Découvrir',

    // Biography
    'bio.title': 'Biographie',
    'bio.p1':
      'Stéphane LE DRO a façonné son identité musicale par un parcours riche, de la musique traditionnelle bretonne ( Gwenfol Orchestra ) à la soul/funk ( Heatwave ) en passant par les musiques du monde ( Mahmoud Ahmed & Badume’s Band, Zambrocal, Yvan Knorst ). Il a également étudié le jazz auprès de Jean-Philippe Lavergne au CRD de Saint-Brieuc puis au CIM à Paris.',
    'bio.p2':
      " Dans son projet en solo, il nous invite à un voyage à travers différents paysages musicaux. Sa clarinette basse, tantôt enjouée, tantôt rageuse, toujours envoûtante, nous plonge dans un univers musical qui fait la part belle aux rythmes entêtants et aux improvisations inspirées... Le looper lui permet d’orchestrer sa musique en direct, et de l’enrichir d’étonnantes textures sonores. La diffusion du son en Quadriphonie est une vraie epériencce immersive pour l'auditeur .",
    'bio.p3': ' ',

    // Video
    'video.title': 'Vidéo',
    'video.watch': 'Regarder sur YouTube',

    // video descriptions
    'video.description_burnout': 'Performance en solo',
    'video.description_belomi':
      'Concert avec Mahmoud Ahmed & Badumes Band à Hertme ( Hollande )',
    'video.description_addis': 'Enregistrement live en solo',
    'video.description_folie': 'Avec Yvan Knorst trio ( teaser 2023 ) ',

    // Music
    'music.title': 'Musique',
    'music.listen': 'Écouter sur Spotify',
    'music.noTracks': 'Aucune piste disponible',

    // Concerts
    'concerts.title': 'Prochains Concerts',
    'concerts.getTickets': 'Réserver',
    'concerts.noConcerts': 'Aucun concert à venir',

    // Contact
    'contact.title': 'Contact',
    'contact.subtitle': ' ',
    'contact.description': ' ',
    'contact.name': 'Nom',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Envoyer',

    // Footer
    'footer.rights': '© 2025 Stéphane LE DRO. Tous droits réservés.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return (
      translations[language][key as keyof (typeof translations)['fr']] || key
    );
  };

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
