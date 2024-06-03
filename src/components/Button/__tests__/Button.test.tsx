import { fireEvent, render, screen } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
  it('renders default Button component', () => {
    render(<Button>Click me</Button>);

    expect(screen.getByText('Click me')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toHaveClass('bg-primary text-white');
  });

  it('renders secondary Button component', () => {
    render(<Button variant="secondary">Click me</Button>);

    expect(screen.getByText('Click me')).toBeInTheDocument();
    expect(screen.getByText('Click me')).toHaveClass('bg-secondary text-black');
  });

  it('clicks Button', () => {
    const mockFn = vi.fn();

    render(<Button onClick={() => mockFn()}>Click me</Button>);

    const button = screen.getByText('Click me');
    fireEvent.click(button);

    expect(mockFn).toHaveBeenCalled();
  });

  it('ignores click when Button is disabled', () => {
    const mockFn = vi.fn();

    render(
      <Button onClick={() => mockFn()} disabled>
        Click me
      </Button>,
    );

    const button = screen.getByText('Click me');
    fireEvent.click(button);

    expect(mockFn).not.toHaveBeenCalled();
  });
});
