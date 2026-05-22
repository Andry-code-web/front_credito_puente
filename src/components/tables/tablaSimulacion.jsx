export default function TablaSimulacion({ cuotas = [], moneda = "pen" }) {
    const formatCurrency = (amount) => {
        if (amount === undefined || amount === null) return "—";
        const num = parseFloat(amount);
        if (isNaN(num)) return "—";
        const symbol = moneda === "dolar" ? "$" : "S/";
        return `${symbol} ${num.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    return (
        <div className="w-full h-auto py-5 px-16">
            <h2 className="text-base font-semibold text-gray-800 mb-6">Tabla de Cuotas Simulación</h2>
            
            <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm bg-white">
                <table className="w-full border-collapse text-left text-sm text-gray-500">
                    <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-4 text-center font-bold">Nº Cuota</th>
                            <th scope="col" className="px-6 py-4 text-center font-bold">Fecha Vencimiento</th>
                            <th scope="col" className="px-6 py-4 text-right font-bold">Saldo Pendiente</th>
                            <th scope="col" className="px-6 py-4 text-right font-bold">Pago Capital</th>
                            <th scope="col" className="px-6 py-4 text-right font-bold">Pago Interés</th>
                            <th scope="col" className="px-6 py-4 text-right font-bold">Total a Pagar</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                        {cuotas.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-10 text-center text-sm text-gray-400">
                                    No hay cuotas simuladas. Complete los campos arriba y presione "Simular".
                                </td>
                            </tr>
                        ) : (
                            cuotas.map((c) => (
                                <tr key={c.numero_cuota} className="hover:bg-gray-50/50 transition-colors duration-200">
                                    <td className="px-6 py-4 text-center text-gray-700 font-medium">
                                        {c.numero_cuota}
                                    </td>
                                    <td className="px-6 py-4 text-center text-gray-600 font-mono">
                                        {c.fecha_vencimiento}
                                    </td>
                                    <td className="px-6 py-4 text-right text-gray-600 font-mono">
                                        {formatCurrency(c.saldo_pendiente)}
                                    </td>
                                    <td className="px-6 py-4 text-right text-gray-600 font-mono">
                                        {formatCurrency(c.pago_capital)}
                                    </td>
                                    <td className="px-6 py-4 text-right text-gray-600 font-mono">
                                        {formatCurrency(c.pago_interes)}
                                    </td>
                                    <td className="px-6 py-4 text-right text-gray-900 font-bold font-mono">
                                        {formatCurrency(c.monto)}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}