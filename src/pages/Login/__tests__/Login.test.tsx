import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../Login';
import { AuthProvider } from '#contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('Login', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders Login page', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    expect(screen.getByPlaceholderText('Enter username here...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter password here...')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('validates inputs', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    const button = screen.getByText('Sign in');
    fireEvent.click(button);
    expect(screen.getByText('Please enter a valid username.')).toBeInTheDocument();

    const usernameInput = screen.getByPlaceholderText('Enter username here...');
    fireEvent.change(usernameInput, { target: { value: 'tesotest' } });
    fireEvent.click(button);
    expect(screen.getByText('Please enter a valid password.')).toBeInTheDocument();

    const passwordInput = screen.getByPlaceholderText('Enter password here...');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(screen.queryByText('Please enter a valid password.')).not.toBeInTheDocument();
    expect(screen.queryByText('Please enter a valid username.')).not.toBeInTheDocument();
  });

  it('calls token endpoint', async () => {
    const queryClient = new QueryClient();

    const mockFetch = vi.fn();
    global.fetch = mockFetch;

    render(
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        </AuthProvider>
      </QueryClientProvider>,
    );

    const usernameInput = screen.getByPlaceholderText('Enter username here...');
    fireEvent.change(usernameInput, { target: { value: 'tesotest' } });

    const passwordInput = screen.getByPlaceholderText('Enter password here...');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const button = screen.getByText('Sign in');
    fireEvent.click(button);

    await waitFor(() =>
      expect(mockFetch).toHaveBeenCalledWith('https://test.com/tokens', {
        body: '{"username":"tesotest","password":"password123"}',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }),
    );
  });
});
