import { render, screen, waitFor } from '@testing-library/react';
import Servers from '../Servers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

vi.mock('@tanstack/react-query', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@tanstack/react-query')>()),
  useSuspenseQuery: vi.fn().mockReturnValue({
    data: [
      { name: 'Mordor', distance: '999' },
      { name: 'Rapture', distance: '400' },
      { name: 'Skyrim', distance: '600' },
      { name: 'Midgar', distance: '700' },
      { name: 'Hyrule', distance: '200' },
      { name: 'Mushroom Kingdom', distance: '800' },
      { name: 'Pandora', distance: '550' },
      { name: 'Azeroth', distance: '650' },
      { name: 'Tamriel', distance: '1000' },
      { name: 'Silent Hill', distance: '180' },
      { name: 'City 17', distance: '850' },
      { name: 'Dunwall', distance: '950' },
      { name: 'Columbia', distance: '820' },
      { name: 'Lordran', distance: '300' },
      { name: 'Zebes', distance: '190' },
      { name: 'Arkham City', distance: '420' },
      { name: 'Spira', distance: '770' },
      { name: 'San Andreas', distance: '640' },
      { name: 'Athena', distance: '720' },
      { name: 'Vvardenfell', distance: '600' },
      { name: 'Inaba', distance: '880' },
      { name: 'Los Santos', distance: '320' },
      { name: 'Bionis', distance: '900' },
      { name: 'Zanarkand', distance: '800' },
      { name: 'Narnia', distance: '930' },
      { name: 'Cerberon', distance: '630' },
      { name: 'Novigrad', distance: '710' },
      { name: 'Mega City One', distance: '820' },
      { name: 'Raccoon City', distance: '880' },
      { name: 'Silent Hill', distance: '310' },
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
