
export default function Header({ children }) {
    return (
        <header className="w-[85vw] h-20 py-4 flex justify-between items-center px-10">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
                {children}
            </div>

            {/* Perfil de usuario */}
            <div className="flex items-center gap-2 me-5">
                <img src="https://unavatar.io/github/Andry-code-web" alt="" className="w-12 h-12 rounded-full" />
                <div className=" flex flex-col justify-start items-start">
                    <h2 className="text-[#0DA071] font-bold font-sans text-sm">Sebastian</h2>
                    <p className="text-gray-400 font-regular font-sans text-sm">Asesor</p>
                </div>
            </div>
        </header>
    )
}