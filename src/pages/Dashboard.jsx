import { useState } from "react"
import { UseMarkers } from "../hook/UseMarkers"
import MarkersList from "../component/MarkersList"
import Button from "../component/particle/molecule/Button"
import Unregistered from '../component/Unregistered'
import Logo from "../component/particle/Logo"
import { UseUi } from "../hook/UseUi"
import { UseUser } from "../hook/UseUser"


const Dashboard = () => {

  const [showMarkers, setShowMarkers] = useState(true)
  const { isLoggedIn } = UseUser()
  const { markers } = UseMarkers()
  const { isMenuOpen } = UseUi()

  return (
    <main className="w-screen flex justify-center items-center">

      { !isMenuOpen &&
      <div className='top-7 fixed mx-auto z-200'>
        <Logo />
      </div>}

      { !isLoggedIn && !isMenuOpen &&
      <Unregistered/>
      }

      <aside className={`${isMenuOpen || !isLoggedIn ? 'hidden' : ''}`}>
        <div className="absolute left-4 top-1/2 translate-y-[-2em]">
          <Button
            buttonText={<i className="bi-star-half" />}
            buttonName={`${showMarkers ? 'Hide Markers' : 'Show Markers'}`}
            action={() => showMarkers ? setShowMarkers(false) : setShowMarkers(true)}
          />
        </div>
        {markers.length !== 0 && showMarkers &&
          <MarkersList />
        }
      </aside>

    </main>
  )
}

export default Dashboard