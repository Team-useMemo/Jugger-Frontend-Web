import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import './index.css';
import { ThemeProviderWithSystem } from './providers/ThemeContext.tsx';
import store from './stores/config/configStore.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProviderWithSystem>
        <App />
      </ThemeProviderWithSystem>
    </Provider>
  </StrictMode>,
);
