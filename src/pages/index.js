import CountryGrid from "components/CountryGrid";
import Filter from "components/Filter";
import Header from "components/Header"
import Script from "next/script";
import { useState } from "react";

export async function getServerSideProps(context) {
  const res = await fetch('https://restcountries.com/v3.1/all');
  const data = await res.json();
  return {
    props: {
      countries: data
    }
  }
};

export default function Home({ countries }) {
  const [inputValue, setInputValue] = useState("");
  const [continent, setContinent] = useState("");

  const onChangeHandler = e => {
    setInputValue(e.target.value)
  };
  const getContinent = cont => {
    setContinent(cont)
  };

  return (
    <>
      <Script src="https://kit.fontawesome.com/0d4a85bfb9.js" crossOrigin="anonymous" />
      <Header />
      <main className="pb-8 bg-gray-100 dark:bg-slate-800 min-h-[calc(100vh_-_5rem)]">
        <Filter onChangeHandler={onChangeHandler} getContinent={getContinent} currentContinent={continent} />
        <CountryGrid data={countries} currentSearch={inputValue} filterContinent={continent} />
      </main>
    </>
  )
}