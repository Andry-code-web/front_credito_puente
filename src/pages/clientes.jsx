import { useState, useEffect, useCallback } from "react";
import { RiAddLine } from "@remixicon/react";

import Navbar from "../components/navbar";
import Header from "../components/header";
import FormAgregar from "../components/forms/formAgregar";
import TablaMostrarInfo from "../components/tables/tablaMostrarInfo";

import {
    getClientes,
    createCliente,
    updateCliente,
    deleteCliente,
} from "../services/clientesService";

// ─── Configuración de columnas y campos ────────────────────────────────────────
const COLUMNS = ["#", "Nombres", "DNI", "Celular", "Correo", "Dirección", "Ocupación", "Ingresos"];
const FIELDS = ["id", "nombre", "dni", "celular", "correo", "direccion", "ocupacion", "ingresos"];

const FORM_FIELDS = [
    { id: "nombre", label: "Nombre", type: "text" },
    { id: "dni", label: "DNI", type: "text" },
    { id: "celular", label: "Celular", type: "text" },
    { id: "correo", label: "Correo", type: "email" },
    { id: "direccion", label: "Dirección", type: "text" },
    { id: "ocupacion", label: "Ocupación", type: "text" },
    { id: "ingresos", label: "Ingresos", type: "number" },
];

// ─── Página Clientes ────────────────────────────────────────────────────────────
export default function Clientes({ handlePage, page }) {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    // ── Carga inicial ──────────────────────────────────────────────────────────
    const fetchClientes = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getClientes();
            setClientes(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchClientes();
    }, [fetchClientes]);

    // ── Crear ──────────────────────────────────────────────────────────────────
    const handleCreate = async (formData) => {
        setSaving(true);
        try {
            await createCliente(formData);
            await fetchClientes();          // refresca la tabla
        } finally {
            setSaving(false);
        }
    };

    // ── Eliminar ───────────────────────────────────────────────────────────────
    const handleDelete = async (row) => {
        if (!window.confirm(`¿Eliminar a "${row.nombre}"?`)) return;
        try {
            await deleteCliente(row.id);
            setClientes(prev => prev.filter(c => c.id !== row.id));
        } catch (err) {
            alert(err.message);
        }
    };

    // ── Editar (placeholder — puedes ampliar con un modal de edición) ──────────
    const handleEdit = (row) => {
        console.log('Editar cliente:', row);
        // TODO: abrir modal de edición con los datos del cliente
    };

    const handleView = (row) => {
        console.log('Ver cliente:', row);
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
                    <span className="text-[#0DA071] font-semibold">Clientes</span>
                </Header>

                {/* Toolbar */}
                <div className="w-full h-auto mt-10">
                    <div className="w-full flex justify-end px-16">
                        <button
                            onClick={() => setOpenModal(true)}
                            className="w-auto h-5 px-5 py-5 font-semibold font-sans bg-blue-500 text-white hover:bg-blue-600 cursor-pointer transition-all duration-300 rounded-lg flex justify-center items-center gap-2"
                        >
                            <RiAddLine /> Agregar Cliente
                        </button>
                    </div>

                    {/* Modal overlay */}
                    <div
                        className={
                            openModal
                                ? "w-full h-full absolute inset-0 bg-gray-300/40 z-10"
                                : "hidden"
                        }
                    >
                        <div className="w-1/2 h-fit absolute inset-0 m-auto inset-x-0 top-0 bottom-0 z-20">
                            <FormAgregar
                                titleModal="Cliente"
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
                        rows={clientes}
                        loading={loading}
                        emptyText="No hay clientes registrados"
                        onView={handleView}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>

            </div>
        </div>
    );
}