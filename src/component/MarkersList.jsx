import RadioItem from './particle/RadioItem'
import Button from "./particle/molecule/Button"
import { UseRadio } from "../hook/UseRadio"

const MarkersList = () => {

  const {radioMarkers} = UseRadio()

  return (
    <aside className="flex flex-col w-screen overflow-y-scroll justify-center items-center">
      <header className="w-full flex flex-col items-center justify-center mb-2 h-12 gap-2">
        <h4 className="text-center pt-2 text-sm border-b dark:border-b-amber-500 border-b-amber-800 w-full">Markers</h4>

      </header>


      <div className="
            border dark:border-slate-700 border-slate-500
            w-[70vw] rounded-md flex flex-wrap justify-center my-auto gap-1
            max-h-[30vh] min-h-[30vh] overflow-hidden overflow-y-scroll">

        <ul className="flex flex-wrap h-min justify-center gap-1 mb-auto p-2 mx-auto">
          {radioMarkers.map((marker) => (
            <RadioItem
              key={marker.station_uuid}
              radio={marker}
            />
          ))}
        </ul>
      </div>
    </aside>
  )
}

export default MarkersList