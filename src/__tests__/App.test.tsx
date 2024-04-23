import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { AuthProvider } from '#contexts/AuthContext';
import { Mock } from 'vitest';

describe('App', () => {
  it('renders Login page by default', () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>,
    );

    expect(screen.getByPlaceholderText('Enter username here...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter password here...')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('navigates to Servers page and then signs out', async () => {
    const queryClient = new QueryClient();

    const mockFetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ token: 'test' }),
      }),
    ) as Mock;

    global.fetch = mockFetch;

    render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>,
    );

    const usernameInput = screen.getByPlaceholderText('Enter username here...');
    fireEvent.change(usernameInput, { target: { value: 'tesotest' } });

    const passwordInput = screen.getByPlaceholderText('Enter password here...');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const signInButton = screen.getByText('Sign in');
    fireEvent.click(signInButton);

    await waitFor(() => expect(screen.getByText('Sign out')).toBeInTheDocument());

    const signOutButton = screen.getByText('Sign out');
    fireEvent.click(signOutButton);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});
