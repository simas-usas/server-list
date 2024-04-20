import { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  className?: string;
}

const Input = ({ label, id, className, ...props }: Props) => (
  <div className={twMerge('flex flex-col', className)}>
    {label && (
      <label htmlFor={id} className="mb-1">
        {label}
      </label>
    )}
    <input id={id} className="border border-gray-400 rounded p-2" {...props} />
  </div>
);

export default Input;
