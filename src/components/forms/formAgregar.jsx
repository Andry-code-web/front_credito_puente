export default function FormAgregar() {

    const fields = [
        { id: "nombre", label: "Nombre", type: "text" },
        { id: "dni", label: "DNI", type: "text" },
        { id: "celular", label: "Celular", type: "text" },
        { id: "correo", label: "Correo", type: "email" },
        { id: "direccion", label: "Direccion", type: "text" },
    ]

    return (
        <div className="w-full h-full bg-white rounded-2xl border border-gray-100 shadow-sm p-8 col-span-2">
            <h2 className="text-base font-semibold text-gray-800 mb-6">Nuevo Cliente</h2>

            <form action="" method="post" className="grid grid-cols-2 gap-x-6 gap-y-5">
                {fields.map(({ id, label, type }) => (
                    <div key={id} className="flex flex-col gap-1">
                        <label
                            htmlFor={id}
                            className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                            {label}
                        </label>
                        <input
                            type={type}
                            name={id}
                            id={id}
                            className="w-full border-b border-gray-200 bg-transparent py-2 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-[#0DA071] transition-colors duration-200"
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
                    /* onClick={handleCloseForm} */
                    >
                        Cerrar
                    </button>
                </div>
            </form>
        </div>
    )
}