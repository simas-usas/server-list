import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Table from '../Table';

const mockData = [
  { name: 'Mordor', distance: 999 },
  { name: 'Rapture', distance: 400 },
  { name: 'Skyrim', distance: 600 },
  { name: 'Midgar', distance: 700 },
  { name: 'Hyrule', distance: 200 },
  { name: 'Mushroom Kingdom', distance: 800 },
  { name: 'Pandora', distance: 550 },
  { name: 'Azeroth', distance: 650 },
  { name: 'Tamriel', distance: 1000 },
  { name: 'Silent Hill', distance: 180 },
  { name: 'City 17', distance: 850 },
  { name: 'Dunwall', distance: 950 },
  { name: 'Columbia', distance: 820 },
  { name: 'Lordran', distance: 300 },
  { name: 'Zebes', distance: 190 },
  { name: 'Arkham City', distance: 420 },
  { name: 'Spira', distance: 770 },
  { name: 'San Andreas', distance: 640 },
  { name: 'Athena', distance: 720 },
  { name: 'Vvardenfell', distance: 600 },
  { name: 'Inaba', distance: 880 },
  { name: 'Los Santos', distance: 320 },
  { name: 'Bionis', distance: 900 },
  { name: 'Zanarkand', distance: 800 },
  { name: 'Narnia', distance: 930 },
  { name: 'Cerberon', distance: 630 },
  { name: 'Novigrad', distance: 710 },
  { name: 'Mega City One', distance: 820 },
  { name: 'Raccoon City', distance: 880 },
  { name: 'Citadel', distance: 310 },
];

describe('Table', () => {
  it('renders Table first page by default', async () => {
    render(<Table data={mockData} />);

    expect(screen.getByText('Mordor')).toBeInTheDocument();
    expect(screen.getByText('999')).toBeInTheDocument();
    expect(screen.queryByText('Citadel')).not.toBeInTheDocument();
    expect(screen.queryByText('310')).not.toBeInTheDocument();
  });

  it('renders Table second page on next click', async () => {
    render(<Table data={mockData} />);

    const nextPageButton = screen.getByLabelText('next page');
    fireEvent.click(nextPageButton);

    expect(screen.queryByText('Mordor')).not.toBeInTheDocument();
    expect(screen.queryByText('999')).not.toBeInTheDocument();
    expect(screen.getByText('Citadel')).toBeInTheDocument();
    expect(screen.getByText('310')).toBeInTheDocument();
  });

  it('renders Table second page on second page click', async () => {
    render(<Table data={mockData} />);

    const secondPageButton = screen.getByLabelText('page 2');
    fireEvent.click(secondPageButton);

    expect(screen.getByText('Citadel')).toBeInTheDocument();
    expect(screen.getByText('310')).toBeInTheDocument();
    expect(screen.queryByText('Mordor')).not.toBeInTheDocument();
    expect(screen.queryByText('999')).not.toBeInTheDocument();
  });

  it('sorts Table by name', async () => {
    render(<Table data={mockData} />);

    const nameHeader = screen.getByLabelText('name sort');
    fireEvent.click(nameHeader);

    expect(screen.getByText('Athena')).toBeInTheDocument();
    expect(screen.queryByText('Zanarkand')).not.toBeInTheDocument();

    fireEvent.click(nameHeader);

    expect(screen.getByText('Zanarkand')).toBeInTheDocument();
    expect(screen.queryByText('Athena')).not.toBeInTheDocument();
  });

  it('sorts Table by distance', async () => {
    render(<Table data={mockData} />);

    const distanceHeader = screen.getByLabelText('distance sort');
    fireEvent.click(distanceHeader);

    expect(screen.getByText('180')).toBeInTheDocument();
    expect(screen.queryByText('1000')).not.toBeInTheDocument();

    fireEvent.click(distanceHeader);

    expect(screen.getByText('1000')).toBeInTheDocument();
    expect(screen.queryByText('180')).not.toBeInTheDocument();
  });
});
