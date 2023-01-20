import { useRouter } from "next/router"
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "components/Header";

export async function getServerSideProps({req}) {
  const res = await fetch('https://restcountries.com/v3.1/all');
  const data = await res.json();
  return {
    props: {
      country: data
    }
  }
};

export default function Country({country}){
  const router = useRouter();
  const getPageCountry = router.query.country;
  const getCurrentCountry = country.find(ct => ct.name.common === getPageCountry);
  const getLanguages =  getCurrentCountry.languages && Object.entries(getCurrentCountry.languages);
  const getCurrencies = getCurrentCountry.currencies && Object.entries(getCurrentCountry.currencies).map(pair => [pair[0], pair[1].name]) || [["no-curr", "No official currency"]];


  console.log(getCurrentCountry)

  return (
    <>
      <Head>
        <script src="https://kit.fontawesome.com/0d4a85bfb9.js" crossOrigin="anonymous" />
      </Head>
      <Header />
      <main className="bg-gray-100 dark:bg-slate-800 min-h-[calc(100vh_-_5rem)]">
        <div id="country-container" className="p-12 dark:text-gray-300 flex flex-col">
          <div id="curr-flag-container" className="w-full max-w-[450px] self-center mb-4 aspect-[5/3] relative">
            <Image src={getCurrentCountry.flags.png} className="absolute rounded" fill priority alt={`${getCurrentCountry.name.common} flag`} />
          </div>
          <div id="info-curr-country" className="h-96 flex flex-col justify-between">
            <h1 id="curr-name" className="text-3xl font-bold">{getCurrentCountry.name.common}</h1>
            <div id="curr-region" className="w-fit ml-[-.5rem] px-2 py-1 border bg-indigo-200 flex rounded overflow-scroll md:overflow-visible dark:text-black"><p className="font-semibold mr-1">{getCurrentCountry.region}</p><p> / {getCurrentCountry.subregion}</p></div>
            <p id="curr-capital"><b>Capital: </b>{getCurrentCountry.capital || "No capital"}</p>
            <p id="curr-population"><b>Population: </b>{getCurrentCountry.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            <div id="lang-list-container" className="flex items-center">
              <p className="mr-2"><b>Languages:</b></p>
              <ul id="lang-list" className="flex gap-2 overflow-scroll md:overflow-visible touch-pan-x">
                {getLanguages && getLanguages.length > 0 ? getLanguages.map(([code, name]) => (
                    <li key={code} className="px-2 py-1 border bg-indigo-200 rounded dark:text-black">{name}</li>
                )) : <li key="no-lang">No official language</li>}
              </ul>
            </div>
            <div id="border-list-container" className="flex items-center">
              <p className="mr-2"><b>Borders with:</b></p>
              <ul id="border-list" className="flex gap-2 overflow-scroll md:overflow-visible touch-pan-x">
                {getCurrentCountry.borders.map((brd, index) => (
                  //Posible link con cioc
                    <li key={index} className="px-2 py-1 border bg-indigo-200 rounded dark:text-black">{brd}</li>
                )) || <li key={no-bord}>No borders</li>}
              </ul>
            </div>
            <div id="currency-list-container" className="flex items-center">
              <p className="mr-2"><b>Currencies:</b></p>
              <ul id="currency-list" className="flex gap-2 overflow-scroll md:overflow-visible touch-pan-x">
                {getCurrencies && getCurrencies.length > 0 ? getCurrencies.map(([code, name]) => (
                    <li key={code} className="px-2 py-1 border bg-indigo-200 rounded dark:text-black">{name}</li>
                )) : <li key="no-curr">No official currency</li>}
              </ul>
            </div>
            <Link href={getCurrentCountry.maps.googleMaps || ""} className="font-semibold opacity-70 hover:opacity-100"><i className="fa-solid fa-arrow-up-right-from-square mr-2" />Google Maps</Link>
          </div>
        </div>
      </main>
    </>
  )
}