const Bubble = ({ name, action, hover, unhover, stages = 'Country', uiStage, flag = null }) => {
    return (
        <main
            onClick={action}
            onMouseEnter={hover}
            onMouseLeave={unhover}
            className={`
                dark:hover:bg-slate-500/30 dark:bg-slate-700/30 dark:hover:text-amber-500
                hover:bg-slate-100/40 bg-slate-200/25 hover:text-amber-800
                outline-slate-400/40 dark:outline-slate-950/40
                items-center grid my-auto py-1 min-h-9 select-none cursor-pointer
                min-w-0 w-[11em] h-[3em] rounded-sm px-2 outline
                ${stages[uiStage]?.name === 'Language' && 'justify-center'}
                ${stages[uiStage]?.name === 'Country' && 'justify-start'}
                ${stages[uiStage]?.name === 'Continent' && 'justify-center'}
            `}
        >
            <button
                className={`
                    flex gap-2 ml-auto items-center overflow-hidden min-w-0
                    ${stages[uiStage]?.name === 'Language' && 'w-full'}
                    ${stages[uiStage]?.name === 'Country' && 'w-full'}
                `}
            >
                {stages[uiStage]?.name === 'Continent' && name}

                {stages[uiStage]?.name === 'Language' && (
                    <span
                        className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
                    >
                        {name}
                    </span>
                )}

                {stages[uiStage]?.name === 'Country' && (
                    <>
                        <div className="h-4 w-4 rounded-full overflow-hidden border border-slate-900/30 shrink-0">
                            <img
                                src={flag}
                                className="h-4 w-full object-cover"
                            />
                        </div>
                        <span
                            className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap"
                        >
                            {name}
                        </span>
                    </>
                )}
            </button>
        </main>
    );
};

export default Bubble;
