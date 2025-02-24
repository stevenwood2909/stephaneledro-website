import React from 'react';
import { Mail, Phone, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section id="contact" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">
          {t('contact.title')}
        </h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div>
            <h3 className="text-2xl font-semibold mb-6">
              {t('contact.subtitle')}
            </h3>
            <div className="space-y-4 text-zinc-300">
              <p>{t('contact.description')}</p>

              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-yellow-500" />
                <span>contact@stephaneledro.com</span>
              </div>

              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-yellow-500" />
                <span>+33 (0)6 51 41 86 04</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                {t('contact.name')}
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-yellow-500 transition-colors"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                {t('contact.email')}
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-yellow-500 transition-colors"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                {t('contact.message')}
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-yellow-500 transition-colors"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="inline-flex items-center space-x-2 bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold hover:bg-yellow-400 transition-colors"
            >
              <Send size={20} />
              <span>{t('contact.send')}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
