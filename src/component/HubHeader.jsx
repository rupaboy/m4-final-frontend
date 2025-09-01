import { UseWorld } from "../hook/UseWorld"
import { UseUi } from "../hook/UseUi";

const HubHeader = () => {
    const { setShowPopUp } = UseUi();
    const { currentCountry } = UseWorld()

    return (
        <div
            className="fixed top-0 sm:left-0 border-b pt-15 sm:pt-0 w-screen sm:w-20 sm:h-full h-37
        dark:bg-slate-950 bg-slate-300 dark:text-slate-500 text-slate-700 z-99
        sm:border-r sm:border-b-0 border-b-amber-800 sm:border-amber-800 dark:border-b-amber-500 dark:sm:border-amber-500"
        >
            <aside className="sm:h-full sm:absolute flex sm:flex-col flex-col-reverse">
                <h2
                    className="text-center sm:w-25 font-extrabold text-[1em] flex items-center justify-center relative top-1/2 
              sm:rotate-[-90deg] py-2 px-2 sm:right-4 text-nowrap"
                >
                    {currentCountry.name}
                </h2>
                <img
                    title={`Flag of ${currentCountry.name}`}
                    onClick={() => setShowPopUp(true)}
                    className="rounded cursor-pointer w-8 mx-auto sm:ml-4 mt-0 sm:mt-12"
                    src={currentCountry.flag}
                    alt={currentCountry.code}
                />
            </aside>
        </div>
    )
}

export default HubHeader