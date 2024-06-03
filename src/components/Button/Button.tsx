import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: 'primary' | 'secondary';
}

const classNames = {
  primary: 'bg-primary text-white',
  secondary: 'bg-secondary text-black',
};

const Button = ({ children, variant = 'primary', className, ...props }: Props) => (
  <button className={twMerge(`${classNames[variant]} py-2 px-4 rounded font-bold`, className)} {...props}>
    {children}
  </button>
);

export default Button;
