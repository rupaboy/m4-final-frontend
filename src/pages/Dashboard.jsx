import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { UseRadio } from "../hook/UseRadio"
import { UseUser } from "../hook/UseUser"
import RadioMarkerList from '../component/RadioMarkerList'
import Unregistered from '../component/Unregistered'
import Header from '../component/particle/Header'
import Button from "../component/particle/molecule/Button"
import Logo from "../component/particle/Logo"

const Dashboard = () => {

  const [showMarkers, setShowMarkers] = useState(true)
  const { setLogInEmail, isLoggedIn, user } = UseUser()
  const { radioMarkers, fetchUserRadioMarkers } = UseRadio()   // <- traemos radioMarkers del contexto
  const navigate = useNavigate()
  
  useEffect(() => {
    setLogInEmail(null)
    if (!user) return;
    fetchUserRadioMarkers(user._id)
  }, [])

  return (
    <aside>
      <main className="flex flex-col gap-4 mt-8">

        <header className='flex justify-center z-200'>
          <Logo action={() => navigate('/')} />
        </header>

        {!isLoggedIn &&
          <Unregistered />
        }
        {isLoggedIn &&
          <div className="fixed left-4 top-1/2 translate-y-[-6.5em] z-99">
            <Button
              buttonText={<i className="bi-globe-americas" />}
              title={`Find out more about ${user.location}`}
              buttonName={`Research ${user.location}`}
              action={() => navigate(`/country/${user.location}`)}
            />
          </div>
        }
        {radioMarkers.length !== 0 && isLoggedIn &&
          <>
            <div className="fixed left-4 top-1/2 translate-y-[-2em] z-99">
              <Button
                buttonText={<i className="bi-star-half" />}
                title={`${showMarkers ? 'Hide Markers' : 'Show Markers'}`}
                buttonName={`${showMarkers ? 'Hide Markers' : 'Show Markers'}`}
                action={() => setShowMarkers(prev => !prev)}
              />
            </div>
            {isLoggedIn && showMarkers &&
              <>
                <Header
                  header={'Radio Markers'}
                  subHeader={'Grouped by Country'}
                />
                <div className="flex flex-col items-center">
                  <RadioMarkerList />
                </div>
              </>}
          </>
        }
      </main>
    </aside>
  )
}

export default Dashboard
