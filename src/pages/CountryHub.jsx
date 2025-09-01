import PopUpImage from '../component/particle/molecule/PopUpImage';
import Loading from '../component/particle/molecule/Loading';
import { UseUi } from '../hook/UseUi';
import { useParams, useNavigate } from 'react-router';
import { UseWorld } from '../hook/UseWorld';
import { useEffect, useState } from 'react';
import { UseNotification } from '../hook/UseNotification';
import { UseFetchStatus } from '../hook/UseFetchStatus';
import { UseRadio } from '../hook/UseRadio';
import HubButtons from '../component/particle/HubButtons'
import CountryData from '../component/CountryData';
import RadioList from '../component/RadioList';
import HubHeader from '../component/HubHeader';
import CountryApi from '../api/CountryApi';
import RadioApi from '../api/RadioApi';

const CountryHub = ({ openRadio }) => {
  const [isRadioOpen, setIsRadioOpen] = useState(openRadio ? true : false)

  const { code } = useParams();
  const navigate = useNavigate();
  const { countries, setCurrentCountry, currentCountry } = UseWorld();
  const { setCurrentRadios, radioPager, setRadioPager } = UseRadio();
  const { isMenuOpen, showPopUp } = UseUi();
  const { getStatus, runFetch } = UseFetchStatus();
  const { notify } = UseNotification();

  // --- Fetch country ---
  useEffect(() => {
    if (!code) return;

    const fetchCountry = async () => {
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
        await runFetch(
          `country-${code}`,
          () => CountryApi.byCode(code),
          (res) => setCurrentCountry(res.data)
        );
      }
    };
    fetchCountry();
  }, [code, countries, runFetch, getStatus, setCurrentCountry, notify]);

  // --- Fetch radios ---
  useEffect(() => {
    if (!code || !isRadioOpen) return;

    const fetchRadio = async () => {
      notify({ id: 'loading-radio', notificationTag: `${code}'s radio`, duration: 2000 });
      const res = await RadioApi.browseByCountryPage(code, radioPager.page);
      const pager = res.data;
      setCurrentRadios(res.data.results);
      setRadioPager({
        page: pager.page,
        previousPage: pager.previousPage,
        nextPage: pager.nextPage
      });
    };
    fetchRadio();
  }, [code, isRadioOpen, radioPager.page]);


  if (!currentCountry) {
    return (
      <main className="text-center h-screen flex w-screen items-center justify-center">
        <Loading />
      </main>
    );
  }

  return (
    <main className={`
      ${isMenuOpen ? "hidden" : ""}
      text-center min-h-screen w-screen overflow-y-scroll flex pt-15 sm:pt-0 gap-4
    `}>
        <HubHeader />
        <header className='fixed top-20 z-100 w-full pl-4 sm:pl-27 pr-4'>
          <HubButtons setIsRadioOpen={setIsRadioOpen} isRadioOpen={isRadioOpen} />
        </header>
      <div className="flex flex-col flex-1 items-center mt-38 sm:ml-20 justify-start">

        {!isRadioOpen ? (

          <CountryData setIsRadioOpen={setIsRadioOpen} />
        ) : (
          <RadioList setIsRadioOpen={setIsRadioOpen} />
        )}
      </div>

      {showPopUp && <PopUpImage imageTag={`Flag of ${currentCountry.name}`} image={currentCountry.flag} />}
    </main>
  );
}

export default CountryHub;
