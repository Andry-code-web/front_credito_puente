import { useState } from "react";

/**
 * Formulario genérico para agregar registros.
 * Props:
 *   - titleModal: string
 *   - fields: Array<{ id, label, type, options? }>
 *   - openModal: boolean
 *   - setOpenModal: function
 *   - onSubmit: async function(formData)
 *   - loading: boolean
 */

export default function FormAgregar({
    titleModal,
    openModal,
    setOpenModal,
    fields,
    onSubmit,
    loading = false
}) {

    // Estado inicial dinámico
    const createInitialState = () =>
        fields.reduce((acc, field) => {
            acc[field.id] = '';
            return acc;
        }, {});

    const [formData, setFormData] = useState(createInitialState());
    const [error, setError] = useState(null);

    // Cambios en inputs/selects
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError(null);

        try {
            await onSubmit(formData);

            // Reset
            setFormData(createInitialState());

            // Cerrar modal
            setOpenModal(false);

        } catch (err) {
            console.error(err);

            setError(
                err?.message || 'Error al guardar'
            );
        }
    };

    // Cerrar modal
    const handleClose = () => {
        setFormData(createInitialState());
        setError(null);
        setOpenModal(false);
    };

    return (
        <div className="w-full h-fit bg-white rounded-2xl border border-gray-100 shadow-sm p-8">

            {/* Título */}
            <h2 className="text-base font-semibold text-gray-800 mb-6">
                Nuevo {titleModal}
            </h2>

            {/* Error */}
            {error && (
                <div className="mb-4 px-4 py-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                    {error}
                </div>
            )}

            {/* Formulario */}
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-2 gap-x-6 gap-y-5"
            >

                {fields.map(({ id, label, type, options }) => (

                    type !== "select" ? (

                        // INPUTS
                        <div key={id} className="flex flex-col gap-1">

                            <label
                                htmlFor={id}
                                className="text-sm font-medium text-gray-400 uppercase tracking-wider"
                            >
                                {label}
                            </label>

                            <input
                                type={type}
                                name={id}
                                id={id}
                                value={formData[id] ?? ''}
                                onChange={handleChange}
                                required
                                className="
                                    w-full
                                    border-b
                                    border-gray-200
                                    bg-transparent
                                    py-2
                                    text-sm
                                    text-gray-700
                                    placeholder-gray-300
                                    outline-none
                                    focus:border-[#0DA071]
                                    transition-colors
                                    duration-200
                                "
                            />
                        </div>

                    ) : (

                        // SELECTS
                        <div key={id} className="flex flex-col gap-1 relative">

                            <label
                                htmlFor={id}
                                className="text-sm font-medium text-gray-400 uppercase tracking-wider"
                            >
                                {label}
                            </label>

                            <select
                                name={id}
                                id={id}
                                value={formData[id] ?? ''}
                                onChange={handleChange}
                                required
                                className="
                                    w-full
                                    border-b
                                    border-gray-200
                                    bg-transparent
                                    py-2
                                    text-sm
                                    text-gray-700
                                    outline-none
                                    focus:border-[#0DA071]
                                    transition-colors
                                    duration-200
                                    appearance-none
                                    cursor-pointer
                                    pr-8
                                "
                            >

                                <option value="" disabled>
                                    Seleccionar...
                                </option>

                                {options?.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.label}
                                    </option>
                                ))}

                            </select>

                            {/* Flecha */}
                            <div className="pointer-events-none absolute right-2 top-9 text-gray-400">
                                <svg
                                    className="h-4 w-4 fill-current"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                </svg>
                            </div>

                        </div>
                    )

                ))}

                {/* Botones */}
                <div className="col-span-2 flex justify-end mt-4 gap-5">

                    <button
                        type="button"
                        onClick={handleClose}
                        className="
                            bg-red-600
                            hover:bg-red-700
                            text-white
                            text-sm
                            font-semibold
                            px-8
                            py-2.5
                            rounded-xl
                            transition-colors
                            duration-200
                        "
                    >
                        Cerrar
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            bg-[#0DA071]
                            hover:bg-[#0b8f65]
                            disabled:opacity-60
                            text-white
                            text-sm
                            font-semibold
                            px-8
                            py-2.5
                            rounded-xl
                            transition-colors
                            duration-200
                        "
                    >
                        {loading ? 'Guardando...' : 'Guardar'}
                    </button>

                </div>

            </form>
        </div>
    );
}