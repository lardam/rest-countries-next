import DarkModeToggle from "./DarkModeToggle";
import Link from "next/link";

export default function Header(){
return(
        <header className="h-20 px-12 flex items-center justify-between bg-indigo-400 dark:bg-slate-900">
            <Link href='/' className="font-bold text-md min-[500px]:text-2xl text-gray-50">Where in the world?</Link>
            <DarkModeToggle />
        </header>
    )
}