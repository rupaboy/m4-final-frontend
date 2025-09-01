import { useEffect, useState } from "react"
import { UseRadio } from "../hook/UseRadio"
import Button from "../component/particle/molecule/Button"
import Unregistered from '../component/Unregistered'
import Logo from "../component/particle/Logo"
import { UseUi } from "../hook/UseUi"
import { UseUser } from "../hook/UseUser"
import RadioMarkerList from '../component/RadioMarkerList'

const Dashboard = () => {

  const [ showMarkers, setShowMarkers ] = useState(true)
  const { setLogInEmail, isLoggedIn, user } = UseUser()
  const { isMenuOpen } = UseUi()
  const { radioMarkers, fetchUserRadioMarkers } = UseRadio()   // <- traemos radioMarkers del contexto

  useEffect(() => {
    setLogInEmail(null)
    if (!user) return;
    fetchUserRadioMarkers(user._id)
  }, [])

  return (
    <main className="w-screen flex justify-center items-center">

      {!isMenuOpen &&
        <header className='top-7 left-1/2 translate-x-[-2rem] sm:translate-x-[-3.4rem] fixed flex justify-center z-200'>
          <Logo action={() => navigate('/')} />
        </header>
      }

      {!isLoggedIn &&
        <Unregistered />
      }

      { isLoggedIn && radioMarkers.length > 0 &&
        <aside>
        <div className="absolute left-4 top-1/2 translate-y-[-2em]">
          <Button
            buttonText={<i className="bi-star-half" />}
            buttonName={`${showMarkers ? 'Hide Markers' : 'Show Markers'}`}
            action={() => setShowMarkers(prev => !prev)}
          />
        </div>

        {radioMarkers.length !== 0 && showMarkers &&
          <RadioMarkerList />
        }
      </aside>}

    </main>
  )
}

export default Dashboard
