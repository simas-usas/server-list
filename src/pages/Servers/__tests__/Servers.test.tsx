import { render, screen, waitFor } from '@testing-library/react';
import Servers from '../Servers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

vi.mock('@tanstack/react-query', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@tanstack/react-query')>()),
  useSuspenseQuery: vi.fn().mockReturnValue({ data: [{ name: 'Mordor', distance: '999' }] }),
}));

describe('Servers', () => {
  it('renders Servers page', async () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <Servers />
      </QueryClientProvider>,
    );

    await waitFor(() => expect(screen.getByText('Mordor')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('999')).toBeInTheDocument());
  });
});
