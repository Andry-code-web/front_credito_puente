import { useState } from "react";

/**
 * Formulario del Simulador de Créditos.
 * Props:
 *   - clientes: Array<{ id, nombre, dni }>
 *   - inversores: Array<{ id, nombre, dni }>
 *   - onSimulate: function(formData)
 *   - onSave: function(formData)
 *   - onClear: function()
 *   - simulationResult: Object | null
 *   - loadingSimulate: boolean
 *   - loadingSave: boolean
 */
export default function FormSimulador({
    clientes = [],
    inversores = [],
    onSimulate,
    onSave,
    onClear,
    simulationResult = null,
    loadingSimulate = false,
    loadingSave = false
}) {
    const initialFormState = {
        cliente_id: "",
        inversionista_id: "",
        monto_prestamo: "",
        tasa_interes: "",
        meses: "",
        moneda: "pen",
        tipo_pago: "mensual",
        created_at: new Date().toISOString().split('T')[0],
        observaciones: ""
    };

    const [formData, setFormData] = useState(initialFormState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSimulateForm = (e) => {
        e.preventDefault();
        // Validaciones básicas de campos requeridos para simulación
        if (!formData.monto_prestamo || !formData.tasa_interes || !formData.meses || !formData.cliente_id) {
            alert("Por favor rellene los campos del cliente, monto, tasa de interés y meses.");
            return;
        }
        onSimulate(formData);
    };

    const handleSaveForm = (e) => {
        e.preventDefault();
        if (!formData.inversionista_id) {
            alert("Debe seleccionar un inversionista para crear el préstamo real.");
            return;
        }
        onSave(formData);
    };

    const handleClearForm = (e) => {
        e.preventDefault();
        setFormData(initialFormState);
        onClear();
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 col-span-2">
            <h2 className="text-base font-semibold text-gray-800 mb-6">Nueva Simulación</h2>

            <form className="grid grid-cols-2 gap-x-6 gap-y-5">
                {/* Cliente Select */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="cliente_id" className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                        Cliente
                    </label>
                    <select
                        name="cliente_id"
                        id="cliente_id"
                        value={formData.cliente_id}
                        onChange={handleChange}
                        required
                        className="w-full border-b border-gray-200 bg-transparent py-2 text-sm text-gray-700 outline-none focus:border-[#0DA071] transition-colors duration-200"
                    >
                        <option value="">Seleccione un cliente</option>
                        {clientes.map(c => (
                            <option key={c.id} value={c.id}>{c.nombre} (DNI: {c.dni})</option>
                        ))}
                    </select>
                </div>

                {/* Inversionista Select */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="inversionista_id" className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                        Inversionista
                    </label>
                    <select
                        name="inversionista_id"
                        id="inversionista_id"
                        value={formData.inversionista_id}
                        onChange={handleChange}
                        required
                        className="w-full border-b border-gray-200 bg-transparent py-2 text-sm text-gray-700 outline-none focus:border-[#0DA071] transition-colors duration-200"
                    >
                        <option value="">Seleccione un inversionista</option>
                        {inversores.map(inv => (
                            <option key={inv.id} value={inv.id}>{inv.nombre} (DNI: {inv.dni})</option>
                        ))}
                    </select>
                </div>

                {/* Monto del Préstamo */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="monto_prestamo" className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                        Monto del Préstamo
                    </label>
                    <input
                        type="number"
                        name="monto_prestamo"
                        id="monto_prestamo"
                        value={formData.monto_prestamo}
                        onChange={handleChange}
                        required
                        placeholder="Ej. 10000"
                        className="w-full border-b border-gray-200 bg-transparent py-2 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-[#0DA071] transition-colors duration-200"
                    />
                </div>

                {/* Tasa de Interés */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="tasa_interes" className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                        Tasa de Interés (%)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        name="tasa_interes"
                        id="tasa_interes"
                        value={formData.tasa_interes}
                        onChange={handleChange}
                        required
                        placeholder="Ej. 10 para 10%"
                        className="w-full border-b border-gray-200 bg-transparent py-2 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-[#0DA071] transition-colors duration-200"
                    />
                </div>

                {/* Meses */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="meses" className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                        Meses
                    </label>
                    <input
                        type="number"
                        name="meses"
                        id="meses"
                        value={formData.meses}
                        onChange={handleChange}
                        required
                        placeholder="Ej. 12"
                        className="w-full border-b border-gray-200 bg-transparent py-2 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-[#0DA071] transition-colors duration-200"
                    />
                </div>

                {/* Moneda Select */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="moneda" className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                        Moneda
                    </label>
                    <select
                        name="moneda"
                        id="moneda"
                        value={formData.moneda}
                        onChange={handleChange}
                        className="w-full border-b border-gray-200 bg-transparent py-2 text-sm text-gray-700 outline-none focus:border-[#0DA071] transition-colors duration-200"
                    >
                        <option value="pen">Soles (PEN)</option>
                        <option value="dolar">Dólares (USD)</option>
                    </select>
                </div>

                {/* Tipo de Pago Select */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="tipo_pago" className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                        Tipo de Pago
                    </label>
                    <select
                        name="tipo_pago"
                        id="tipo_pago"
                        value={formData.tipo_pago}
                        onChange={handleChange}
                        className="w-full border-b border-gray-200 bg-transparent py-2 text-sm text-gray-700 outline-none focus:border-[#0DA071] transition-colors duration-200"
                    >
                        <option value="mensual">Mensual</option>
                        <option value="quincenal">Quincenal</option>
                    </select>
                </div>

                {/* Fecha de Inicio */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="created_at" className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                        Fecha de Inicio
                    </label>
                    <input
                        type="date"
                        name="created_at"
                        id="created_at"
                        value={formData.created_at}
                        onChange={handleChange}
                        required
                        className="w-full border-b border-gray-200 bg-transparent py-2 text-sm text-gray-700 outline-none focus:border-[#0DA071] transition-colors duration-200"
                    />
                </div>

                {/* Observaciones */}
                <div className="col-span-2 flex flex-col gap-1">
                    <label htmlFor="observaciones" className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                        Observaciones
                    </label>
                    <input
                        type="text"
                        name="observaciones"
                        id="observaciones"
                        value={formData.observaciones}
                        onChange={handleChange}
                        placeholder="Ej. Garantía hipotecaria en Santiago de Surco"
                        className="w-full border-b border-gray-200 bg-transparent py-2 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-[#0DA071] transition-colors duration-200"
                    />
                </div>

                <div className="col-span-2 flex flex-row-reverse mt-4 gap-5">
                    <button
                        type="button"
                        onClick={handleSaveForm}
                        disabled={!simulationResult || loadingSave}
                        className="bg-[#0DA071] hover:bg-[#0b8f65] disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm font-semibold px-8 py-2.5 rounded-xl transition-colors duration-200 cursor-pointer disabled:cursor-not-allowed"
                    >
                        {loadingSave ? "Guardando..." : "Guardar Préstamo"}
                    </button>
                    <button
                        type="button"
                        onClick={handleSimulateForm}
                        disabled={loadingSimulate}
                        className="bg-[#7ABF42] hover:bg-[#579e20] disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm font-semibold px-8 py-2.5 rounded-xl transition-colors duration-200 cursor-pointer"
                    >
                        {loadingSimulate ? "Simulando..." : "Simular"}
                    </button>
                    <button
                        type="button"
                        onClick={handleClearForm}
                        className="bg-[#a00d0d] hover:bg-[#741a1a] text-white text-sm font-semibold px-8 py-2.5 rounded-xl transition-colors duration-200 cursor-pointer"
                    >
                        Limpiar
                    </button>
                </div>
            </form>
        </div>
    );
}