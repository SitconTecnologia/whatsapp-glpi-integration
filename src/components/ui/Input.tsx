import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            className="mb-1 block text-sm font-medium text-gray-700"
            htmlFor={props.id}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
              {icon}
            </div>
          )}
          <input
            className={cn(
              'block w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm',
              'placeholder:text-gray-400',
              'focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500',
              'disabled:bg-gray-100 disabled:text-gray-500',
              error && 'border-error-600 focus:border-error-600 focus:ring-error-600',
              icon && 'pl-10',
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-xs text-error-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';