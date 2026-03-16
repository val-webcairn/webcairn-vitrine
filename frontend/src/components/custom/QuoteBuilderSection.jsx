import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/contexts/LanguageContext';

const EMPTY_LIST = [];

const parseEuro = (value) => {
  const match = String(value).replace(',', '.').match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : 0;
};

const formatEuro = (value) => `${Math.round(value)} €`;

export const QuoteBuilderSection = () => {
  const { t } = useLang();
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
  const [selectedAddonIndexes, setSelectedAddonIndexes] = useState([]);
  const [selectedMaintenanceIndex, setSelectedMaintenanceIndex] = useState(-1);

  const plans = t.pricing.plans;
  const addons = t.pricing.addons;
  const maintenancePlans = useMemo(
    () => t.pricing.maintenance?.plans || EMPTY_LIST,
    [t.pricing.maintenance?.plans]
  );
  const quote = t.pricing.quote;

  const selectedPlan = plans[selectedPlanIndex];

  const totals = useMemo(() => {
    const planTotal = parseEuro(selectedPlan?.price);
    const addonsTotal = selectedAddonIndexes.reduce((acc, index) => acc + parseEuro(addons[index]?.price), 0);
    const monthly = selectedMaintenanceIndex >= 0 ? parseEuro(maintenancePlans[selectedMaintenanceIndex]?.monthlyPrice) : 0;

    return {
      oneTime: planTotal + addonsTotal,
      monthly,
      yearly: monthly * 12
    };
  }, [selectedPlan, selectedAddonIndexes, selectedMaintenanceIndex, addons, maintenancePlans]);

  const selectedItems = useMemo(() => {
    const items = [selectedPlan?.name, ...selectedAddonIndexes.map((index) => addons[index]?.name)];
    if (selectedMaintenanceIndex >= 0) {
      items.push(maintenancePlans[selectedMaintenanceIndex]?.name);
    }
    return items.filter(Boolean);
  }, [selectedPlan, selectedAddonIndexes, selectedMaintenanceIndex, addons, maintenancePlans]);

  const toggleAddon = (index) => {
    setSelectedAddonIndexes((prev) =>
      prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]
    );
  };

  const emailBody = [
    `${quote.oneTimeTotalLabel}: ${formatEuro(totals.oneTime)}`,
    `${quote.monthlyTotalLabel}: ${formatEuro(totals.monthly)}`,
    `${quote.yearlyTotalLabel}: ${formatEuro(totals.yearly)}`,
    '',
    `${quote.selectedLabel}:`,
    ...selectedItems.map((item) => `- ${item}`)
  ].join('\n');

  const mailtoLink = `mailto:contact@webcairn.fr?subject=${encodeURIComponent('Demande de devis WebCairn')}&body=${encodeURIComponent(emailBody)}`;

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-20">
      <div className="mb-16 md:mb-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs tracking-[0.3em] text-[hsl(var(--primary))] font-semibold mb-4"
        >
          {quote.overline}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-['Syne'] font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tighter"
        >
          {quote.heading}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg text-muted-foreground mt-4 max-w-md"
        >
          {quote.sub}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1px] bg-border max-w-5xl mx-auto">
        <div className="bg-background p-8 md:p-12 space-y-10">
          <div>
            <h3 className="text-[10px] tracking-[0.3em] font-bold text-muted-foreground mb-4 uppercase">{quote.packageLabel}</h3>
            <div className="space-y-2">
              {plans.map((plan, index) => (
                <button
                  key={plan.name}
                  type="button"
                  onClick={() => setSelectedPlanIndex(index)}
                  className={`w-full text-left border px-4 py-3 transition-colors duration-300 ${selectedPlanIndex === index
                    ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]'
                    : 'border-border hover:border-[hsl(var(--primary))/0.5]'
                    }`}
                >
                  <span className="font-semibold">{plan.name}</span>
                  <span className="ml-2 text-sm opacity-80">{plan.price}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[10px] tracking-[0.3em] font-bold text-muted-foreground mb-4 uppercase">{quote.addonsLabel}</h3>
            <div className="space-y-2 max-h-72 overflow-auto pr-1">
              {addons.map((addon, index) => {
                const selected = selectedAddonIndexes.includes(index);
                return (
                  <button
                    key={addon.name}
                    type="button"
                    onClick={() => toggleAddon(index)}
                    className={`w-full text-left border px-4 py-3 transition-colors duration-300 ${selected
                      ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]'
                      : 'border-border hover:border-[hsl(var(--primary))/0.5]'
                      }`}
                  >
                    <span className="font-semibold">{addon.name}</span>
                    <span className="ml-2 text-sm opacity-80">{addon.price}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-[10px] tracking-[0.3em] font-bold text-muted-foreground mb-4 uppercase">{quote.maintenanceLabel}</h3>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setSelectedMaintenanceIndex(-1)}
                className={`w-full text-left border px-4 py-3 transition-colors duration-300 ${selectedMaintenanceIndex === -1
                  ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]'
                  : 'border-border hover:border-[hsl(var(--primary))/0.5]'
                  }`}
              >
                {quote.noneLabel}
              </button>
              {maintenancePlans.map((plan, index) => (
                <button
                  key={plan.name}
                  type="button"
                  onClick={() => setSelectedMaintenanceIndex(index)}
                  className={`w-full text-left border px-4 py-3 transition-colors duration-300 ${selectedMaintenanceIndex === index
                    ? 'border-[hsl(var(--primary))] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]'
                    : 'border-border hover:border-[hsl(var(--primary))/0.5]'
                    }`}
                >
                  <span className="font-semibold">{plan.name}</span>
                  <span className="ml-2 text-sm opacity-80">{plan.monthlyPrice}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-background p-8 md:p-12 flex flex-col justify-between">
          <div>
            <h3 className="text-[10px] tracking-[0.3em] font-bold text-muted-foreground mb-6 uppercase">
              {quote.summaryTitle}
            </h3>

            <div className="space-y-6">
              <div className="border-b border-border pb-4">
                <p className="text-sm text-muted-foreground">{quote.oneTimeTotalLabel}</p>
                <p className="font-['Syne'] font-extrabold text-4xl tracking-tighter text-[hsl(var(--primary))]">
                  {formatEuro(totals.oneTime)}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">{quote.monthlyTotalLabel}</p>
                <p className="font-['Syne'] font-extrabold text-3xl tracking-tighter">
                  {formatEuro(totals.monthly)}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">{quote.yearlyTotalLabel}</p>
                <p className="font-['Syne'] font-extrabold text-3xl tracking-tighter">
                  {formatEuro(totals.yearly)}
                </p>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">{quote.selectedLabel}</p>
                <ul className="space-y-1">
                  {selectedItems.map((item) => (
                    <li key={item} className="text-sm">• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <a
              href={mailtoLink}
              className="inline-flex items-center justify-center w-full px-8 py-4 bg-black text-white dark:bg-white dark:text-black font-bold tracking-widest text-sm uppercase hover:bg-[hsl(var(--primary))] hover:text-[hsl(var(--primary-foreground))] transition-colors duration-500"
            >
              {quote.cta}
            </a>
            <p className="mt-4 text-xs text-muted-foreground">
              {quote.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
