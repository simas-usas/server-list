import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Servers from '../Servers';

vi.mock('@tanstack/react-query', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@tanstack/react-query')>()),
  useSuspenseQuery: vi.fn().mockReturnValue({
    data: [
      { name: 'Mordor', distance: '999' },
      { name: 'Rapture', distance: '400' },
      { name: 'Skyrim', distance: '600' },
      { name: 'Midgar', distance: '700' },
      { name: 'Hyrule', distance: '200' },
    ],
  }),
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
