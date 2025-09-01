import { useEffect, useState } from "react";
import Loading from "./particle/molecule/Loading";
import { UseNotification } from "../hook/UseNotification";
import { UseFetchStatus } from "../hook/UseFetchStatus";
import CountryApi from "../api/CountryApi"

const CountryCapitalImage = ({ capital }) => {
  const { notify } = UseNotification();
  const { runFetch, getStatus } = UseFetchStatus();

  const [imgUrl, setImgUrl] = useState(null);

  const { isLoading, dataLoaded, fetchFailed, didFetch, cachedImage } = getStatus(capital);

  useEffect(() => {
    if (!capital) return;

    // Use cached image from context if available
    if (cachedImage) {
          notify({
            id: `${capital}`,
            notificationTag: `Fetching ${capital}'s image`,
            duration: 2000,
            withProgress: false
          });
      setImgUrl(cachedImage);
      return;
    }
    setImgUrl(null);

    runFetch(
      capital,
      () => CountryApi.capitalImageByName(capital), // fetch function
      (url) => {                     // onSuccess
        if (url) setImgUrl(url);
        else {
          notify({
            id: `${capital}`,
            notificationTag: `No image found for ${capital}`,
            duration: 2000,
            withProgress: false,
          });
          setImgUrl(null);
        }
      }
    ).catch((err) => {
      notify({
        id: `${capital}`,
        notificationTag: `Error fetching image for ${capital}: ${err.message}`,
        duration: 2000,
        withProgress: false,
      });
    });
  }, [capital, cachedImage, notify, runFetch]);

  return (
    <div className="country-image-container w-full">
      {dataLoaded && !isLoading && imgUrl && didFetch && (
        <img key={capital} src={imgUrl} alt={`Image of ${capital}`} className="rounded" />
      )}
      {!isLoading && imgUrl && <h2 className="text-xs my-2 text-right">{capital}</h2>}
      {isLoading && <Loading />}
      {fetchFailed && <p className="text-sm text-gray-500">No image Available</p>}
    </div>
  );
};

export default CountryCapitalImage;
