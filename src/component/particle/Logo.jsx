import { useTheme } from "../../hook/UseTheme"
import { useNavigate } from "react-router"
import { UseUi } from "../../hook/UseUi"

const Logo = ({ isIsoOnly = false }) => {

  const navigate = useNavigate()
    
    const { isDark } = useTheme()
    const { isMenuOpen, setIsMenuOpen } = UseUi()

  return (
    <main
      title='To Dashboard'
      onClick={() => {
        {isMenuOpen && setIsMenuOpen(false) }
        navigate('/')
      }}
      className="flex gap-1 sm:flex-row flex-col items-center cursor-pointer hover:scale-110">
        <img className='w-8 h-8' src={`${
            !isDark ? '/assets/sphereOneIso.svg' : '/assets/sphereOneIsoDark.svg' }`} alt="" />
        { !isIsoOnly &&
          <img className='h-8' src={`${
            !isDark ? '/assets/sphereOneLogo.svg' : '/assets/sphereOneLogoDark.svg' }`} alt="Sphere One" />
            }
    </main>
  )
}

export default Logo