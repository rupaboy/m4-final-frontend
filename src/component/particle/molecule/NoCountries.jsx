import { UseNotification } from "../../../hook/UseNotification"
import { useNavigate } from "react-router"
import { UseRadio } from "../../../hook/UseRadio"
import MarkersList from "../../MarkersList"
import Button from "./Button"


const NoCountries = ({ retryFetchCountries, isLoggedIn }) => {

    const navigate = useNavigate()
    const { notify } = UseNotification()
    const { radioMarkers } = UseRadio()

    return (
        <main className="w-full flex flex-col items-center justify-center">

            <h2 className="my-2 border-b border-b-amber-800 dark:border-b-amber-400">
                No Internet or API down
            </h2>
            <h2 className="text-xs">
                Unable to fetch countries.
            </h2>
            <div className="flex items-end gap-6 justify-center mt-7">
                <Button
                    ratio="flex items-center gap-2 px-2"
                    buttonText={<i className={'bi-router-fill'} />}
                    buttonName={'Retry'}
                    title={'Retry fetching countries database.'}
                    action={
                        async () => {
                            notify({
                                id: 're-fetch',
                                notificationTag: 'Retrying API fetch...'
                            });
                        const response = await retryFetchCountries();
                        if (!response.ok) {
                            notify({
                                id: 're-fetch',
                                notificationTag: "Out of Reach!",
                                withProgress: false
                            });
                        } else {
                            notify({
                                id: 're-fetch',
                                notificationTag: 'API reached!',
                                withProgress: false
                            });
                        }
                    }}
                />
                <Button
                    ratio="flex items-center gap-1 px-2"
                    buttonText={<i className={'bi-x'} />}
                    buttonName={'Cancel'}
                    title={'Close Finder'}
                    action={() => {
                        navigate(-1)
                    }}
                />
            </div>
            { radioMarkers.length !== 0 && isLoggedIn &&
            <aside className="text-center">
                <h2 className="text-xs mt-7">You may still navigate:</h2>
                <MarkersList/>
            </aside>
            }
        </main>
    )
}

export default NoCountries