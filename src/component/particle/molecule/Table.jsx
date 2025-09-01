
const Table = ({
    title,
    header1,
    header2 = null,
    header3 = null,
    header4 = null,
    footer1,
    footer2,
    footer3 = null,
    footer4 = null,
    flag = null,
    ratio = ''
}) => {
    return (
        <div className={`grid justify-center mx-2 items-start ${ratio}`}>
            <span className="leading-4">
                {title}
            </span>
            <aside className="mt-2 text-xs flex gap-2 flex-wrap justify-center">
                <div>
                    <header>
                        {header1}
                    </header>
                    <footer className='text-amber-950 dark:text-amber-400'>
                        {footer1}
                    </footer>
                </div>
                {header2 !== null && 
                <div>
                    <header>
                        {header2}
                    </header>
                    <footer className='text-amber-950 dark:text-amber-400'>
                        {footer2}
                    </footer>
                </div>
                }
            </aside>
            {header3 !== null &&
                <aside className="mt-2 text-xs flex gap-2 flex-wrap justify-center">
                    <div>
                        <header>
                            {header3}
                        </header>
                        <footer className='text-amber-950 dark:text-amber-400'>
                            {footer3}
                        </footer>
                    </div>
                    {footer4 !== null &&
                        <div>
                            <header>
                                {header4}
                            </header>
                            <footer className='text-amber-950 dark:text-amber-400'>
                                {footer4}
                            </footer>
                        </div>}
                </aside>}
            {flag !== null &&
                <aside className="mt-2 text-xs flex gap-2 flex-wrap justify-center">
                    <img src={flag} alt={`flag of ${title}`} />
                </aside>}
        </div>
    )
}

export default Table