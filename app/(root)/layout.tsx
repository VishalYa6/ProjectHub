import Navbar from "@/components/Navbar"


export default function Layout({children} : Readonly<{children: React.ReactNode }>){
    return(
        <main className="text-2xl">
            <Navbar/>
            {children}
        </main>
    )
}