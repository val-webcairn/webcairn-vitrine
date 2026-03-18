import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLang } from '@/contexts/LanguageContext';

const legalContent = {
    en: {
        editor: 'Website Editor',
        editorContent:
            'Lilian Valette — Micro-entreprise (Individual Entrepreneur)\nSIRET: 10201852000019\nCommercial Name: WebCairn\nAddress: 139 Bis Chemin de la Bonde, 13120 Gardanne, France\nEmail: contact@webcairn.fr\nPublication Director: Lilian Valette\nVAT not applicable — art. 293 B of CGI (basic exemption)',
        host: 'Hosting',
        hostContent: 'Netlify, Inc.\n512 2nd Street, Suite 200\nSan Francisco, CA 94107, USA\nhttps://www.netlify.com',
        ip: 'Intellectual Property',
        ipContent:
            'All content on this site (texts, images, graphics, logo) is the property of Lilian Valette / WebCairn and is protected by intellectual property laws. Any reproduction without prior authorization is prohibited.',
        data: 'Personal Data & GDPR',
        dataContent:
            'Data collected via the contact form (name, email, message) is used solely to respond to your request. It is kept for a maximum of 12 months. No data is sold or shared with third parties. In accordance with the GDPR, you have the right to access, rectify, and delete your data by contacting contact@webcairn.fr. You also have the right to lodge a complaint with the CNIL (www.cnil.fr).',
        cookies: 'Cookies',
        cookiesContent: 'This site does not use tracking cookies or third-party analytics tools.',
    },
    fr: {
        editor: 'Éditeur du site',
        editorContent:
            'Lilian Valette — Micro-entreprise (Entrepreneur Individuel)\nSIRET : 10201852000019\nNom commercial : WebCairn\nAdresse : 139 Bis Chemin de la Bonde, 13120 Gardanne, France\nEmail : contact@webcairn.fr\nDirecteur de la publication : Lilian Valette\nTVA non applicable — art. 293 B du CGI (franchise en base)',
        host: 'Hébergement',
        hostContent: 'Netlify, Inc.\n512 2nd Street, Suite 200\nSan Francisco, CA 94107, USA\nhttps://www.netlify.com',
        ip: 'Propriété intellectuelle',
        ipContent:
            'L\'ensemble du contenu de ce site (textes, images, graphismes, logo) est la propriété de Lilian Valette / WebCairn et est protégé par les lois relatives à la propriété intellectuelle. Toute reproduction sans autorisation préalable est interdite.',
        data: 'Données personnelles & RGPD',
        dataContent:
            'Les données collectées via le formulaire de contact (nom, email, message) sont utilisées uniquement pour répondre à votre demande. Elles sont conservées pendant une durée maximale de 12 mois. Aucune donnée n\'est vendue ni partagée avec des tiers. Conformément au RGPD, vous disposez d\'un droit d\'accès, de rectification et de suppression de vos données en contactant contact@webcairn.fr. Vous disposez également du droit d\'introduire une réclamation auprès de la CNIL (www.cnil.fr).',
        cookies: 'Cookies',
        cookiesContent: 'Ce site n\'utilise pas de cookies de suivi ni d\'outils d\'analyse tiers.',
    },
};

export const LegalModal = ({ isOpen, onClose }) => {
    const { t, lang } = useLang();
    const legal = legalContent[lang] || legalContent.fr;

    const sections = [
        { title: legal.editor, content: legal.editorContent },
        { title: legal.host, content: legal.hostContent },
        { title: legal.ip, content: legal.ipContent },
        { title: legal.data, content: legal.dataContent },
        { title: legal.cookies, content: legal.cookiesContent },
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
