import Button from "./Button"
import Marker from "./Marker"
import { useEffect, useState } from "react"
import { UseWorld } from "../../../hook/UseWorld"
import { useNavigate } from "react-router"

const SearchBar = () => {

    const [ query, setQuery ] = useState('');
    const { searchCountries, searchResults } = UseWorld()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        searchCountries(newQuery);
    }

    useEffect(()=>{
        setQuery('')
        searchCountries([])
    },[])

    return (
        <main className="flex flex-col w-screen overflow-y-scroll justify-center items-center">
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={query}
                    placeholder="Some Country Name"
                    onChange={handleChange}
                    className="border p-2 mt-1 text-center rounded w-60 dark:bg-slate-950 bg-slate-200"
                />
                <Button
                    buttonText={<i className={`z-1000 ${searchResults.length === 1 ?'bi-geo-alt' :'bi-search'}`} />}
                    title={'Search Country Name'}
                    action={() => {
                        if (searchResults.length === 1){
                            navigate(`/countries/${searchResults[0].code}`)
                        }
                    }}
                />
            </div>

            
                <div className="
                border dark:border-slate-700 border-slate-500 mb-10
                w-[70vw] rounded-md flex flex-wrap justify-center my-auto gap-1
                max-h-[30vh] min-h-[30vh] overflow-hidden overflow-y-scroll">

                <ul className="flex flex-wrap h-min justify-center gap-1 mb-auto p-2 mx-auto">
                {searchResults.length > 0 && searchResults.map((result) => (
                  <Marker
                    key={result.code}
                    name={result.name}
                    action={() => {
                      navigate(`/countries/${result.code}`)
                    }}
                    id={result.code}
                    flag={result.flag}
                  />
                ))}
            </ul>
          </div>
        </main>
    )
}

export default SearchBar