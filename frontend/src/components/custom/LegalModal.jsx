import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

export const LegalModal = ({ isOpen, onClose }) => {
    const { t } = useLang();

    const sections = [
        { title: t.legal.editor, content: t.legal.editorContent },
        { title: t.legal.host, content: t.legal.hostContent },
        { title: t.legal.ip, content: t.legal.ipContent },
        { title: t.legal.data, content: t.legal.dataContent },
        { title: t.legal.cookies, content: t.legal.cookiesContent },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-foreground/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                        className="fixed inset-4 md:inset-12 lg:inset-24 z-[61] bg-background border border-border overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-background/95 backdrop-blur-xl border-b border-border px-8 md:px-12 py-6 flex items-center justify-between z-10">
                            <h2 className="font-['Syne'] font-extrabold text-2xl md:text-3xl tracking-tighter">
                                {t.legal.title}
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                                aria-label={t.legal.close}
                            >
                                <X size={18} strokeWidth={1.5} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="px-8 md:px-12 py-10 space-y-10">
                            {sections.map((section, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.08 }}
                                >
                                    <h3 className="font-['Syne'] font-bold text-lg tracking-tight mb-3 text-[hsl(var(--primary))]">
                                        {section.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                                        {section.content}
                                    </p>
                                    {i < sections.length - 1 && (
                                        <div className="mt-10 border-b border-border" />
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Close button bottom */}
                        <div className="px-8 md:px-12 pb-10">
                            <button
                                onClick={onClose}
                                className="px-8 py-3 border border-foreground text-foreground font-bold text-xs tracking-[0.2em] uppercase hover:bg-foreground hover:text-background transition-all duration-300"
                            >
                                {t.legal.close}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
