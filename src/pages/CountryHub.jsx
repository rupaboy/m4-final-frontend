import PopUpImage from '../component/particle/molecule/PopUpImage';
import Loading from '../component/particle/molecule/Loading';
import { UseUi } from '../hook/UseUi';
import { useParams } from 'react-router';
import { UseWorld } from '../hook/UseWorld';
import { useEffect, useState } from 'react';
import { UseNotification } from '../hook/UseNotification';
import { UseFetchStatus } from '../hook/UseFetchStatus';
import { UseRadio } from '../hook/UseRadio';
import HubButtons from '../component/particle/HubButtons'
import FilterBar from '../component/particle/molecule/FilterBar';
import CountryData from '../component/CountryData';
import RadioList from '../component/RadioList';
import HubHeader from '../component/HubHeader';
import CountryApi from '../api/CountryApi';

const CountryHub = ({ openRadio }) => {
  const [isRadioOpen, setIsRadioOpen] = useState(!!openRadio);

  const { code } = useParams();
  const { countries, setCurrentCountry, currentCountry } = UseWorld();
  const { radioPager, fetchRadiosByCountry } = UseRadio();
  const { isMenuOpen, showPopUp } = UseUi();
  const { getStatus, runFetch } = UseFetchStatus();
  const { notify } = UseNotification();

useEffect(() => {
  if (!code) return;

  const fetchData = async () => {
    // --- Notificación y fetch de país ---
    if (getStatus('countries')?.dataLoaded) {
      notify({
        id: 'loading-country',
        notificationTag: `${code}: from cache`,
        duration: 2000,
        withProgress: false,
      });
      const found = countries.find(c => c.code === code);
      setCurrentCountry(found || null);
    } else {
      notify({
        id: 'loading-country',
        notificationTag: `${code}: single fetch`,
        duration: 3000,
      });
      await runFetch(
        `country-${code}`,
        () => CountryApi.byCode(code),
        (res) => setCurrentCountry(res.data),
      );
    }

    // --- Fetch de radios solo si el hub está abierto ---
    if (isRadioOpen) {
      notify({
        id: 'loading-radio',
        notificationTag: `${code}'s radio`,
        duration: 2000,
      });

      try {
        await fetchRadiosByCountry(code, radioPager.page);
      } catch (err) {
        notify({
          id: 'error-radio',
          notificationTag: `Error loading ${code}'s radios`,
          duration: 3000,
        });
      }
    }
  };

  fetchData();
}, [code, countries, runFetch, getStatus, setCurrentCountry, notify, isRadioOpen]);

  if (!currentCountry) {
    return (
      <main className="text-center h-screen flex w-screen items-center justify-center">
        <Loading />
      </main>
    );
  }

  return (
    <main className={`
      ${isMenuOpen ? 'hidden' : ''}
      text-center min-h-screen w-full overflow-y-scroll flex pt-15 sm:pt-0 gap-4 items-start justify-center
    `}>
      <HubHeader />

      <header className="fixed top-20 sm:left-27 left-4 w-full z-100">
        <HubButtons setIsRadioOpen={setIsRadioOpen} isRadioOpen={isRadioOpen} />
      </header>

      <div className="flex flex-col flex-1 items-center sm:ml-24 mt-38 justify-center">
        {!isRadioOpen ? (
          <CountryData setIsRadioOpen={setIsRadioOpen} />
        ) : (
          <>
            <FilterBar />
            <RadioList setIsRadioOpen={setIsRadioOpen} />
          </>
        )}
      </div>

      {showPopUp && (
        <PopUpImage
          imageTag={`Flag of ${currentCountry.name}`}
          image={currentCountry.flag}
        />
      )}
    </main>
  );
};

export default CountryHub;
