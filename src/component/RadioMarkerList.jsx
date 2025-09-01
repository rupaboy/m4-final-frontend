import RadioItem from './particle/RadioItem';
import { UseRadio } from "../hook/UseRadio";

const RadioMarkerList = () => {
    const { radioMarkers } = UseRadio();

    return (
        <div
            className="border-t border-b rounded-md flex flex-wrap justify-center gap-2 
                max-h-110 overflow-y-scroll py-4 w-[80vw]"
        >
            {radioMarkers?.map((radio) => (
                    <RadioItem key={radio._id} radio={radio} />
            ))}
        </div>
    );
}

export default RadioMarkerList;
