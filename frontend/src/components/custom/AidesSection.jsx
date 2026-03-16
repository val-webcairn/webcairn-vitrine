import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Building2, MapPin, ArrowRight } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

const icons = [Globe, Building2, MapPin];

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 20 } }
};

export const AidesSection = () => {
    const { t } = useLang();

    return (
        <section id="aides" data-testid="aides-section" className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
            {/* Header */}
            <div className="mb-16 md:mb-24">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-xs tracking-[0.3em] text-[hsl(var(--primary))] font-semibold mb-4"
                >
                    {t.aides.overline}
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="font-['Syne'] font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tighter"
                >
                    {t.aides.title}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-base md:text-lg text-muted-foreground mt-4 max-w-lg"
                >
                    {t.aides.sub}
                </motion.p>
            </div>

            {/* Aide cards */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-border"
            >
                {t.aides.items.map((aide, i) => {
                    const Icon = icons[i];
                    return (
                        <motion.a
                            key={i}
                            href={aide.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={itemVariants}
                            data-testid={`aide-card-${i}`}
                            className="group bg-background p-8 md:p-10 flex flex-col justify-between min-h-[340px] transition-colors duration-500 hover:bg-[hsl(var(--primary))] no-underline cursor-pointer"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-8">
                                    <span className="px-3 py-1 text-[10px] tracking-[0.2em] font-bold border border-[hsl(var(--primary))] text-[hsl(var(--primary))] group-hover:border-[hsl(var(--primary-foreground))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors duration-500">
                                        {aide.amount}
                                    </span>
                                    <Icon
                                        size={28}
                                        strokeWidth={1}
                                        className="text-foreground group-hover:text-[hsl(var(--primary-foreground))] transition-colors duration-500"
                                    />
                                </div>
                                <h3 className="font-['Syne'] font-bold text-xl md:text-2xl tracking-tight mb-4 group-hover:text-[hsl(var(--primary-foreground))] transition-colors duration-500">
                                    {aide.title}
                                </h3>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground group-hover:text-[hsl(var(--primary-foreground))]/80 transition-colors duration-500 leading-relaxed">
                                    {aide.desc}
                                </p>
                                <div className="mt-4 flex items-center gap-2 text-xs font-semibold tracking-wider text-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors duration-500 uppercase">
                                    <span>Consulter</span>
                                    <ArrowRight size={12} strokeWidth={2} className="group-hover:translate-x-1 transition-transform duration-300" />
                                </div>
                            </div>
                        </motion.a>
                    );
                })}
            </motion.div>

            {/* CTA */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-16 text-center"
            >
                <a
                    href={t.aides.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-button group"
                >
                    <span>{t.aides.cta}</span>
                    <ArrowRight size={16} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform duration-300" />
                    <span className="sr-only">
                        {t.aides.cta}
                    </span>
                </a>
                <p className="mt-4 text-xs text-muted-foreground tracking-wider">{t.aides.ctaSub}</p>
            </motion.div>
        </section>
    );
};
