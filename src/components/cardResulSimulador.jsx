export default function CardResultados() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h2 className="text-base font-semibold text-gray-800 mb-6">Resultados de la Simulación</h2>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between">
                    <p className="text-sm font-semibold text-gray-400">Cliente</p>
                    <p className="text-sm font-semibold text-gray-400">Sebastian Escaante mendoza</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-sm font-semibold text-gray-400">Monto del Préstamo</p>
                    <p className="text-sm font-semibold text-gray-400">10,000.00 S/</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-sm font-semibold text-gray-400">Tasa de Interés</p>
                    <p className="text-sm font-semibold text-gray-400">10%</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-sm font-semibold text-gray-400">Meses</p>
                    <p className="text-sm font-semibold text-gray-400">12</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-sm font-semibold text-gray-400">Interés</p>
                    <p className="text-sm font-semibold text-gray-400">1,000.00 S/</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-sm font-semibold text-gray-400">Total a Pagar</p>
                    <p className="text-sm font-semibold text-gray-400">11,000.00 S/</p>
                </div>
            </div>
            <div className="w-full flex justify-end">
                <button
                    type="submit"
                    className="w-1/2 mt-16 bg-[#0DA071] hover:bg-[#0b8f65] text-white text-sm font-semibold px-8 py-2.5 rounded-xl transition-colors duration-200"
                >
                    Generar PDF
                </button>
            </div>
        </div>
    )
}