import { useState, useEffect } from 'react';
import { UseRadio } from '../../../hook/UseRadio';
import { useParams } from 'react-router';
import Button from './Button';

const FilterBar = ({ setIsRadioOpen }) => {
  const [query, setQuery] = useState('');
  const { code } = useParams();

  const {
    filterRadiosByName,
    fetchRadiosByCountry,
    setAreRadiosFiltered,
    areRadiosFiltered
  } = UseRadio();

  // Limpiar estado cuando cambia el país
  useEffect(() => {
    setQuery('');
    setAreRadiosFiltered(false);
  }, [code, setAreRadiosFiltered]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    if (query.trim()) {
      await filterRadiosByName(code, query.trim());
      setAreRadiosFiltered(true);
    }
  };

  const handleClear = async () => {
    setQuery('');
    setAreRadiosFiltered(false);
    await fetchRadiosByCountry(code, 1); // Recarga lista original desde la página 1
  };

  return (
    <div className="flex flex-col items-center w-full px-2">
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          placeholder={`Some ${code}'s station's name`}
          onChange={handleChange}
          className="border p-2 mt-1 text-center rounded w-60 dark:bg-slate-950 bg-slate-200"
        />
        <Button
          buttonText={<i className="bi-search" />}
          title="Search Station"
          action={handleSearch}
        />
        {areRadiosFiltered && (
          <Button
            buttonText={<i className="bi-x-circle" />}
            title="Close Filter"
            action={handleClear}
          />
        )}
      </div>
    </div>
  );
};

export default FilterBar;
