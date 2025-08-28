import { useTheme } from "../hook/UseTheme"

const Themes = () => {

    const { toggleTheme, isDark } = useTheme() //Consume función palanca de cambio de tema

    return (
        <>
            <button
            onClick={toggleTheme}
            className="">

                {isDark ? 'Tema Claro' : 'Tema Oscuro'}

            </button>
        </>
    )
}

export default Themes