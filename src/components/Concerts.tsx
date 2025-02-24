import React, { useEffect, useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { createClient } from '@supabase/supabase-js';

interface Concert {
  id: string;
  date: string;
  venue: string;
  city: string;
  ticket_url: string | null;
}

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const Concerts = () => {
  const { t, language } = useLanguage();
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const { data, error } = await supabase
          .from('concerts')
          .select('*')
          .gte('date', new Date().toISOString())
          .order('date', { ascending: true });

        if (error) throw error;
        setConcerts(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchConcerts();
  }, []);

  if (loading) {
    return (
      <section
        id="concerts"
        className="py-20 bg-gradient-radial from-black to-zinc-900/50"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">
            {t('concerts.title')}
          </h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-light"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="concerts"
        className="py-20 bg-gradient-radial from-black to-zinc-900/50"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">
            {t('concerts.title')}
          </h2>
          <div className="text-center text-accent-dark">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="concerts"
      className="py-20 bg-gradient-radial from-black to-zinc-900/50"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">
          {t('concerts.title')}
        </h2>

        {concerts.length === 0 ? (
          <p className="text-center text-zinc-400">
            {t('concerts.noConcerts')}
          </p>
        ) : (
          <div className="space-y-6 max-w-3xl mx-auto">
            {concerts.map((concert) => (
              <div
                key={concert.id}
                className="bg-black/50 backdrop-blur-sm rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-accent-light/10"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-accent-light">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <time className="font-semibold">
                      {new Date(concert.date).toLocaleDateString(
                        language === 'fr' ? 'fr-FR' : 'en-US',
                        {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        }
                      )}
                    </time>
                    <div className="flex items-center text-zinc-400 mt-1">
                      <MapPin size={16} className="mr-1" />
                      <span>
                        {concert.venue}, {concert.city}
                      </span>
                    </div>
                  </div>
                </div>

                {concert.ticket_url && (
                  <a
                    href={concert.ticket_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-accent text-black px-6 py-2 rounded-full font-semibold hover:bg-accent-light transition-colors"
                  >
                    {t('concerts.getTickets')}
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Concerts;
