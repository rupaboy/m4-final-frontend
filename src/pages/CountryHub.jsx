import CountryCapitalImage from '../component/CountryCapitalImage';
import Button from '../component/particle/molecule/Button';
import PopUpImage from '../component/particle/molecule/PopUpImage';
import Table from '../component/particle/molecule/Table';
import Logo from '../component/particle/Logo';
import Loading from '../component/particle/molecule/Loading';
import { UseMarkers } from '../hook/UseMarkers';
import { UseUi } from '../hook/UseUi';
import { UseUser } from '../hook/UseUser';
import { useNavigate, useParams } from 'react-router';
import { UseWorld } from '../hook/UseWorld';
import { useEffect } from 'react';
import { UseNotification } from '../hook/UseNotification';
import { UseFetchStatus } from '../hook/UseFetchStatus';
import CountryApi from '../api/CountryApi';

const CountryHub = () => {
  const { code } = useParams();
  const { countries, setCurrentCountry, currentCountry } = UseWorld();
  const { markers, addToMarkers, isMarkedAlreadyComparisson, removeFromMarkers } = UseMarkers();
  const { isMenuOpen, showPopUp, setShowPopUp } = UseUi();
  const { isLoggedIn } = UseUser();
  const { getStatus, runFetch } = UseFetchStatus();
  const { notify } = UseNotification();
  const navigate = useNavigate();

  useEffect(() => {
    if (!code) return;

    const fetchCountry = async () => {
      // If all countries are loaded in context, find the country locally
      if (getStatus('countries')?.dataLoaded) {
        notify({
          id: 'loading-country',
          notificationTag: `${code}: from cache`,
          duration: 2000,
          withProgress: false
        });
        const found = countries.find(c => c.code === code);
        setCurrentCountry(found || null);
      } else {
        notify({
          id: 'loading-country',
          notificationTag: `${code}: single fetch`,
          duration: 3000
        });
        // Fallback: fetch single country
        await runFetch(
          `country-${code}`,
          () => CountryApi.byCode(code),
          (res) => setCurrentCountry(res.data)
        );
      }
    };

    fetchCountry();
  }, [code, countries, runFetch, getStatus]);

  if (!currentCountry) {
    return (
      <main className="text-center h-screen flex w-screen items-center justify-center">
        <Loading />
      </main>
    );
  }

  return (
    <main className={`${isMenuOpen ? 'hidden' : ''} text-center h-screen w-screen overflow-y-scroll`}>
      {/* Top logo */}
      <div className='top-7 w-screen flex items-center justify-center fixed'>
        <Logo isIsoOnly={true} />
      </div>

      <div className="h-full flex-wrap gap-2 w-full sm:grid-cols-[45%_55%] sm:grid sm:items-center sm:justify-center">

        {/* Country Name and Flag */}
        <div className='fixed top-0 sm:left-0 border-b pt-20 sm:pt-0 w-screen sm:h-full text-nowrap flex-wrap sm:w-20 sm:border-b-0 sm:border-r
          dark:bg-slate-950 bg-slate-300 dark:text-slate-500 text-slate-700
          sm:border-amber-800 border-b-amber-800 dark:sm:border-amber-500 dark:border-b-amber-500'>
          <aside className='sm:h-full sm:absolute'>
            <h2 className='font-extrabold text-[1em] overflow-x-visible flex items-center
            justify-center  relative top-1/2
              sm:text-nowrap sm:w-10 sm:h-10 sm:left-2 my-auto mx-auto sm:py-0 sm:px-0 sm:rotate-[-90deg]
              text-wrap py-2 px-2'>
              {currentCountry.name}
            </h2>

            {/* Country flag */}
            <img
              title={`Flag of ${currentCountry.name}`}
              onClick={() => setShowPopUp(true)}
              className='rounded cursor-pointer sm:ml-4 sm:mr-auto sm:w-8 object-fit max-h-5 fixed
              sm:relative top-15 left-1/2 translate-x-[-1em] sm:left-0 sm:top-12 sm:translate-x-0 w-8'
              src={currentCountry.flag} alt={`${currentCountry.code}`} />
          </aside>
        </div>

        {/* REST Countries data */}
        <aside className="space-y-2 mt-40 sm:mt-0 sm:ml-32 flex-col flex items-center">
          <Table header1="Continents" footer1={currentCountry.continents.join(', ')} />
          <Table header1="Area" footer1={`${currentCountry.area.toLocaleString('de-DE')} km\u00B2`} />
          <Table header1="Population" footer1={currentCountry.population.toLocaleString('de-DE')} />
          <Table
            header1={currentCountry.timezones.length === 1 ? 'Timezone' : 'Timezones'}
            footer1={currentCountry.timezones.map((tz, i) => <p key={i}>{tz}</p>)}
          />

          {/* Buttons for Markers, User Location, and Radio */}
          <div className='flex gap-6 mt-6 items-center justify-center'>
            {currentCountry && !isMarkedAlreadyComparisson(currentCountry) && isLoggedIn &&
              <Button
                buttonText={<i className="bi bi-star" />}
                buttonName="Mark"
                ratio="text-center px-2 text-xs w-8 mb-10"
                title={'Add ' + currentCountry.name + ' to Markers'}
                action={() => addToMarkers(currentCountry)}
              />}

            {currentCountry && isLoggedIn && currentCountry.code !== markers[0]?.countryCode && isMarkedAlreadyComparisson(currentCountry) &&
              <Button
                buttonText={<i className="bi bi-star-fill" />}
                buttonName="Unmark"
                ratio="text-center px-2 text-xs w-8 mb-10"
                title={'Remove ' + currentCountry.name + ' from Markers'}
                action={() => removeFromMarkers(currentCountry)}
              />}

            {currentCountry && isLoggedIn && currentCountry.code === markers[0]?.countryCode &&
              <Button
                buttonText={<i className="bi bi-star-fill" />}
                buttonName="Default"
                ratio="text-center px-2 text-xs w-8 mb-10
                  bg-slate-800/0 dark:bg-slate-800/0 hover:bg-slate-800/0 dark:hover:bg-slate-800/0"
                title={`${currentCountry.name} is your User location`}
              />}

            <Button
              buttonText={<i className="bi bi-music-note-list" />}
              buttonName="Radio"
              ratio="text-center px-2 text-xs w-8 mb-10"
              title={'Fetch Radios of ' + currentCountry.name}
              action={() => console.log('radio: ', currentCountry.name)}
            />
          </div>
        </aside>

        {/* Capital Images */}
        <aside className='w-[300px] pb-10 sm:pb-0 mx-auto sm:ml-0'>

          {currentCountry?.capitals.map((capital) => (
            <CountryCapitalImage
              capital={capital} key={capital}
              code={code} />
          ))}

          {/* Borders */}
          {currentCountry.borders && currentCountry.borders.length > 0 &&
            <main className='text-xs my-4'>
              <p className='text-amber-950 dark:text-amber-400'>Borders</p>
              <div className='pb-2 border dark:border-slate-700 border-slate-500
            rounded-md flex flex-wrap my-auto justify-center gap-1
            max-h-[14vh] overflow-hidden overflow-y-scroll'>
              {currentCountry.borders.map(b => (
                <Button
                  ratio={'w-10'}
                  key={b}
                  buttonText={b}
                  title={`Go to: ${b} (${currentCountry.code}'s neighboring country)`}
                  action={() => navigate(`/countries/${b}`)}
                />
              ))
              }
              </div>
            </main>
          }

        </aside>

      </div>

      {/* Pop-up for flag */}
      {showPopUp &&
        <PopUpImage
          imageTag={'Flag of ' + currentCountry.name}
          image={currentCountry.flag}
        />
      }
    </main>
  );
};

export default CountryHub;
