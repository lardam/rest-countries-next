import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Pagination from "./Pagination";

export default function CountryGrid({ data, currentSearch, filterContinent, pageManip, pagination}){
    const preSorted = data.filter(country => 
        country.region.indexOf(filterContinent) !== -1    
    );
    const sorted = preSorted.filter(country =>
        country.name.official.toLowerCase().indexOf(currentSearch.toLowerCase()) !== -1 ||
        (country.capital && JSON.stringify(country.capital).toLowerCase().indexOf(currentSearch.toLowerCase()) !== -1)
    );

    return(
      <>
        <div className="min-h-[calc(100vh_-_20rem)] grid gap-8 sm:grid-cols-2 lg:grid-cols-4 min-[1500px]:grid-cols-5 px-8 sm:px-12">
          {sorted && sorted.length > 0 ? sorted.slice(pagination * 20, (pagination + 1) * 20).map(ct => (
            <div key={ct.cca2} className="max-h-[383px] bg-indigo-100 dark:bg-slate-600 dark:text-gray-200 p-2 rounded-xl flex flex-col gap-2">
              <div className="flag-container w-full aspect-[5/3] relative">
                <Image src={ct.flags.png} fill alt={`${ct.name.common} flag`} className="absolute rounded" />
              </div>
              <div className="info-container h-48 flex flex-col justify-between">
                  <p className="country-name text-3xl font-semibold">{ct.name.common}</p>
                  <p className="country-capital text-base"><b>Capital: </b>{ct.capital || "No capital"}</p>
                  <p className="country-population"><b>Population: </b>{ct.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                  <p className="country-region"><b>Continent: </b>{ct.region}</p>
                  <Link href={`/${ct.name.common}`} className="opacity-60 hover:opacity-100 w-fit dark:hover:text-amber-400"><b>See more</b></Link>
              </div>
            </div>
          )) : <p>No data</p>}
        </div>
        <Pagination arr={sorted} setPage={pageManip}/>
      </>
    )
}