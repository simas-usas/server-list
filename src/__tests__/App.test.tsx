import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders the Login component by default', () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>,
    );

    expect(screen.getByPlaceholderText('Enter username here...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter password here...')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });
});
