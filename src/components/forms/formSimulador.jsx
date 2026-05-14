export default function FormSimulador() {

    const fields = [
        { id: "cliente_id", label: "Cliente", type: "number" },
        { id: "tasa_interes", label: "Tasa de Interés", type: "number" },
        { id: "created_at", label: "Fecha de Inicio", type: "date" },
        { id: "meses", label: "Meses", type: "number" },
        { id: "monto_prestamo", label: "Monto del Préstamo", type: "number" },
        { id: "interes", label: "Interés", type: "number" },
        { id: "observaciones", label: "Observaciones", type: "text" },
    ];

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 col-span-2">
            <h2 className="text-base font-semibold text-gray-800 mb-6">Nueva Simulación</h2>

            <form method="post" className="grid grid-cols-2 gap-x-6 gap-y-5">
                {fields.map(({ id, label, type }) => (
                    <div key={id} className="flex flex-col gap-1">
                        <label
                            htmlFor={id}
                            className="text-xs font-medium text-gray-400 uppercase tracking-wide"
                        >
                            {label}
                        </label>
                        <input
                            type={type}
                            name={id}
                            id={id}
                            className="w-full border-b border-gray-200 bg-transparent py-2 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-[#0DA071] transition-colors duration-200"
                            placeholder="—"
                        />
                    </div>
                ))}

                <div className="col-span-2 flex flex-row-reverse mt-4 gap-5">

                    <button
                        type="submit"
                        className="bg-[#0DA071] hover:bg-[#0b8f65] text-white text-sm font-semibold px-8 py-2.5 rounded-xl transition-colors duration-200"
                        disabled
                    /* onClick={handleSaveForm} */
                    >
                        Guardar
                    </button>
                    <button
                        type="submit"
                        className="bg-[#7ABF42] hover:bg-[#579e20] text-white text-sm font-semibold px-8 py-2.5 rounded-xl transition-colors duration-200"
                    /* onClick={handleSimulateForm} */
                    >
                        Simular
                    </button>
                    <button
                        type="submit"
                        className="bg-[#a00d0d] hover:bg-[#741a1a] text-white text-sm font-semibold px-8 py-2.5 rounded-xl transition-colors duration-200"
                    /* onClick={handleClearForm} */
                    >
                        Limpiar
                    </button>
                </div>
            </form>
        </div>
    );
}