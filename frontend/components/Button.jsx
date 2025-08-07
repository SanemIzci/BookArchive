import React from 'react'

function Button({name, onClick, size, href, font, color}) {
    const sizeClasses = {
        sm: 'px-2 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    const buttonClasses = `
  hover:bg-[#a1a490]
  text-gray-700
  ${sizeClasses[size]}
  rounded-3xl
  shadow-md
  transition-transform
  duration-200
  ease-in-out
  hover:scale-105
  active:scale-95
  focus:outline-none
  focus:ring-2
  focus:ring-offset-2
  focus:ring-[#a1a490]
`;

    const buttonStyle = color ? { backgroundColor: color } : { backgroundColor: '#b6b9a4' };
    
    if (href) {
        return (
            <a href={href} className={buttonClasses} style={buttonStyle}>
                <p className={font}>{name}</p>
            </a>
        );
    }
    
    return (
        <button onClick={onClick} className={buttonClasses} style={buttonStyle}>
            <p className={font}>{name}</p>
        </button>
    );
}

export default Button