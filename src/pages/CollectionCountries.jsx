import { useEffect, useState } from "react"
import { UseFetchStatus } from "../hook/UseFetchStatus"
import { UseWorld } from "../hook/UseWorld"
import { UseNotification } from "../hook/UseNotification"
import Header from "../component/particle/Header"
import Button from "../component/particle/molecule/Button"
import Table from '../component/particle/molecule/Table'

const CollectionCountries = () => {

  const { getStatus, resetStatus } = UseFetchStatus()
  const {
    retryFetchCountries,
    countries,
    setCountries,
    idealCountriesLength,
    populateCountriesCollection,
    purgeCountriesCollection
  } = UseWorld()
  const { notify } = UseNotification()

  // --- Get countries ---
  useEffect(() => {
    if (getStatus("countries")?.dataLoaded) return;
    if (!countries.length) {
      notify({ id: "countries", notificationTag: "Fetching countries" });
      retryFetchCountries();
    }
  }, []);


  return (
    <main className="w-screen flex flex-col justify-start items-center h-full">
      <Header
        header={'Countries Collection'}
        subHeader={'Administrator Tools'}
      />

      <div className="flex items-center justify-center text-center mb-5">
        <Table
          title={'Countries'}
          header1={'Expected'}
          footer1={idealCountriesLength}
          header2={'Loaded'}
          footer2={countries.length}
        />
      </div>

      <main className="flex items-center justify-center gap-8">
        <Button
          buttonText={<i className="bi-collection-fill" />}
          title="Populate Collection"
          buttonName="Populate Collection"
          action={async () => {
            if (confirm("Are you sure you want to populate the countries collection?")) {
              try {
                const res = await populateCountriesCollection();
                notify({ id: "populate", notificationTag: `${res}` });
              } catch (err) {
                notify({ id: "populate-error", notificationTag: "Error populating collection", type: "error" });
              }
            }
          }}
        />

        <Button
          buttonText={<i className="bi-collection" />}
          title="Drop Collection"
          buttonName="Drop Collection"
          action={async () => {
            if (confirm("Are you sure you want to purge the countries collection?")) {
              try {
                const res = await purgeCountriesCollection();
                notify({ id: "purge", notificationTag: `${res}` });
              } catch (err) {
                notify({ id: "purge-error", notificationTag: "Error purging collection", type: "error" });
              }
            }
          }}
        />

      </main>

      <div className="mt-10">
        <Button
          buttonText={<i className="bi-arrow-repeat" />}
          title="Refresh"
          buttonName="Refresh"
          action={async () => {
            resetStatus('countries')
            const res = await retryFetchCountries();
            if (!res.ok) {
              setCountries([])
            }
            
          }}
        />
      </div>

    </main>
  )
}

export default CollectionCountries