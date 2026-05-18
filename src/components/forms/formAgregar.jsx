import { useState } from "react";

/**
 * Formulario genérico para agregar registros.
 * Props:
 *   - titleModal: string
 *   - fields: Array<{ id, label, type }>
 *   - openModal: boolean
 *   - setOpenModal: function
 *   - onSubmit: async function(formData) → se llama al guardar
 *   - loading: boolean (opcional) — deshabilita el botón mientras guarda
 */
export default function FormAgregar({ titleModal, openModal, setOpenModal, fields, onSubmit, loading = false }) {

    const initialState = () =>
        fields.reduce((acc, { id }) => ({ ...acc, [id]: '' }), {});

    const [formData, setFormData] = useState(initialState);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await onSubmit(formData);
            setFormData(initialState());
            setOpenModal(false);
        } catch (err) {
            setError(err.message || 'Error al guardar');
        }
    };

    const handleClose = () => {
        setFormData(initialState());
        setError(null);
        setOpenModal(false);
    };

    return (
        <div className="w-full h-full bg-white rounded-2xl border border-gray-100 shadow-sm p-8 col-span-2">
            <h2 className="text-base font-semibold text-gray-800 mb-6">Nuevo {titleModal}</h2>

            {error && (
                <div className="mb-4 px-4 py-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-6 gap-y-5">
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
                            value={formData[id] ?? ''}
                            onChange={handleChange}
                            required
                            className="w-full border-b border-gray-200 bg-transparent py-2 text-sm text-gray-700 placeholder-gray-300 outline-none focus:border-[#0DA071] transition-colors duration-200"
                        />
                    </div>
                ))}

                <div className="col-span-2 flex flex-row-reverse mt-4 gap-5">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#0DA071] hover:bg-[#0b8f65] disabled:opacity-60 text-white text-sm font-semibold px-8 py-2.5 rounded-xl transition-colors duration-200"
                    >
                        {loading ? 'Guardando...' : 'Guardar'}
                    </button>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="bg-[#a00d0d] hover:bg-[#741a1a] text-white text-sm font-semibold px-8 py-2.5 rounded-xl transition-colors duration-200"
                    >
                        Cerrar
                    </button>
                </div>
            </form>
        </div>
    );
}