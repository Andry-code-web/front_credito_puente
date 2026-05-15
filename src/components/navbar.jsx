import {
    RiHomeLine,
    RiMoneyDollarCircleLine,
    RiUserLine,
    RiGroup3Line,
    RiLogoutBoxRLine
} from "@remixicon/react";

export default function Navbar({ handlePage, page }) {
    return (
        <nav className="fixed inset-y-0 left-0 w-64 bg-[#EDFCF5] py-10 overflow-y-auto z-10">
            <div className="navbar flex flex-col h-full">
                <div className="logo">
                    <h1 className="text-2xl font-extrabold font-sans mb-14 flex justify-center text-[#0DA071]">Credito Puente</h1>
                </div>
                <div className="nav-links h-full flex flex-col justify-between">
                    <ul className="w-full flex flex-col justify-center items-center">
                        <li className={`w-2/3 h-12 mb-4 rounded-2xl flex justify-start items-center ${page === 'asesor' ? 'bg-[#0DA071]' : ''}`}>
                            <a href="#" onClick={() => handlePage('asesor')} className={`text-base font-semibold px-6 py-2 flex justify-start items-center gap-4 ${page === 'asesor' ? 'text-white' : 'text-gray-500'}`}><RiHomeLine size={20} /> Dashboard</a>
                        </li>
                        <li className={`w-2/3 h-12 mb-4 rounded-2xl flex justify-start items-center ${page === 'simulador' ? 'bg-[#0DA071]' : ''}`}>
                            <a href="#" onClick={() => handlePage('simulador')} className={`text-base font-semibold px-6 py-2 flex justify-start items-center gap-4 ${page === 'simulador' ? 'text-white' : 'text-gray-500'}`}><RiMoneyDollarCircleLine size={20} /> Simulacion</a>
                        </li>
                        <li className={`w-2/3 h-12 mb-4 rounded-2xl flex justify-start items-center ${page === 'clientes' ? 'bg-[#0DA071]' : ''}`}>
                            <a href="#" onClick={() => handlePage('clientes')} className={`text-base font-semibold px-6 py-2 flex justify-start items-center gap-4 ${page === 'clientes' ? 'text-white' : 'text-gray-500'}`}><RiUserLine size={20} /> Clientes</a>
                        </li>
                        <li className={`w-2/3 h-12 mb-4 rounded-2xl flex justify-start items-center ${page === 'inversionistas' ? 'bg-[#0DA071] w-[70%]' : ''}`}>
                            <a href="#" onClick={() => handlePage('inversionistas')} className={`text-base font-semibold px-6 py-2 flex justify-start items-center gap-4 ${page === 'inversionistas' ? 'text-white' : 'text-gray-500'}`}><RiGroup3Line size={20} /> Inversionistas</a>
                        </li>
                    </ul>

                    <div className="user-info flex justify-center items-center ">
                        <a href="#" className="text-base font-semibold px-6 py-2 flex justify-start items-center gap-4 text-gray-500 hover:text-[#0DA071] hover:rounded-2xl"><RiLogoutBoxRLine /> Logout</a>
                    </div>
                </div>

            </div>
        </nav>
    )
}