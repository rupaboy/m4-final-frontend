import { useEffect, useRef } from 'react';
import RadioItem from './particle/RadioItem';
import { UseRadio } from "../hook/UseRadio";

const RadioList = () => {
    const { currentRadios } = UseRadio();
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = 0; //Scrolls top
        }
    }, [currentRadios]);

    return (
        <div
            ref={containerRef}
            className="border-t border-b rounded-md flex flex-wrap justify-center gap-2 
                max-h-110 overflow-y-scroll py-4 w-[80vw] px-4"
        >
            {currentRadios?.map((radio) => (
                <RadioItem key={radio.stationuuid} radio={radio} allowMarking={false} />
            ))}
        </div>
    );
}

export default RadioList;
