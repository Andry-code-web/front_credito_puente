

export default function CardDatos({ title, icon, amount, description }) {
    return (
        <div className="w-full h-32 bg-white rounded-2xl shadow-lg p-4 hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="flex justify-between">
                <h2 className="text-lg font-bold font-sans text-gray-500">{title}</h2>
                {icon}
            </div>
            <div className="flex flex-col">
                <h2 className="text-3xl font-bold font-sans text-[#0DA071]">{amount}</h2>
                <p className="text-gray-400 font-regular font-sans text-sm">{description}</p>
            </div>
        </div>
    )
}