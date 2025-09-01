
const Header = ({ header = 'Header', subHeader = 'SubHeader' }) => {
    return (
        <>
            <header className="w-screen flex pb-1 justify-center mx-auto text-lg text-center border-b dark:border-b-amber-500 border-b-amber-600">
                <p className="text-slate-700 dark:text-slate-300">
                    { header }
                </p>
            </header>
            <header className="text-xs mx-auto text-center pb-7 pt-1">
                <p>
                    { subHeader }
                </p>
            </header>
        </>
    )
}

export default Header