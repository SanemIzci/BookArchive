import React from 'react'

function Button({name, onClick, size = 'lg', href, font, variant = 'primary', className = '', disabled = false}) {
    const sizeClasses = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-10 py-4 text-lg',
    };

    const variantClasses = {
        primary: 'bg-[#d6a49b] hover:bg-[#c99a8f] active:bg-[#bd8f85] text-white',
        secondary: 'bg-white/90 hover:bg-white active:bg-white/95 text-[#d6a49b] border-3 border-[#d6a49b] hover:border-[#c99a8f]',
        outline: 'bg-transparent hover:bg-[#d6a49b] active:bg-[#c99a8f] text-[#d6a49b] border-2 border-[#d6a49b] hover:border-[#c99a8f]'
    };

    const buttonClasses = `
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${variant === 'primary' ? 'rounded-xl' : 'rounded-xl'}
        font-semibold
        shadow-xl
        hover:shadow-2xl
        transition-all
        duration-200
        ease-in-out
        hover:scale-105
        active:scale-100
        transform
        focus:outline-none
        focus:ring-2
        focus:ring-offset-2
        focus:ring-[#d6a49b]
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:scale-100
        disabled:hover:shadow-xl
        ${className}
    `;
    
    if (href) {
        return (
            <a href={href} className={buttonClasses}>
                {name}
            </a>
        );
    }
    
    return (
        <button onClick={onClick} className={buttonClasses} disabled={disabled}>
            {name}
        </button>
    );
}

export default Button