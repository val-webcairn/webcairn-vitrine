import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

export const ContactSection = () => {
  const { t, setLegalOpen } = useLang();
  const [form, setForm] = useState({ name: '', email: '', activity: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(t.contact.send + ' !', {
      description: 'This is a visual demo — no data was sent.',
    });
    setForm({ name: '', email: '', activity: '', message: '' });
  };

  return (
    <section id="contact" data-testid="contact-section" className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
      {/* Header */}
      <div className="mb-16 md:mb-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.3em] text-[hsl(var(--primary))] font-semibold mb-4"
        >
          {t.contact.overline}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-['Syne'] font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tighter"
        >
          {t.contact.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg text-muted-foreground mt-4 max-w-md"
        >
          {t.contact.sub}
        </motion.p>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <motion.form
          data-testid="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-3">
                {t.contact.name}
              </label>
              <input
                data-testid="contact-name-input"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-transparent border-b-2 border-border focus:border-[hsl(var(--primary))] outline-none py-3 text-lg font-medium transition-colors duration-300 placeholder:text-muted-foreground/40"
                placeholder="Jean Dupont"
              />
            </div>
            <div>
              <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-3">
                {t.contact.email}
              </label>
              <input
                data-testid="contact-email-input"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-transparent border-b-2 border-border focus:border-[hsl(var(--primary))] outline-none py-3 text-lg font-medium transition-colors duration-300 placeholder:text-muted-foreground/40"
                placeholder="jean@exemple.fr"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <div>
              <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-3">
                {t.contact.activity}
              </label>
              <input
                data-testid="contact-activity-input"
                type="text"
                value={form.activity}
                onChange={(e) => setForm({ ...form, activity: e.target.value })}
                className="w-full bg-transparent border-b-2 border-border focus:border-[hsl(var(--primary))] outline-none py-3 text-lg font-medium transition-colors duration-300 placeholder:text-muted-foreground/40"
                placeholder={t.contact.activityPlaceholder}
              />
            </div>
          </div>
          <div>
            <label className="text-xs tracking-[0.2em] uppercase text-muted-foreground block mb-3">
              {t.contact.message}
            </label>
            <textarea
              data-testid="contact-message-input"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={4}
              className="w-full bg-transparent border-b-2 border-border focus:border-[hsl(var(--primary))] outline-none py-3 text-lg font-medium transition-colors duration-300 resize-none placeholder:text-muted-foreground/40"
              placeholder="..."
            />
          </div>
          <div>
            <button
              data-testid="contact-submit-button"
              type="submit"
              className="group flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-5 bg-foreground text-background font-bold text-sm tracking-[0.2em] uppercase hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] transition-all duration-500"
            >
              {t.contact.send}
              <Send size={16} strokeWidth={1.5} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
            <p className="mt-4 text-xs text-muted-foreground text-left sm:max-w-md leading-relaxed">
              {t.contact.gdprText}
              <a href="#" className="underline hover:text-foreground transition-colors" onClick={(e) => {
                e.preventDefault();
                setLegalOpen(true);
              }}>
                {t.contact.gdprLink}
              </a>
            </p>
          </div>
        </motion.form>

        {/* Right side info */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col justify-start"
        >
          <div>
            <p className="text-muted-foreground text-sm mb-2 tracking-wider uppercase">Email</p>
            <a
              data-testid="contact-email-link"
              href="mailto:contact@webcairn.fr"
              className="font-['Syne'] font-bold text-2xl md:text-3xl tracking-tight hover:text-[hsl(var(--primary))] transition-colors duration-300"
            >
              {t.contact.info}
            </a>
          </div>
          <div className="mt-10">
            <p className="text-muted-foreground text-sm mb-2 tracking-wider uppercase">Web</p>
            <span className="font-['Syne'] font-bold text-2xl md:text-3xl tracking-tight">
              webcairn.fr
            </span>
          </div>

        </motion.div>
      </div >
    </section >
  );
};
