import { useEffect, useRef } from "react";
import { UseRadio } from "../../hook/UseRadio";
import { UseUser } from "../../hook/UseUser";
import { motion } from "framer-motion";
import Button from "./molecule/Button";
import { useNavigate } from "react-router";

export default function RadioPlayer() {
  const { currentRadio, setIsRadioDisplayed, isRadioDisplayed, isRadioMarked, removeRadioMarker } = UseRadio();
  const { isLoggedIn } = UseUser()
  const navigate = useNavigate();
  const containerRef = useRef(null);

  if (!currentRadio) return null;

  // Cerrar al hacer clic fuera de todo el contenedor (botón + panel)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsRadioDisplayed(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsRadioDisplayed]);

  return (
    <div ref={containerRef} className="w-full items-end flex mb-4">

      {/* BUTTON TOGGLE RADIO DISPLAY */}
      <Button
        action={() => setIsRadioDisplayed(!isRadioDisplayed)}
        buttonText={
          <motion.i
            className={isRadioDisplayed ? "bi bi-x" : "bi bi-soundwave"}
            animate={
              !isRadioDisplayed
                ? { opacity: [0.4, 1, 0.4] } // loop fade suave
                : {}
            }
            transition={
              !isRadioDisplayed
                ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
                : {}
            }
          />
        }
        buttonName={`${isRadioDisplayed ? "Hide" : "Radio"}`}
        ratio="translate-y-[-1rem] w-8"
        title={`${isRadioDisplayed ? "Hide Radio" : "Display Radio"}`}
      />

      <main
        className={`${isRadioDisplayed
          ? "dark:bg-slate-800 bg-slate-300 p-1 fixed left-15 rounded bottom-3 flex flex-col"
          : "hidden"
          }`}
      >
        <header>
          <audio src={currentRadio.url_resolved || currentRadio.url} controls autoPlay />
        </header>
        <div className="max-w-75">
          <h2 className="text-xs font-semibold dark:bg-slate-950 bg-slate-200 p-2 text-center truncate">
            {currentRadio.name}
          </h2>
        </div>
        <footer className="flex justify-end translate-y-[-.2rem] gap-1">
          <Button
            action={() => {
              navigate(`/country/radio/${currentRadio.countryCode}`);
              setIsRadioDisplayed(false);
            }}
            buttonText={<i className="bi bi-globe-americas" />}
            buttonName={`${currentRadio.countryCode}`}
            ratio="w-15 justify-start px-1 flex items-center gap-1"
            title="Go to country"
          />
          {isLoggedIn &&
                    <Button
                        buttonText={
                            isRadioMarked(currentRadio)
                                ? <i className="bi bi-star-fill text-amber-500" />
                                : <i className="bi bi-star" />
                        }
                        title={isRadioMarked(currentRadio) ? "Unmark as favourite" : "Mark as favourite"}
                        buttonName={`${isRadioMarked(currentRadio) ? 'Clear' : 'Mark'}`}
                        ratio="w-15 justify-start px-1 flex items-center gap-1"
                        action={() => {
                            if (isRadioMarked(currentRadio)) {
                                const confirmed = window.confirm("Are you sure you want to remove this favourite?");
                                if (!confirmed) return;
                            }
                            removeRadioMarker(currentRadio._id);
                        }}
                    />
          }
        </footer>
      </main>
    </div>
  );
}
