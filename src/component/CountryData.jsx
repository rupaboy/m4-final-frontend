import { UseWorld } from '../hook/UseWorld';
import { useNavigate } from 'react-router';
import CountryCapitalImage from '../component/CountryCapitalImage'
import Button from './particle/molecule/Button';
import Table from './particle/molecule/Table';

const CountryData = () => {

  const { currentCountry } = UseWorld();
  const navigate = useNavigate();

  return (
    <main className='flex sm:flex-row flex-col justify-evenly w-full items-center gap-8 p-4'>
      {/* RESTCountries */}
      <aside className="space-y-2 flex flex-col items-center">
        <Table header1="Continents" footer1={currentCountry.continents.join(", ")} />
        <Table header1="Area" footer1={`${currentCountry.area.toLocaleString("de-DE")} km\u00B2`} />
        <Table header1="Population" footer1={currentCountry.population.toLocaleString("de-DE")} />
        <Table
          header1={currentCountry.timezones.length === 1 ? "Timezone" : "Timezones"}
          footer1={currentCountry.timezones.map((tz, i) => (
            <p key={i}>{tz}</p>
          ))}
        />
      </aside>

      {/* Capitals & borders */}
      <aside className="max-w-[300px]">
        {currentCountry.capitals.map((capital) => (
          <CountryCapitalImage key={capital} capital={capital} code={currentCountry.code} />
        ))}

        {currentCountry.borders?.length > 0 && (
          <div className="text-xs my-4">
            <p className="text-amber-950 dark:text-amber-400">Borders</p>
            <div className="pb-2 border rounded-md flex flex-wrap justify-center gap-1 max-h-[14vh] overflow-y-scroll">
              {currentCountry.borders.map((b) => (
                <Button
                  key={b}
                  ratio="w-10"
                  buttonText={b}
                  title={`Go to: ${b}`}
                  action={() => navigate(`/country/${b}`)}
                />
              ))}
            </div>
          </div>
        )}
      </aside>
    </main>
  )
}

export default CountryData