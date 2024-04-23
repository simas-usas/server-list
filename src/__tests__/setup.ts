import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

vi.stubEnv('VITE_API_HOST', 'https://test.com');

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  vi.resetAllMocks();
});
