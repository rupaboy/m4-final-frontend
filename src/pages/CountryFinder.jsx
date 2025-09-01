import { useEffect, useState } from "react";
import PlanetEarth from "../component/particle/PlanetEarth";
import { UseNotification } from "../hook/UseNotification";
import { useNavigate } from "react-router";
import { UseWorld } from '../hook/UseWorld';
import { UseUser } from "../hook/UseUser";
import { UseUi } from "../hook/UseUi";
import Loading from "../component/particle/molecule/Loading";
import MenuFinder from "../component/particle/molecule/MenuFinder";
import Bubble from "../component/particle/molecule/Bubble";
import Table from "../component/particle/molecule/Table";
import SearchBar from "../component/particle/molecule/SearchBar";
import NoCountries from "../component/particle/molecule/NoCountries";
import Logo from '../component/particle/Logo'

const CountryFinder = () => {

  const {
    stages,
    uiStage,
    continents,
    countries,
    nextStage,
    previousStage,
    selectedContinent,
    countryContinentalFilterRemoval,
    countriesInContinent,
    selectedLanguages,
    selectedCountries,
    countryContinentalFilter,
    continentalFilter,
    extractPopulation,
    extractArea,
    extractLanguages,
    languagesFilter,
    hoveredLanguages,
    languageHover,
    languageUiName,
    setLanguageUiName,
    countryHover,
    hoveredCountries,
    getFillClass,
    retryFetchCountries,
    isLoading,
    hasError,
  } = UseWorld()

  const navigate = useNavigate()

  const [isSearchModeSet, setIsSearchModeSet] = useState(false)

  const { isLoggedIn } = UseUser()
  const { isMenuOpen, setIsMenuOpen } = UseUi()
  const { notify } = UseNotification()

  useEffect(() => {
    {
      isSearchModeSet &&
        notify({
          id: 'tip',
          notificationTag: 'Tap/Click | Hold/Hover',
          withProgress: false,
          duration: 5000,
        })
    }
  }, [isSearchModeSet])

  return (

    <main className={`${isMenuOpen ? 'hidden' : 'overflow-y-scroll h-auto min-h-screen md:flex md:items-center'}`}>

      {isLoading &&
        <div className="absolute top-1/3 left-1/2 translate-x-[-1rem]">
          <Loading />
        </div>
      }

      {countries.length === 0 && hasError && !isLoading &&
        <NoCountries
          retryFetchCountries={retryFetchCountries}
          setIsMenuOpen={setIsMenuOpen}
          isLoggedIn={isLoggedIn}
        />
      }

      {!isSearchModeSet && countries.length !== 0 &&
        <div className='mt-20 pb-15 w-screen flex flex-col items-center justify-center'>
          <h4 className="text-center text-xs mb-4">Name Search</h4>
          <SearchBar />

          <h4 className="text-center text-xs mb-4">Country Finder</h4>
          <MenuFinder
            setIsSearchModeSet={setIsSearchModeSet}
          />
        </div>
      }

      {isSearchModeSet && <div className="h-full md:ml-13 mt-10 md:mt-0 items-center justify-center
    flex flex-col md:flex-row">

        {
          <PlanetEarth
            setIsSearchModeSet={setIsSearchModeSet}
            stages={stages}
            uiStage={uiStage}
            getFillClass={getFillClass}
            hoveredCountries={hoveredCountries}
            previousStage={previousStage}
            continents={continents}
            selectedContinent={selectedContinent}
            selectedCountries={selectedCountries}
          />
        }

        <div className='
      z-100 overflow-y-scroll overflow-x-hidden min-h-35 w-53 text-center
      justify-center flex flex-wrap flex-col items-center min-w-53'>

          {(() => { //Continents descriptions 
            if (stages[uiStage]?.name === 'Continent' && selectedContinent !== null) {
              return (
                <Table
                  title={selectedContinent}
                  header1={'Countries'}
                  footer1={selectedCountries.length}
                  header2={'Languages'}
                  footer2={selectedLanguages.length}
                  header3={'Population'}
                  footer3={extractPopulation(selectedCountries).toLocaleString('de-DE')}
                />
              )
            }

            if (stages[uiStage]?.name === 'Language' && stages[0]?.name !== 'Language' && hoveredLanguages.length !== 0) {
              return ( //Languages descriptions 
                <Table
                  title={languageUiName}
                  header1={'Countries'}
                  footer1={hoveredLanguages.length}
                  header2={'in'}
                  footer2={selectedContinent}
                  header3={`${hoveredLanguages.length === 1 ? 'Population' : 'Total Population'}`}
                  footer3={extractPopulation(hoveredLanguages).toLocaleString('de-DE')}
                />
              )
            }

            if (stages[uiStage]?.name === 'Language' && stages[0]?.name === 'Language' && hoveredLanguages.length !== 0) {
              return ( //Languages descriptions 
                <Table
                  title={languageUiName}
                  header1={hoveredLanguages.length !== 1 ? 'Countries' : ''}
                  footer1={hoveredLanguages.length !== 1 ? hoveredLanguages.length : hoveredLanguages[0].name}
                  header2={hoveredLanguages.length !== 1 ? 'Speak' : 'Speaks'}
                  footer2={languageUiName}
                  header3={'in'}
                  footer3={
                    ((continents =>
                      continents.length === 1
                        ? `${continents[0]}`
                        : `${continents.length} continents`
                    )([...new Set(hoveredLanguages.map(c => c.continents).flat())]))
                  }
                />
              )
            }

            if (stages[uiStage]?.name === 'Country' && hoveredCountries.length !== 0 && countries) {
              return ( //Countries descriptions 
                <Table
                  title={hoveredCountries[0].name}
                  header1={'Capital'}
                  footer1={hoveredCountries[0].capitals}
                  header3={'Population'}
                  footer3={hoveredCountries[0].population.toLocaleString('de-DE')}
                  header4={'Area'}
                  footer4={extractArea(hoveredCountries).toLocaleString('de-DE') + ' km\u00B2'}
                />
              )
            }

            if (stages[uiStage]?.name === 'Continent') {
              return ( //Continents UI Guides
                <Table
                  title={stages[uiStage].description}
                  header1={'Countries'}
                  footer1={countries.length}
                  header2={'Languages'}
                  footer2={extractLanguages(countries).length}
                  header3={'Total Population'}
                  footer3={extractPopulation(countries).toLocaleString('de-DE')}
                />
              )
            }

            if (stages[uiStage]?.name === 'Language' && stages[0]?.name !== 'Continent' && stages[0]?.name !== 'Language') {
              return ( //Country UI Guides
                <Table
                  title={stages[uiStage].description}
                  header1={`Countries`}
                  footer1={`${selectedCountries.length}`}
                  header2={'Speak'}
                  footer2={languageUiName}
                  header3={'in'}
                  footer3={selectedContinent}
                />
              )
            }


            if (stages[uiStage]?.name === 'Language' && stages[0]?.name !== 'Language') {
              return ( //Language by continent UI Guides
                <Table
                  title={stages[uiStage].description}
                  header1={'Languages'}
                  footer1={selectedLanguages.length}
                  header2={'Countries'}
                  footer2={countriesInContinent.length}
                  header3={'in'}
                  footer3={selectedContinent}
                />
              )
            }

            if (stages[0]?.name === 'Language' && stages[uiStage]?.name === 'Language') {
              return ( //Language without continental filters UI Guides
                <Table
                  title={stages[uiStage].description}
                  header1={'Languages'}
                  footer1={extractLanguages(countries).length}
                  header2={'Countries'}
                  footer2={countries.length}
                  header3={'Total Population'}
                  footer3={extractPopulation(countries).toLocaleString('de-DE')}
                />
              )
            }

            if (stages[uiStage]?.name === 'Country' && stages[0]?.name === 'Language') {
              return ( //Countries by Language without continental filters UI Guides
                <Table
                  title={stages[uiStage].description}
                  header1={'Countries'}
                  footer1={selectedCountries.length}
                  header2={'Speak'}
                  footer2={languageUiName}
                  header3={'Total Population'}
                  footer3={extractPopulation(selectedCountries).toLocaleString('de-DE')}
                />
              )
            }

            if (stages[uiStage]?.name === 'Country' && stages[0]?.name !== 'Language') {

              if (stages.some((stage) => stage.name === 'Language')) {
                return ( //Country UI Guides
                  <Table
                    title={stages[uiStage].description}
                    header1={`Countries`}
                    footer1={`${selectedCountries.length}`}
                    header2={'Speak'}
                    footer2={languageUiName}
                    header3={'in'}
                    footer3={selectedContinent}
                  />
                )
              }

              if (stages[0]?.name === 'Country') {
                return ( //Country UI Guides ALL COUNTRIES
                  <Table
                    title={stages[uiStage].description}
                    header1={`Countries`}
                    footer1={`${selectedCountries?.length}`}
                    header2={'Languages'}
                    footer2={extractLanguages(countries).length}
                    header3={'Total Population'}
                    footer3={extractPopulation(countries).toLocaleString('de-DE')}

                  />
                )
              }

              if ((stages.some((stage) => stage.name !== 'Language')) && selectedCountries) {
                return ( //Country UI Guides WITHOUT LANGUAGE FILTER

                  <Table
                    title={stages[uiStage].description}
                    header1={'Countries'}
                    footer1={`${selectedCountries.length}`}
                    header2={'Languages'}
                    footer2={extractLanguages(selectedCountries).length}
                    header3={'in'}
                    footer3={selectedContinent}
                  />
                )
              }
            }

          })()}
        </div>

        <aside className={`
      text-xs gap-0.5 grid items-center
    my-auto font-black overflow-y-scroll pb-5`}>
          <div
            className={`md:pt-6 md:pb-6 mx-16 md:mx-0 md:mr-13
            flex flex-wrap md:h-auto md:max-h-screen max-h-64 text-nowrap
            overflow-y-scroll overflow-x-hidden items-center justify-center
          `}>

            {stages[uiStage]?.name === "Continent" && continents.length > 0 && (
              continents.map((continent) => (
                <Bubble
                  key={continent.id}
                  name={continent.name}
                  action={() => {
                    continentalFilter(continent.name)
                    nextStage()
                  }}
                  hover={() => {
                    continentalFilter(continent.name)
                  }}
                  unhover={() => {
                    continentalFilter(null)
                  }}
                  id={continent.id}
                  uiStage={uiStage}
                  stages={stages}
                />
              ))
            )}

            {
              stages[uiStage]?.name === 'Language'
              && stages[0]?.name === 'Continent'
              && selectedLanguages.map((language) => (
                <Bubble
                  key={language.id}
                  name={language.name}
                  id={language.id}
                  action={() => {
                    languagesFilter(language.name)
                    nextStage()
                  }}
                  hover={() => {
                    languageHover(language.name)
                    setLanguageUiName(language.name)
                  }}
                  unhover={() => {
                    continentalFilter(selectedContinent)
                    languageHover([])
                    setLanguageUiName(null)
                  }}
                  uiStage={uiStage}
                  stages={stages}
                />
              ))}

            {
              stages[0]?.name === 'Language'  // First Language Country Finder Stage
              && stages[uiStage]?.name === 'Language' &&

              extractLanguages(countries).map((language) => (
                <Bubble
                  key={language.id}
                  name={language.name}
                  id={language.id}
                  action={() => {
                    languagesFilter(language.name)
                    nextStage()
                  }}
                  hover={() => {
                    languageHover(language.name)
                    setLanguageUiName(language.name)
                  }}
                  unhover={() => {
                    languageHover([])
                    setLanguageUiName(null)
                  }}
                  uiStage={uiStage}
                  stages={stages}
                />
              ))}
            {
              stages[uiStage]?.name === 'Country'
              && stages[0]?.name === 'Language'  // Second Language Country Finder Stage

              && selectedCountries?.map((country) => (
                <Bubble
                  key={country.code}
                  name={country.name}
                  flag={country.flag}
                  action={() => {
                    navigate(`/country/${country.code}`)
                  }}
                  hover={() => {
                    countryHover(country.code)
                    countryContinentalFilter(country.continents[0])
                  }
                  }
                  unhover={() => {
                    if (selectedCountries.length !== 1) {
                      //Si selectedCountries es un array null o si es mayor a 1
                      countryHover(null)
                      countryContinentalFilterRemoval()
                    } else {
                      countryHover(country.code)
                    }

                  }}
                  uiStage={uiStage}
                  stages={stages}
                />
              ))}

            {stages[uiStage]?.name === 'Country' && stages[0]?.name !== 'Language'
              && selectedCountries?.map((country) => (
                <Bubble
                  key={country.code}
                  name={country.name}
                  flag={country.flag}
                  action={() => {
                    navigate(`/country/${country.code}`)
                  }}
                  hover={() => {
                    if (stages[0].name === 'Continent') {
                      countryHover(country.code)
                    } else {
                      countryContinentalFilter(country.continents[0])
                      countryHover(country.code)
                    }
                  }}
                  unhover={() => {
                    if (stages[0].name === 'Continent') {
                      selectedCountries.length !== 1 ? countryHover(null) : countryHover(country.code)
                    } else {
                      selectedCountries.length !== 1 ? countryHover(null) : countryHover(country.code)
                      countryContinentalFilterRemoval()
                    }
                  }}
                  uiStage={uiStage}
                  stages={stages}
                />
              ))}

          </div>

        </aside>
      </div>
      }
    </main>


  );
}

export default CountryFinder