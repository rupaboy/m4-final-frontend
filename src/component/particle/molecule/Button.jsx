import React from 'react'

const Button = ( {
    action,
    buttonText = 'buttonText',
    buttonName,
    type='button',
    buttonColor=`
        dark:hover:bg-slate-500/80 dark:bg-slate-700/80
        hover:bg-slate-100/80 bg-slate-100/60`,
    ratio = 'w-8',
    title = 'buttonTitle' } ) => {

    return (
        <button
        type={type}
        title={title}
        onClick={action}
        className={`${ratio} ${buttonColor}
        mt-2 h-8 leading-8 rounded cursor-pointer
        font-black`}>
            {buttonText}
            {buttonName && <p className='font-light text-xs grid justify-center'>{buttonName}</p>}
        </button>
    )
}

export default Button