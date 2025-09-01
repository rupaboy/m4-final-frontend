import { useState, useRef, useEffect } from "react";
import { UseRadio } from "../hook/UseRadio";
import RadioItem from "./particle/RadioItem";

const RadioMarkerList = () => {
    const [openCountry, setOpenCountry] = useState(null);
    const { radioMarkers } = UseRadio();
    const containerRef = useRef(null);

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
        Object.entries(groupedByCountry).map(([countryCode, radios]) => {
          const isOpen = openCountry === countryCode;
          return (
            <div
              key={countryCode}
              className="rounded-md dark:bg-slate-800 max-h-90  overflow-y-scroll"
            >
              <button
                onClick={() =>
                  setOpenCountry(isOpen ? null : countryCode)
                }
                className={`
                   bg-slate-300 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700
                  w-full text-center font-bold py-1 sticky top-0 z-10
                  `}
              >
                {countryCode}
              </button>

              {isOpen && (
                <div className="flex flex-wrap justify-evenly p-1 gap-1 dark:bg-slate-950/30 bg-slate-400/30">
                  {radios.map((radio) => (
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
