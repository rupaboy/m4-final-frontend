import { useEffect } from "react";
import { UseUi } from "../../../hook/UseUi";
import Button from "./Button";

const PopUpImage = ({ ratio = 'dark:bg-slate-950/96 bg-slate-200/90', image, imageTag }) => {

  const {
    setShowPopUp,
    position,
    handleMousePosition,
    setZoom,
    zoom,
  } = UseUi();

  // Cerrar con Esc
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setShowPopUp(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setShowPopUp]);

  // Bloquear scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const closePopUp = () => setShowPopUp(false);

  return (
    <main
      className={`${ratio}
      pt-14 w-screen gap-2 h-screen flex flex-col
      justify-center fixed inset-0 items-center`}
      onClick={closePopUp} // click fuera cierra
    >
      <div
        className="inline-block w-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()} // click dentro no cierra
        onMouseMove={handleMousePosition}
      >
        <img
          onClick={() => setZoom((prev => !prev))}
          src={image}
          alt="PopUp"
          className={`${zoom ? 'cursor-zoom-out max-w-[90vw] max-h-[100vh]' :'max-w-[60vw] max-h-[60vh] cursor-zoom-in'}
            hover:overflow-hidden duration-200 transition-transform mx-auto`}
          style={{
            transform: zoom ? `scale(5)` : `scale(1)`, //ZOOM LEVEL IS HERE
            transformOrigin: `${position.x}% ${position.y}%`
          }}
        />
      </div>
      <aside className="flex gap-3 items-center">
        <Button
          buttonText={<i className="bi bi-x" />}
          ratio={'px-1'}
          action={closePopUp}
        />
        <h4 className="text-sm mt-2 text-center">{imageTag}</h4>
      </aside>
    </main>
  );
};

export default PopUpImage;
