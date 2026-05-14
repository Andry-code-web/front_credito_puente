import Navbar from "../components/navbar";
import Header from "../components/header";

export default function Clientes({ handlePage, page }) {
    return (
        <div className="w-screen h-screen flex">
            <Navbar handlePage={handlePage} page={page} />

            <div className="w-[85vw] h-full flex flex-col">
                <Header>
                    <span>Dashboard</span>
                    <span>/</span>
                    <span className="text-[#0DA071] font-semibold">
                        Clientes
                    </span>
                </Header>

                <div className="flex flex-row w-full h-auto">
                    <div className="w-full h-auto grid grid-cols-2 gap-5 p-5">

                    </div>

                    <div className="w-full h-auto flex justify-center items-center px-5 py-5 gap-5 bg-gray-100/30">

                    </div>
                </div>

                <div className="w-full h-auto py-5 px-16">

                </div>
            </div>
        </div>
    )
}