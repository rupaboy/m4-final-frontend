import { useState, useRef, useEffect } from "react";
import { UseRadio } from "../hook/UseRadio";
import { useNavigate } from "react-router";
import RadioItem from "./particle/RadioItem";
import Button from './particle/molecule/Button'

const RadioMarkerList = () => {
  const [openCountry, setOpenCountry] = useState(null);
  const { radioMarkers } = UseRadio();
  const containerRef = useRef(null);
  const navigate = useNavigate()

  // cerrar al hacer click afuera
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpenCountry(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // agrupar por countryCode
  const groupedByCountry = radioMarkers?.reduce((acc, radio) => {
    if (!acc[radio.countryCode]) acc[radio.countryCode] = [];
    acc[radio.countryCode].push(radio);
    return acc;
  }, {});

  return (
    <div ref={containerRef} className="flex flex-col max-w-[60vw] gap-1 w-full">
      {groupedByCountry &&
        Object.entries(groupedByCountry)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([countryCode, radios]) => {
            const isOpen = openCountry === countryCode;
            return (
              <div
                key={countryCode}
                className={`rounded-md dark:bg-slate-800 max-h-90 overflow-y-scroll flex flex-col`}
              >
                <button
                  onClick={() =>
                    setOpenCountry(isOpen ? null : countryCode)
                  }
                  className={`
                   bg-slate-300 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700
                  w-full text-center font-bold sticky top-0 z-10 shadow-xl min-h-8 grid items-center
                  `}
                >
                  {countryCode}
                </button>                
                  <Button
                    action={() => {
                      navigate(`/country/radio/${countryCode}`);
                    }}
                    buttonText={<i className="bi bi-globe-americas" />}
                    ratio="w-8 px-1 justify-center flex items-center gap-1 absolute z-10 translate-y-[-8px] bg-slate-300/0 dark:bg-slate-950/0"
                    title={`${countryCode}'s radios`}
                  />
                {isOpen && (
                  <div className="flex flex-wrap justify-evenly p-1 gap-1 dark:bg-slate-950/30 bg-slate-400/30">
                    {radios
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map((radio) => (
                        <RadioItem key={radio._id} radio={radio} />
                      ))}
                  </div>
                )}
              </div>

            );
          })}
    </div>
  );
};

export default RadioMarkerList;
