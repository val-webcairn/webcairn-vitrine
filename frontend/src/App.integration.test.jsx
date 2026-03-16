import React from 'react';
import ReactDOM from 'react-dom/client';
import { flushSync } from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import App from '@/App';

describe('App integration', () => {
  it('renders navigation and main layout', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const root = ReactDOM.createRoot(container);
    flushSync(() => {
      root.render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );
    });

    expect(container.textContent).toContain('WebCairn');

    root.unmount();
    container.remove();
  });
});
