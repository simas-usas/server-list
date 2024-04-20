import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: 'primary' | 'secondary';
}

const Button = ({ children, variant = 'primary', ...props }: Props) => {
  const backgroundColor = `bg-${variant}`;
  const textColor = variant === 'primary' ? 'text-white' : 'text-black';
  return (
    <button className={`${backgroundColor} ${textColor} py-2 px-4 rounded`} {...props}>
      {children}
    </button>
  );
};

export default Button;
