import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: 'primary' | 'secondary';
}

const classNames = {
  primary: 'bg-primary text-white',
  secondary: 'bg-secondary text-black',
};

const Button = ({ children, variant = 'primary', ...props }: Props) => (
  <button className={`${classNames[variant]} py-2 px-4 rounded`} {...props}>
    {children}
  </button>
);

export default Button;
