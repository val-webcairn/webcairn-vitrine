import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";
import { PricingSection } from "@/components/custom/PricingSection";

export const PricingPage = () => {
  const { t } = useLang();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-24 pb-16 min-h-screen">
      <PricingSection showLink={false} />
      
      <section className="py-12 px-6 md:px-12 lg:px-20 max-w-5xl mx-auto">
        <div className="mb-12">
          <h2 className="font-['Syne'] font-extrabold text-2xl sm:text-3xl tracking-tighter mb-4 text-foreground uppercase">
            {t.pricing.addonsTitle}
          </h2>
          <div className="w-full h-[1px] bg-border mb-8"></div>
        </div>

        <div className="grid grid-cols-1 divide-y divide-border border-y border-border">
          {t.pricing.addons.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="py-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-start md:items-center hover:bg-muted/10 transition-colors"
            >
              <div className="font-bold flex items-center gap-2 text-foreground col-span-1 md:col-span-1">
                <span className="text-[hsl(var(--primary))] text-xl">+</span> {item.name}
              </div>
              <div className="text-sm text-muted-foreground col-span-1 md:col-span-2">
                {item.desc}
              </div>
              <div className="font-bold text-[hsl(var(--primary))] text-lg col-span-1 md:col-span-1 md:text-right">
                {item.price}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
};
