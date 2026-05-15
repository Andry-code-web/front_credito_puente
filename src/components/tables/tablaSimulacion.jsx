export default function TablaSimulacion() {
    return (
        <div className="w-full h-auto py-5 px-16">
            <h2 className="text-base font-semibold text-gray-800 mb-6">Tabla de Simulación</h2>
            <table className="w-2/3 border-collapse border border-gray-200">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border border-gray-200 px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Nº cuota</th>
                        <th className="border border-gray-200 px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Fecha</th>
                        <th className="border border-gray-200 px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Capital</th>
                        <th className="border border-gray-200 px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Interés</th>
                        <th className="border border-gray-200 px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase">Monto a Pagar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-gray-200 px-4 py-2 text-xs text-gray-700">1</td>
                        <td className="border border-gray-200 px-4 py-2 text-xs text-gray-700">2022-01-01</td>
                        <td className="border border-gray-200 px-4 py-2 text-xs text-gray-700">10,000.00 S/</td>
                        <td className="border border-gray-200 px-4 py-2 text-xs text-gray-700">1,000.00 S/</td>
                        <td className="border border-gray-200 px-4 py-2 text-xs text-gray-700">11,000.00 S/</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}