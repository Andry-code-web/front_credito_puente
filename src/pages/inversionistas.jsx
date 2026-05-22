import { useState, useEffect, useCallback } from "react";
import { RiAddLine } from "@remixicon/react";

import Navbar from "../components/navbar";
import Header from "../components/header";
import FormAgregar from "../components/forms/formAgregar";
import TablaMostrarInfo from "../components/tables/tablaMostrarInfo";

import {
    getInversores,
    createInversor,
    updateInversor,
    deleteInversor,
} from "../services/inversoresService";

// ─── Configuración de columnas y campos ────────────────────────────────────────
const COLUMNS = ["#", "Nombres", "DNI", "Celular", "Correo", "Dirección", "Monto", "Detalles"];
const FIELDS = ["id", "nombre", "dni", "celular", "correo", "direccion", "monto", "detalles"];

const FORM_FIELDS = [
    { id: "nombre", label: "Nombre", type: "text" },
    { id: "dni", label: "DNI", type: "text" },
    { id: "celular", label: "Celular", type: "text" },
    { id: "correo", label: "Correo", type: "email" },
    { id: "direccion", label: "Dirección", type: "text" },
    { id: "monto", label: "Monto", type: "number" },
    { id: "detalles", label: "Detalles", type: "text" },
];

// ─── Página Inversores ──────────────────────────────────────────────────────────
export default function Inversionistas({ handlePage, page }) {
    const [inversores, setInversores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    // ── Carga inicial ──────────────────────────────────────────────────────────
    const fetchInversores = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getInversores();
            setInversores(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchInversores();
    }, [fetchInversores]);

    // ── Crear ──────────────────────────────────────────────────────────────────
    const handleCreate = async (formData) => {
        setSaving(true);
        try {
            await createInversor(formData);
            await fetchInversores();        // refresca la tabla
        } finally {
            setSaving(false);
        }
    };

    // ── Eliminar ───────────────────────────────────────────────────────────────
    const handleDelete = async (row) => {
        if (!window.confirm(`¿Eliminar a "${row.nombre}"?`)) return;
        try {
            await deleteInversor(row.id);
            setInversores(prev => prev.filter(i => i.id !== row.id));
        } catch (err) {
            alert(err.message);
        }
    };

    // ── Editar ─────────────────────────────────────────────────────────────────
    const handleEdit = (row) => {
        console.log('Editar inversor:', row);
        // TODO: abrir modal de edición con los datos del inversor
    };

    const handleView = (row) => {
        console.log('Ver inversor:', row);
        // TODO: abrir panel de detalle
    };

    // ── Render ─────────────────────────────────────────────────────────────────
    return (
        <div className="w-screen h-screen flex">
            <Navbar handlePage={handlePage} page={page} />

            <div className="flex-1 ml-64 min-w-0 h-full flex flex-col overflow-y-auto">

                {/* Header */}
                <Header>
                    <span>Dashboard</span>
                    <span>/</span>
                    <span className="text-[#0DA071] font-semibold">Inversionistas</span>
                </Header>

                {/* Toolbar */}
                <div className="w-full h-auto mt-10">
                    <div className="w-full flex justify-end px-16">
                        <button
                            onClick={() => setOpenModal(true)}
                            className="w-auto h-5 px-5 py-5 font-semibold font-sans bg-blue-500 text-white hover:bg-blue-600 cursor-pointer transition-all duration-300 rounded-lg flex justify-center items-center gap-2"
                        >
                            <RiAddLine /> Agregar Inversionista
                        </button>
                    </div>

                    {/* Modal overlay */}
                    <div className={
                        openModal
                            ? "w-full h-full absolute inset-0 bg-gray-300/40 z-10"
                            : "hidden"
                    }>
                        <div className="w-1/2 h-fit absolute inset-0 m-auto inset-x-0 top-0 bottom-0 z-20">
                            <FormAgregar
                                titleModal="Inversionista"
                                openModal={openModal}
                                setOpenModal={setOpenModal}
                                fields={FORM_FIELDS}
                                onSubmit={handleCreate}
                                loading={saving}
                            />
                        </div>
                    </div>
                </div>

                {/* Tabla */}
                <div className="w-full h-auto py-5 px-16">
                    <TablaMostrarInfo
                        columns={COLUMNS}
                        fields={FIELDS}
                        rows={inversores}
                        loading={loading}
                        emptyText="No hay inversionistas registrados"
                        onView={handleView}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>

            </div>
        </div>
    );
}