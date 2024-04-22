import { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface Props {
  id: string;
  label?: string;
  className?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

const Input = ({ label, id, className, inputProps: { ...inputProps }, ...props }: Props) => (
  <div className={twMerge('flex flex-col', className)} {...props}>
    {label && (
      <label htmlFor={id} className="mb-1">
        {label}
      </label>
    )}
    <input id={id} {...inputProps} className={twMerge('border border-gray-400 rounded p-2', inputProps.className)} />
  </div>
);

export default Input;
