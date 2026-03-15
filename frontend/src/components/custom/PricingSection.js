import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

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

export const PricingSection = ({ showLink = false }) => {
    const { t } = useLang();

    return (
        <section id="pricing" data-testid="pricing-section" className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
            {/* Header */}
            <div className="mb-16 md:mb-24">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-xs tracking-[0.3em] text-[hsl(var(--primary))] font-semibold mb-4"
                >
                    {t.pricing.overline}
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="font-['Syne'] font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tighter"
                >
                    {t.pricing.title}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-base md:text-lg text-muted-foreground mt-4 max-w-md"
                >
                    {t.pricing.sub}
                </motion.p>
            </div>

            {/* Pricing cards */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-[1px] bg-border max-w-5xl mx-auto"
            >
                {t.pricing.plans.map((plan, i) => (
                    <motion.div
                        key={i}
                        variants={itemVariants}
                        data-testid={`pricing-card-${i}`}
                        className={`group relative bg-background p-8 md:p-12 flex flex-col justify-between transition-colors duration-500 hover:bg-[hsl(var(--primary))] ${plan.popular ? 'border-t-2 border-t-[hsl(var(--primary))]' : ''
                            }`}
                    >
                        {/* Popular badge */}
                        {plan.popular && (
                            <div className="absolute top-0 right-6 -translate-y-1/2 px-4 py-1 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-[10px] font-bold tracking-[0.2em] uppercase group-hover:bg-foreground group-hover:text-background transition-colors duration-500">
                                ★ POPULAIRE
                            </div>
                        )}

                        {/* Top */}
                        <div>
                            <h3 className="text-[10px] tracking-[0.3em] font-bold text-muted-foreground group-hover:text-[hsl(var(--primary-foreground))]/60 transition-colors duration-500 block mb-6">
                                {plan.name.toUpperCase()}
                            </h3>
                            <div className="mb-4">
                                <p className="font-['Syne'] font-extrabold text-3xl md:text-4xl tracking-tighter group-hover:text-[hsl(var(--primary-foreground))] transition-colors duration-500">
                                    {plan.price}
                                </p>
                            </div>
                            <p className="text-sm text-muted-foreground group-hover:text-[hsl(var(--primary-foreground))]/70 transition-colors duration-500 mb-8">
                                {plan.desc}
                            </p>

                            {/* Features */}
                            <div className="space-y-3">
                                {plan.features.map((feature, j) => (
                                    <div key={j} className="flex items-center gap-3">
                                        <Check
                                            size={14}
                                            strokeWidth={2}
                                            className="flex-shrink-0 text-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-foreground))] transition-colors duration-500"
                                        />
                                        <span className="text-sm text-foreground group-hover:text-[hsl(var(--primary-foreground))] transition-colors duration-500">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Link to Pricing Page */}
            {showLink && (
                <div className="mt-12 flex justify-center">
                    <Link
                        to="/tarifs"
                        className="group flex items-center gap-3 px-8 py-4 bg-foreground text-background font-bold tracking-widest text-sm uppercase hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] transition-colors duration-500"
                    >
                        {t.pricing.viewAllBtn}
                        <ArrowRight size={16} strokeWidth={2} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            )}

            {/* Note */}
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-xs text-muted-foreground text-center tracking-wider"
            >
                {t.pricing.note}
            </motion.p>
        </section >
    );
};
