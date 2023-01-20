import { useState } from "react"

export default function Filter({onChangeHandler, getContinent, currentContinent}){
    const continents = ["Africa", "Antarctic", "Asia", "Americas", "Europe", "Oceania"]

    const [isActive, setIsActive] = useState(false)
    const navHandler = () => {
        setIsActive(!isActive)
    }

    return(
        <div id="filter-container" className="w-full h-32 md:h-20 px-12 mb-6 text-black bg-indigo-300 dark:bg-slate-900 place-self-center flex flex-col justify-evenly items-center sm:flex-row sm:justify-between">
            <input
                className="px-4 py-2 rounded-xl w-full sm:w-2/5 lg:1/3"
                type="text"
                placeholder="Search by country or capital name..."
                onChange={onChangeHandler}
            />
            <nav id="continent-filter" className={"w-full h-10 relative flex flex-col justify-center bg-white rounded-xl sm:w-2/5 md:w-2/5 lg:w-1/5 dark:bg-amber-400 " + (isActive ? 'overflow-visible' : 'overflow-hidden')}>
                <button className="w-full h-full absolute" onClick={navHandler}>Filter by continent:<b className="ml-1">{currentContinent}</b></button>
                <ul className="w-full h-72 z-10 py-3 bg-gray-700 absolute top-10 flex flex-col justify-evenly items-center text-white rounded-xl overflow-hidden">
                    <li
                        className="w-full h-full flex justify-center items-center cursor-pointer bg-gray-700 hover:bg-slate-200 hover:text-black dark:hover:bg-gray-600 dark:hover:text-amber-400"
                        onClick={() =>{
                            navHandler()
                            getContinent("")
                        }}>All</li>
                    {continents.map((cont, index) => (
                        <li
                            className="w-full h-full flex justify-center items-center cursor-pointer bg-gray-700 hover:bg-slate-200 hover:text-black dark:hover:bg-gray-600 dark:hover:text-amber-400"
                            key={index}
                            onClick={() => {
                                navHandler()
                                getContinent(cont)
                            }}>{cont}</li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}