import {
    RiHomeLine,
    RiMoneyDollarCircleLine,
    RiUserLine,
    RiGroup3Line
} from "@remixicon/react";

export default function Navbar() {
    return (
        <nav className="w-[20vw] h-screen bg-[#EDFCF5] py-10">
            <div className="navbar">
                <div className="logo">
                    <h1 className="text-2xl font-extrabold font-sans mb-14 flex justify-center text-[#0DA071]">Credito Puente</h1>
                </div>
                <div className="nav-links">
                    <ul className="w-full flex flex-col justify-center items-center">
                        <li className="w-2/3 h-12 mb-4 bg-[#0DA071] rounded-2xl flex justify-start items-center">
                            <a href="#" className="text-base font-semibold px-6 py-2 flex justify-start items-center gap-4 text-white"><RiHomeLine size={20} /> Dashboard</a>
                        </li>
                        <li className="w-2/3 h-12 mb-4 rounded-2xl flex justify-start items-center">
                            <a href="#" className="text-base font-semibold px-6 py-2 flex justify-start items-center gap-4 text-gray-500"><RiMoneyDollarCircleLine size={20} /> Simulacion</a>
                        </li>
                        <li className="w-2/3 h-12 mb-4 rounded-2xl flex justify-start items-center">
                            <a href="#" className="text-base font-semibold px-6 py-2 flex justify-start items-center gap-4 text-gray-500"><RiUserLine size={20} /> Clientes</a>
                        </li>
                        <li className="w-2/3 h-12 mb-4 rounded-2xl flex justify-start items-center">
                            <a href="#" className="text-base font-semibold px-6 py-2 flex justify-start items-center gap-4 text-gray-500"><RiGroup3Line size={20} /> Inversionistas</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}