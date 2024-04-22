import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

vi.stubEnv('VITE_API_HOST', 'https://test.com');

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem(key: any) {
      return store[key] || null;
    },
    setItem(key: any, value: any) {
      store[key] = value.toString();
    },
    removeItem(key: any) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

afterEach(() => {
  cleanup();
});
