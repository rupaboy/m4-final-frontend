import { createContext, useState } from "react";
import RadioApi from '../api/RadioApi'
import { code } from "framer-motion/client";

const RadioContext = createContext(); //Contexto de Temas

export const RadioProvider = ({ children }) => {

  const [radioMarkers, setRadioMarkers] = useState([]);
  const [currentRadios, setCurrentRadios] = useState([])
  const [currentRadio, setCurrentRadio] = useState(null)
  const [isRadioDisplayed, setIsRadioDisplayed] = useState(false)
  const [areRadiosFiltered, setAreRadiosFiltered] = useState(false)
  const [radioPager, setRadioPager] = useState({
    nextPage: null,
    page: 1,
    previousPage: null
  })

  const fetchRadiosByCountry = async (code, page = 1) => {
    const res = await RadioApi.browseByCountryPage(code, page);
    const pager = res.data;
    const rawStations = res.data.results || [];
    const validStations = rawStations.filter(
      s => s.name.toLowerCase() !== "abdulbasit abdulsamad".toLowerCase()
        && s.url_resolved?.trim()
    );

    setCurrentRadios(validStations);
    setRadioPager({
      page: pager.page,
      previousPage: pager.previousPage,
      nextPage: pager.nextPage
    });
    setAreRadiosFiltered(false);
  };


  const searchRadiosByName = async (code, name) => {
    const res = await RadioApi.searchByRadioName(code, name, radioPager.page);
    const pager = res.data;

    const rawStations = res.data.results || [];
    const validStations = rawStations.filter(s => s.url_resolved?.trim());
    return {
      stations: validStations,
      pager: {
        page: pager.page,
        previousPage: pager.previousPage,
        nextPage: pager.nextPage
      }
    };
  };

  const filterRadiosByName = async (code, name) => {
    const { stations } = await searchRadiosByName(code, name);
    setAreRadiosFiltered(true);
    setCurrentRadios(stations);
  };

  const fetchUserRadioMarkers = async (userId) => {
    try {
      const res = await RadioApi.byUser(userId);
      setRadioMarkers(res.data); // set user markers if any
    } catch (err) {
      console.error("Error fetching user's radio markers", err);
    }
  };

  const addRadioMarker = async (radio) => {
    try {
      const payload = {
        stationuuid: radio.stationuuid,
        name: radio.name,
        tags: radio.tags,
        score: radio.score,
        url_resolved: radio.url_resolved,
        state: radio.state,
        countryCode: radio.countryCode
      };

      const res = await RadioApi.create(payload);
      setRadioMarkers((prev) => [...prev, res.data.marker]); // updates local collection
    } catch (err) {
      console.error("Error creating marker", err);
    }
  };

  const removeRadioMarker = async (radioMarkerId) => {
    try {
      await RadioApi.delete(radioMarkerId);
      setRadioMarkers((prev) => prev.filter(m => m._id !== radioMarkerId)); // remove from local collection
    } catch (err) {
      console.error("Error removing marker", err);
    }
  };

  const isRadioMarked = (radio) => {
    return radioMarkers.some(marker => marker.stationuuid === radio.stationuuid);
  };

  const toggleRadioMarker = async (radio) => {
    const existing = radioMarkers.find(m => m.stationuuid === radio.stationuuid);
    if (existing) {
      await removeRadioMarker(radio._id);
    } else {
      await addRadioMarker(radio);
    }
  };

  return (
    <RadioContext.Provider value={{
      currentRadio,
      setCurrentRadio,
      currentRadios,
      setCurrentRadios,
      fetchRadiosByCountry,
      filterRadiosByName,
      areRadiosFiltered,
      setAreRadiosFiltered,
      isRadioDisplayed,
      setIsRadioDisplayed,
      radioPager,
      setRadioPager,
      radioMarkers,
      setRadioMarkers,
      addRadioMarker,
      removeRadioMarker,
      fetchUserRadioMarkers,
      toggleRadioMarker,
      isRadioMarked,
    }}>
      {children}
    </RadioContext.Provider>

  );
};

export default RadioContext;