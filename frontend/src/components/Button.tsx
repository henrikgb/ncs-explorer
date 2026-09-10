type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`
        rounded-sm bg-gray-600 px-3 py-1 font-semibold text-white
        hover:cursor-pointer hover:bg-gray-500 
        focus:outline-none focus:ring-2 focus:ring-gray-500
        disabled:cursor-not-allowed disabled:opacity-50
        ${className}
      `}
      {...props}
    />
  )
}
