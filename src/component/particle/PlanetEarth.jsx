import WorldMap from "./molecule/WorldMap";
import { motion } from "framer-motion";
import Button from "./molecule/Button";

const PlanetEarth = ({
  setIsSearchModeSet,
  selectedContinent,
  hoveredCountries,
  continents,
  getFillClass,
  previousStage,
  uiStage,
  stages
}) => {

  const isLoopingStage = () => {
    const currentStage = stages[uiStage]?.name;
    const initialStage = stages[0]?.name;
    const zoomingOut = hoveredCountries.length === 0;
    const noContinent = selectedContinent === null;

    if (currentStage === 'Continent') return true
    if (initialStage === 'Country' && zoomingOut) return true
    if (initialStage === 'Language' && currentStage === 'Language' && zoomingOut) return true
    if (initialStage === 'Language' && currentStage === 'Country' && zoomingOut) return true
    if (initialStage === 'Country' && noContinent) return true
  }

  const shouldRepeatMap = () => {
    const currentStage = stages[uiStage]?.name;
    const initialStage = stages[0]?.name;
    const zoomingOut = hoveredCountries.length === 0;

    if (initialStage === 'Country' && currentStage === 'Country' && zoomingOut) return true
    if (initialStage === 'Language' && currentStage === 'Language' && zoomingOut) return true
    if (initialStage === 'Language' && currentStage === 'Country' && zoomingOut) return true
    if (initialStage === 'Continent' && currentStage === 'Continent') return true
  }

  return (
    <main>
      <div className={`
        bg-radial from-indigo-950 to-slate-950/90
        border border-slate-950/25
        relative w-74 h-74 flex items-start justify-center overflow-hidden
      ${isLoopingStage() ? 'rounded-full rotate-[-12deg]' : 'border-slate-800'}`}>

        <motion.main
          key={isLoopingStage() ? 'loop' : 'static'} //Fuerza reinicio
          initial={{ x: -180 }}
          animate={{
            x: isLoopingStage()
                ? -652 // Loop infinito
                : (selectedContinent === continents[0]?.name)
                  ? -240 // Africa
                  : selectedContinent === continents[1]?.name
                    ? -392 // Asia
                    : selectedContinent === continents[2]?.name
                      ? -250 // Europe
                      : selectedContinent === continents[3]?.name
                        ? -140 // North America
                        : selectedContinent === continents[4]?.name
                          ? -395 // Oceania
                          : -130, // South America
          }}
          transition={{
            duration: isLoopingStage() ? 30 : 3,
            ease: isLoopingStage() ? "linear" : "easeOut",
            repeat: isLoopingStage() ? Infinity : 0,
            repeatType: "loop",
          }}
        >

          <aside className={`
            absolute left-0 w-124 h-74
            ${stages[uiStage]?.name === 'Continent'
              || selectedContinent === null
              ? ''
              : selectedContinent === continents[0]?.name ? 'scale-240 top-[-160px]' //Africa
                : selectedContinent === continents[1]?.name ? 'scale-140 top-5' //Asia
                  : selectedContinent === continents[2]?.name ? 'scale-200 top-23' //Europe
                    : selectedContinent === continents[3]?.name ? 'scale-160 left-35 top-10' //North America
                      : selectedContinent === continents[4]?.name ? 'scale-250 top-[-210px] left-[-270px]' //Oceania
                        : 'scale-250 top-[-240px] left-40' //South America
            }`}>
            <WorldMap
              getFillClass={getFillClass}
              hoveredCountries={hoveredCountries}
            />
          </aside>
          <aside className={`
            absolute left-118 w-124 h-74
            ${shouldRepeatMap() ? '' : 'hidden'}`}>
            <WorldMap
              getFillClass={getFillClass}
              hoveredCountries={hoveredCountries}
            />
          </aside>
        </motion.main>
      </div>

      {
        uiStage !== 0
        && <Button
          ratio={'w-8 absolute md:translate-x-66'}
          title={`Back to ${stages[uiStage -1]?.name} Selector`}
          buttonText={<i className='bi-caret-left' />}
          buttonName={`${stages[uiStage -1]?.name} Selector`}
          action={() => previousStage()}
        />
      }
      {
        uiStage === 0
        && <Button
          ratio={'w-8 absolute md:translate-x-66'}
          title={`Toggle Search Mode`}
          buttonText={<i className='bi-caret-left' />}
          buttonName={`Search Mode`}
          action={() => setIsSearchModeSet(false)}
        />
      }
    </main >
  );
}

export default PlanetEarth