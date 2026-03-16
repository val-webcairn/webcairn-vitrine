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

const waitForCondition = async (condition, timeout = 1500, interval = 25) => {
  const startedAt = Date.now();
  while (!condition()) {
    if (Date.now() - startedAt > timeout) {
      throw new Error('Timed out while waiting for condition');
    }
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
};

describe('App critical flows', () => {
  it('navigates from /tarifs to home section when header link is clicked', async () => {
    const originalScrollIntoView = Element.prototype.scrollIntoView;
    const scrollIntoViewMock = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoViewMock;

    const view = renderWithRoot(
      <MemoryRouter initialEntries={['/tarifs']}>
        <App />
      </MemoryRouter>
    );

    const servicesLink = view.container.querySelector('[data-testid="nav-link-services"]');
    expect(servicesLink).toBeTruthy();

    flushSync(() => {
      servicesLink.click();
    });

    await waitForCondition(() => scrollIntoViewMock.mock.calls.length > 0, 2000);
    expect(scrollIntoViewMock).toHaveBeenCalled();

    Element.prototype.scrollIntoView = originalScrollIntoView;
    view.unmount();
  });

  it('scrolls to a section when header navigation link is clicked', () => {
    const originalScrollIntoView = Element.prototype.scrollIntoView;
    const scrollIntoViewMock = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoViewMock;

    const view = renderWithRoot(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const servicesLink = view.container.querySelector('[data-testid="nav-link-services"]');
    expect(servicesLink).toBeTruthy();

    flushSync(() => {
      servicesLink.click();
    });

    expect(scrollIntoViewMock).toHaveBeenCalled();

    Element.prototype.scrollIntoView = originalScrollIntoView;
    view.unmount();
  });

  it('opens and closes legal notice modal from footer link', async () => {
    const view = renderWithRoot(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const legalLink = view.container.querySelector('[data-testid="legal-link"]');
    expect(legalLink).toBeTruthy();

    flushSync(() => {
      legalLink.click();
    });

    await waitForCondition(() => {
      return Boolean(view.container.querySelector('button[aria-label="Fermer"], button[aria-label="Close"]'));
    });

    const closeButton = view.container.querySelector('button[aria-label="Fermer"], button[aria-label="Close"]');
    expect(closeButton).toBeTruthy();

    flushSync(() => {
      closeButton.click();
    });

    await waitForCondition(() => {
      return !view.container.querySelector('button[aria-label="Fermer"], button[aria-label="Close"]');
    });

    view.unmount();
  });

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

  it('renders pricing route content on /tarifs', async () => {
    const view = renderWithRoot(
      <MemoryRouter initialEntries={['/tarifs']}>
        <App />
      </MemoryRouter>
    );

    await waitForCondition(() =>
      toAsciiLower(view.container.textContent).includes('generer votre devis')
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