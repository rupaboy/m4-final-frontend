import { UseUi } from "../../hook/UseUi"
import Logo from "./Logo"
import RadioPlayer from "./RadioPlayer"

const Menu = () => {

  const { isMenuOpen } = UseUi()

  return (
    <>
      {isMenuOpen &&
        <main className={`
      dark:text-slate-500 text-slate-700
      dark:from-slate-950 dark:to-slate-950 z-2000
      bg-linear-130 from-slate-200 to-slate-300
     dark:hover:text-slate-300
      w-screen h-screen items-center justify-center md:justify-evenly
      overflow-hidden px-5 sm:px-0 flex flex-col md:flex-row`}>

          <div className='top-7 fixed mx-auto'>
            <Logo />
          </div>

        </main>
      }
    </>
  )
}

export default Menu