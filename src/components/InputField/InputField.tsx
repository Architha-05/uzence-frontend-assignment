import React from 'react'
import { clsx } from 'clsx'

export type InputFieldProps = {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  placeholder?: string
  helperText?: string
  errorMessage?: string
  disabled?: boolean
  invalid?: boolean
  variant?: 'filled' | 'outlined' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  type?: React.HTMLInputTypeAttribute
  loading?: boolean
  clearable?: boolean
  passwordToggle?: boolean
  ariaLabel?: string
}

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = 'outlined',
  size = 'md',
  type = 'text',
  loading = false,
  clearable = false,
  passwordToggle = false,
  ariaLabel
}) => {
  const [localType, setLocalType] = React.useState(type)

  const sizeClasses = {
    sm: 'text-sm py-2 px-4',
    md: 'text-base py-3 px-5',
    lg: 'text-lg py-4 px-6',
  }[size]

  const variantClasses = {
    filled: 'bg-gray-100 dark:bg-neutral-800 border-transparent',
    outlined: 'border-gray-300 dark:border-neutral-700',
    ghost: 'border-transparent bg-transparent',
  }[variant]

  const invalidClasses = invalid ? 'border-red-500 focus:ring-red-400' : ''

  return (
    <div className="w-full relative">
      {label && (
        <label
          className={clsx(
            'absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 transition-all pointer-events-none',
            value ? 'text-xs -top-2.5 bg-white dark:bg-neutral-900 px-1 text-purple-600' : ''
          )}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          aria-label={ariaLabel || label}
          aria-invalid={invalid || undefined}
          aria-busy={loading || undefined}
          disabled={disabled || loading}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          type={localType}
          className={clsx(
            'input-base',
            sizeClasses,
            'border shadow-sm focus:shadow-md',
            variantClasses,
            invalidClasses,
            disabled && 'opacity-70 cursor-not-allowed'
          )}
        />
        {loading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin h-5 w-5 border-2 border-purple-400 border-t-transparent rounded-full"></div>
        )}
        {clearable && value && !disabled && !loading && (
          <button
            type="button"
            aria-label="Clear input"
            onClick={() => onChange?.({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
        {passwordToggle && type === 'password' && (
          <button
            type="button"
            aria-label={localType === 'password' ? 'Show password' : 'Hide password'}
            onClick={() => setLocalType(localType === 'password' ? 'text' : 'password')}
            className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {localType === 'password' ? '👁️' : '🙈'}
          </button>
        )}
      </div>
      <div className="mt-1 min-h-[1.25rem]">
        {invalid && errorMessage ? (
          <p className="text-sm text-red-600">{errorMessage}</p>
        ) : helperText ? (
          <p className="text-sm text-gray-500">{helperText}</p>
        ) : null}
      </div>
    </div>
  )
}
