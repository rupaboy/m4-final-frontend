import { UseWorld } from '../../../hook/UseWorld';
import Button from './Button';

const MenuFinder = ({ setIsSearchModeSet }) => {

  const {
    resetFilters,
    countryFinder,
    continentCountryFinder,
    languageCountryFinder,
    continentLanguageCountryFinder
  } = UseWorld()

  return (
    <div className={`${'grid grid-cols-2 gap-10 md:flex items-center justify-center'}`}>

      <Button
        buttonText={<i className='bi-globe-americas' />}
        title={`Find Country By Continent`}
        ratio={'w-20 md:mb-22'}
        buttonName={'By Continent'}
        action={() => {
          resetFilters()
          continentCountryFinder()
          setIsSearchModeSet(true)
        }}
      />

      <Button
        buttonText={<i className='bi-globe' />}
        title={`Find Country By Continent > Language`}
        ratio={'w-20 md:mb-22'}
        buttonName={'By Continent/Language'}
        action={() => {
          resetFilters()
          continentLanguageCountryFinder()
          setIsSearchModeSet(true)
        }}
      />

      <Button
        buttonText={<i className='bi-translate' />}
        title={`Find Country By Language`}
        ratio={'w-20 md:mb-22'}
        buttonName={'By Language'}
        action={() => {
          resetFilters()
          languageCountryFinder()
          setIsSearchModeSet(true)
        }}
      />

      <Button
        buttonText={<i className='bi-alphabet-uppercase' />}
        title={`Find Country By Name`}
        ratio={'w-20 md:mb-22'}
        buttonName={'List All'}
        action={() => {
          resetFilters()
          countryFinder()
          setIsSearchModeSet(true)
        }}
      />
    </div>
  )
}

export default MenuFinder