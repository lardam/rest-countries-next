import { useState, useEffect } from "react";

export default function DarkModeToggle(){
    //Dark mode
    const [isActive, setIsActive] = useState(false)
    const [theme, setTheme] = useState("light")

    useEffect(() => {
        if(theme === "dark") document.documentElement.classList.add("dark")
        else document.documentElement.classList.remove("dark")
    }, [theme])

    const handleSwitch = () => {
        setTheme(theme === "dark" ? "light" : "dark")
        setIsActive(!isActive)
    }

    return(
        <div id="dark-mode-container" className="flex justify-between items-center">
            <p className="mr-1 capitalize text-gray-50 font-semibold text-xs min-[500px]:text-base">{theme} mode</p>
            <div id="toggler" className="h-8 w-8 relative flex flex-col items-center overflow-hidden cursor-pointer" onClick={handleSwitch}>
                <i className={"toggler-icon fa-solid fa-sun text-2xl text-amber-300 " + (isActive ? "animate-[moon-bounce_1s_ease_forwards]" : "animate-[sun-bounce_1s_ease_forwards]")} />
                <i className={"toggler-icon fa-solid fa-moon text-2xl text-amber-400 " + (isActive ? "animate-[moon-bounce_1s_ease_forwards]" : "animate-[sun-bounce_1s_ease_forwards]")} />
            </div>
        </div>
    )
}
