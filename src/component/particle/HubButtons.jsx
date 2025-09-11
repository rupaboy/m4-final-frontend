import { UseWorld } from "../../hook/UseWorld";
import { UseRadio } from "../../hook/UseRadio";
import Button from "./molecule/Button";
import { useEffect } from "react";

const HubButtons = ({ setIsRadioOpen, isRadioOpen }) => {

    const { setRadioPager, radioPager, areRadiosFiltered } = UseRadio();
    const { currentCountry } = UseWorld();

    const goToPage = (page) => {
        if (!page) return;
        setRadioPager(prev => ({
            ...prev,
            page
        }));
    };

    useEffect(() => {
        setRadioPager({
            nextPage: null,
            page: 1,
            previousPage: null
        })
    }, [currentCountry])

    return (
        <div className="flex gap-6 items-center w-full z-99">
            {!isRadioOpen && (
                <Button
                    buttonText={<i className="bi bi-music-note-list" />}
                    buttonName="Radio"
                    ratio="text-center text-xs w-8 mb-10"
                    title={`Fetch Radios of ${currentCountry.name}`}
                    action={() => setIsRadioOpen(true)}
                />
            )}

            {isRadioOpen && !areRadiosFiltered && (
                <div className="flex justify-between items-center w-full">
                    <Button
                        buttonText={<i className="bi bi-list" />}
                        buttonName="Data"
                        ratio="text-center text-xs w-8 mb-10"
                        title={`Fetch Data of ${currentCountry.name}`}
                        action={() => setIsRadioOpen(false)}
                    />

                    <div className="flex gap-4 w-full justify-end pr-8 sm:pr-31">
                        {radioPager.previousPage && (
                            <Button
                                buttonText={<i className="bi bi-arrow-left" />}
                                buttonName={`#${radioPager.previousPage}`}
                                ratio="text-center px-2 text-xs w-8 mb-10"
                                title="Previous page"
                                action={() => goToPage(radioPager.previousPage)}
                            />
                        )}

                        {radioPager.nextPage && (
                            <Button
                                buttonText={<i className="bi bi-arrow-right" />}
                                buttonName={`#${radioPager.nextPage}`}
                                ratio="text-center px-2 text-xs w-8 mb-10"
                                title="Next page"
                                action={() => goToPage(radioPager.nextPage)}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HubButtons;