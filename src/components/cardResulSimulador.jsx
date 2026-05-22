export default function CardResultados({ simulationResult = null, clienteName = "—", moneda = "pen" }) {
    const formatCurrency = (amount) => {
        if (amount === undefined || amount === null) return "—";
        const num = parseFloat(amount);
        if (isNaN(num)) return "—";
        const symbol = moneda === "dolar" ? "$" : "S/";
        return `${symbol} ${num.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const resumen = simulationResult?.resumen;
    const cuotas = simulationResult?.cuotas || [];
    const monthlyInterest = cuotas[0]?.pago_interes || null;
    const totalInterest = monthlyInterest !== null && resumen?.meses ? monthlyInterest * resumen.meses : null;

    const handlePrintPDF = () => {
        if (!simulationResult) {
            alert("No hay simulación para imprimir.");
            return;
        }
        window.print();
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h2 className="text-base font-semibold text-gray-800 mb-6">Resultados de la Simulación</h2>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between border-b border-gray-50 pb-2">
                    <p className="text-sm font-semibold text-gray-400">Cliente</p>
                    <p className="text-sm font-semibold text-gray-700 text-right font-medium max-w-[180px] truncate" title={clienteName}>
                        {clienteName}
                    </p>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                    <p className="text-sm font-semibold text-gray-400">Monto del Préstamo</p>
                    <p className="text-sm font-semibold text-gray-700">
                        {resumen ? formatCurrency(resumen.monto_prestamo) : "—"}
                    </p>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                    <p className="text-sm font-semibold text-gray-400">Tasa de Interés</p>
                    <p className="text-sm font-semibold text-gray-700">
                        {resumen ? resumen.tasa_interes : "—"}
                    </p>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                    <p className="text-sm font-semibold text-gray-400">Meses</p>
                    <p className="text-sm font-semibold text-gray-700">
                        {resumen ? resumen.meses : "—"}
                    </p>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                    <p className="text-sm font-semibold text-gray-400">Interés Mensual</p>
                    <p className="text-sm font-semibold text-gray-700">
                        {monthlyInterest !== null ? formatCurrency(monthlyInterest) : "—"}
                    </p>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                    <p className="text-sm font-semibold text-gray-400">Total Intereses</p>
                    <p className="text-sm font-semibold text-gray-700">
                        {totalInterest !== null ? formatCurrency(totalInterest) : "—"}
                    </p>
                </div>
                <div className="flex justify-between pt-2">
                    <p className="text-sm font-bold text-gray-800">Total a Pagar</p>
                    <p className="text-sm font-bold text-[#0DA071]">
                        {resumen ? formatCurrency(resumen.pago_total) : "—"}
                    </p>
                </div>
            </div>
            <div className="w-full flex justify-end">
                <button
                    type="button"
                    onClick={handlePrintPDF}
                    disabled={!simulationResult}
                    className="w-full mt-12 bg-[#0DA071] hover:bg-[#0b8f65] disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm font-semibold px-8 py-2.5 rounded-xl transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed"
                >
                    Generar PDF
                </button>
            </div>
        </div>
    );
}