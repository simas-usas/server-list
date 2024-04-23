import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import GlobalLayout from '../GlobalLayout';

const mockLocation = {
  pathname: '/login',
};

vi.mock('react-router-dom', async (importOriginal) => ({
  ...(await importOriginal<typeof import('react-router-dom')>()),
  useLocation: () => mockLocation,
}));

describe('GlobalLayout', () => {
  it('does not render Header when in login', () => {
    render(
      <MemoryRouter>
        <GlobalLayout />
      </MemoryRouter>,
    );

    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
  });

  it('renders Header when not in login', () => {
    mockLocation.pathname = '/servers';

    render(
      <MemoryRouter>
        <GlobalLayout />
      </MemoryRouter>,
    );

    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });
});
