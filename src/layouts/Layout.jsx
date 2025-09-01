import { Outlet, useNavigate } from 'react-router'
import { useTheme } from '../hook/UseTheme'
import { UseRadio } from '../hook/UseRadio'
import { UseUser } from '../hook/UseUser'
import { UseUi } from '../hook/UseUi'
import RadioPlayer from '../component/particle/RadioPlayer'
import Button from '../component/particle/molecule/Button'
import Menu from '../component/particle/Menu'

const Layout = () => {
    const navigate = useNavigate()

    const { isDark, toggleTheme } = useTheme()
    const { isLoggedIn, hasStoragedUser, user } = UseUser()
    const { currentRadio } = UseRadio()
    const {
        showPopUp,
        isMenuOpen,
        setIsMenuOpen,
        isFinderOpen,
        isUserOpen,
        isHubOpen,
        isDashBoardOpen
    } = UseUi()


    return (
        <main className={`
              dark:bg-radial dark:from-slate-800 dark:to-slate-950 dark:text-slate-300/90
              bg-radial from-slate-300 to-slate-400 text-slate-900
              w-screen md:w-screen min-h-screen md:min-h-screen justify-center
              overflow-hidden flex flex-col`}>

            {/* Menu Panel */}
            {isMenuOpen &&
                <Menu />}

            {/* Menu Button */}
            <div className="top-4 left-4 w-8 fixed z-2001">
                <Button
                    buttonText={<i className={`z-1000 ${isMenuOpen ? 'bi-x' : "bi-three-dots-vertical"}`} />}
                    title={'Toggle Menu'}
                    buttonName={`${isMenuOpen ? 'Close' : 'Menu'}`}
                    action={() => { setIsMenuOpen(prev => !prev) }}
                />
            </div>

            {/* Back Button */}
            {window.history.length > 1 && !showPopUp && !isFinderOpen &&
                <Button
                    ratio={`z-100 top-4 w-8 left-16 fixed ${isHubOpen?'sm:left-27':'sm:left-16'}`}
                    title={`Go back`}
                    buttonText={<i className='bi-caret-left' />}
                    buttonName={`Back`}
                    action={() => {
                        navigate(-1)
                    }}
                />}

            {/* Finder Button */}
            {!showPopUp &&
                <div className="fixed bottom-4 w-8 right-4 z-100">
                    <Button
                        buttonText={<i className={`z-1000 ${isFinderOpen ? 'bi-x' : 'bi-search'}`} />}
                        title={'Toggle Finder'}
                        buttonName={`${isFinderOpen ? 'Close' : 'Finder'}`}
                        action={() => {
                            if (isFinderOpen) navigate(-1)
                            else navigate('/finder')
                        }}
                    />
                </div>
            }

            {currentRadio &&
                <div className='fixed bottom-15 left-4 z-2001'>
                    <RadioPlayer />
                </div>
            }

            {/* Theme Button */}
            <div className="fixed bottom-4 w-8 left-4 z-2001">
                <Button
                    buttonText={<i className={`z-1000 ${isDark ? 'bi-sun' : 'bi-moon'}`} />}
                    title={`${isDark ? 'Toggle Light Theme' : 'Toggle Dark Theme'}`}
                    buttonName={`${isDark ? 'Dark' : 'Light'}`}
                    action={() => toggleTheme()}
                />
            </div>

            {/* DashBoard Button */}
            <div className={`${isDashBoardOpen || isFinderOpen ? 'hidden' : 'fixed top-4 w-8 right-16 z-100'}`}>
            <Button
                buttonText={<i className={`z-1000 bi-house`} />}
                title={`DashBoard`}
                buttonName={`Home`}
                action={() => {
                    if (!isDashBoardOpen) navigate(`/`)
                }}
            />
            </div>

            {/* User Button */}
            {!isUserOpen && !isFinderOpen &&
                <div className="fixed top-4 w-8 right-4 z-100">
                    <Button
                        buttonText={<i className={`z-1000' ${isLoggedIn ? 'bi-person' : hasStoragedUser ? 'bi-box-arrow-in-right' : 'bi-person-plus'}`} />}
                        title={`${isLoggedIn ? 'User Profile' : 'Login/Sign Up'}`}
                        buttonName={`${isLoggedIn ? 'User' : hasStoragedUser ? 'Login' : 'SignUp'}`}
                        action={() => {
                            if (isLoggedIn) {
                                navigate(`/user/id/${user._id}`)
                            } else {
                                navigate('/user/login')
                            }
                        }}
                    />
                </div>}

            {/* Current View */}

            <Outlet />

        </main>
    )
}

export default Layout