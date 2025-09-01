import { UseRadio } from '../../hook/UseRadio'
import { UseUser } from '../../hook/UseUser'
import Button from './molecule/Button'

const RadioItem = ({ radio = null, allowMarking = true }) => {

    const {
        setCurrentRadio,
        setIsRadioDisplayed,
        toggleRadioMarker,
        isRadioMarked
    } = UseRadio()

    const { isLoggedIn } = UseUser()

    return (
        <main className="dark:bg-slate-800 bg-slate-300 w-full md:w-10/21 rounded flex flex-col p-1">

            {/* NAME */}
            <header className="text-xs font-semibold dark:bg-slate-950/30 bg-slate-100/40 p-2 text-center w-full truncate">
                {radio.name}
            </header>

            <aside className="w-full p-2 rounded flex items-end justify-end gap-1">

                {/* TAGS */}
                {radio.tags && radio.tags.length !== 0 &&
                    <div className="flex gap-2 w-full flex-wrap items-end justify-start h-12 truncate overflow-ellipsis mb-1">
                        {radio.tags.map((tag) => (
                            <p key={tag} className="px-2 text-xs dark:text-amber-400 text-amber-900">
                                {tag}
                            </p>
                        ))}
                    </div>
                }

                {isLoggedIn && allowMarking &&
                    <Button
                        buttonText={
                            isRadioMarked(radio)
                                ? <i className="bi bi-star-fill text-amber-500" />
                                : <i className="bi bi-star" />
                        }
                        title={isRadioMarked(radio) ? "Unmark as favourite" : "Mark as favourite"}
                        buttonName={`${isRadioMarked(radio) ? 'Clear' : 'Mark'}`}
                        ratio="mb-5"
                        action={() => {
                            if (isRadioMarked(radio)) {
                                const confirmed = window.confirm("Are you sure you want to remove this favourite?");
                                if (!confirmed) return;
                            }
                            toggleRadioMarker(radio);
                        }}
                    />
                }

                <Button
                    buttonText={<i className="bi bi-play" />}
                    title={`Play ${radio.name}`}
                    buttonName="Play"
                    ratio="mb-5"
                    action={() => {
                        setCurrentRadio(radio)
                        setIsRadioDisplayed(true)
                    }}
                />
            </aside>

            <main className="flex flex-col justify-end translate-y-[-.2rem] gap-1 mx-2 items-end">
                <header className="text-xs w-full justify-center italic pb-1 text-center">
                    <p className="px-1 py-1 dark:bg-slate-950/20 dark:text-slate-400 bg-slate-200/50 text-slate-700 p-2 text-center truncate w-full rounded-full">
                        {radio.state ? radio.state : '...'}
                    </p>
                </header>
            </main>
        </main>
    )
}

export default RadioItem
