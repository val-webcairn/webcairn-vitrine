import React from 'react';
import ReactDOM from 'react-dom/client';
import { flushSync } from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { ContactSection } from '@/components/custom/ContactSection';
import { QuoteBuilderSection } from '@/components/custom/QuoteBuilderSection';

const renderWithRoot = (ui) => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = ReactDOM.createRoot(container);

  flushSync(() => {
    root.render(ui);
  });

  return {
    container,
    unmount: () => {
      root.unmount();
      container.remove();
    },
  };
};

const toAsciiLower = (value) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

describe('App critical flows', () => {
  it('opens mobile navigation menu', () => {
    const view = renderWithRoot(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const menuToggle = view.container.querySelector('[data-testid="mobile-menu-toggle"]');
    expect(menuToggle).toBeTruthy();

    flushSync(() => {
      menuToggle.click();
    });

    expect(view.container.querySelector('[data-testid="mobile-menu"]')).toBeTruthy();

    view.unmount();
  });

  it('renders pricing route content on /tarifs', () => {
    const view = renderWithRoot(
      <MemoryRouter initialEntries={['/tarifs']}>
        <App />
      </MemoryRouter>
    );

    expect(toAsciiLower(view.container.textContent)).toContain('generer votre devis');

    view.unmount();
  });

  it('does not submit contact form when required fields are missing', async () => {
    const fetchMock = vi.fn(() => Promise.resolve({ ok: true }));
    vi.stubGlobal('fetch', fetchMock);

    const view = renderWithRoot(
      <ThemeProvider>
        <LanguageProvider>
          <ContactSection />
        </LanguageProvider>
      </ThemeProvider>
    );

    const submitBtn = view.container.querySelector('[data-testid="contact-submit-button"]');

    flushSync(() => {
      submitBtn.click();
    });

    await Promise.resolve();

    expect(fetchMock).toHaveBeenCalledTimes(0);

    vi.unstubAllGlobals();
    view.unmount();
  });

  it('updates quote one-time total when plan and addon change', () => {
    const view = renderWithRoot(
      <LanguageProvider>
        <QuoteBuilderSection />
      </LanguageProvider>
    );

    const ascensionBtn = Array.from(view.container.querySelectorAll('button')).find(
      (btn) => toAsciiLower(btn.textContent).includes('ascension')
    );
    const addonBtn = Array.from(view.container.querySelectorAll('button')).find(
      (btn) => toAsciiLower(btn.textContent).includes('page supplementaire')
    );

    expect(ascensionBtn).toBeTruthy();
    expect(addonBtn).toBeTruthy();

    flushSync(() => {
      ascensionBtn.click();
      addonBtn.click();
    });

    expect(view.container.textContent).toContain('1110 €');

    view.unmount();
  });

  it('updates monthly total when maintenance plan is selected', () => {
    const view = renderWithRoot(
      <LanguageProvider>
        <QuoteBuilderSection />
      </LanguageProvider>
    );

    const serenityBtn = Array.from(view.container.querySelectorAll('button')).find(
      (btn) => toAsciiLower(btn.textContent).includes('serenite')
    );

    expect(serenityBtn).toBeTruthy();

    flushSync(() => {
      serenityBtn.click();
    });

    expect(view.container.textContent).toContain('49 €');
    expect(view.container.textContent).toContain('588 €');

    view.unmount();
  });
});