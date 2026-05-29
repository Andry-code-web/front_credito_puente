import { useState, useEffect, useCallback } from "react";
import { RiAddLine } from "@remixicon/react";

import Navbar from "../components/navbar";
import Header from "../components/header";
import FormAgregar from "../components/forms/formAgregar";
import TablaMostrarInfo from "../components/tables/tablaMostrarInfo";

import {
    getUsuarios,
    createUsuario,
    deleteUsuario,
} from "../services/usuariosservice";

// ─── Configuración de columnas y campos ────────────────────────────────────────
const COLUMNS = ["#", "Usuario", "Nombres", "Correo", "Rol", "Agencia", "Activo"];
const FIELDS = ["id", "usuario", "nombre", "correo", "rol", "agencia", "is_active"];

const FORM_FIELDS = [
    { id: "nombre", label: "Nombre", type: "text" },
    { id: "usuario", label: "Usuario", type: "text" },
    { id: "correo", label: "Correo", type: "email" },
    { id: "celular", label: "Celular", type: "text" },
    { id: "password", label: "Contraseña", type: "password" },

    {
        id: "rol",
        label: "Rol",
        type: "select",
        options: [
            { value: "admin", label: "Administrador" },
            { value: "asesor", label: "Asesor" },
        ],
    },

    {
        id: "agencia",
        label: "Agencia",
        type: "select",
        options: [
            { value: "agencia1", label: "Agencia 1" },
            { value: "agencia2", label: "Agencia 2" },
            { value: "agencia3", label: "Agencia 3" },
        ],
    },
];

// ─── Página Usuarios ────────────────────────────────────────────────────────────
export default function Usuarios({ handlePage, page, onLogout }) {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    // ── Carga inicial ──────────────────────────────────────────────────────────
    const fetchUsuarios = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getUsuarios();
            setUsuarios(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUsuarios();
    }, [fetchUsuarios]);

    // ── Crear ──────────────────────────────────────────────────────────────────
    const handleCreate = async (formData) => {
        setSaving(true);
        try {
            // Aseguramos que is_active sea true por defecto
            await createUsuario({ ...formData, is_active: 1 });
            await fetchUsuarios();          // refresca la tabla
        } finally {
            setSaving(false);
        }
    };

    // ── Eliminar ───────────────────────────────────────────────────────────────
    const handleDelete = async (row) => {
        if (!window.confirm(`¿Eliminar al usuario "${row.usuario}"?`)) return;
        try {
            await deleteUsuario(row.id);
            setUsuarios(prev => prev.filter(c => c.id !== row.id));
        } catch (err) {
            alert(err.message);
        }
    };

    // ── Editar (placeholder) ──────────
    const handleEdit = (row) => {
        console.log('Editar usuario:', row);
        // TODO: abrir modal de edición
    };

    const handleView = (row) => {
        console.log('Ver usuario:', row);
    };

    // ── Render ─────────────────────────────────────────────────────────────────
    return (
        <div className="w-screen h-screen flex">
            <Navbar handlePage={handlePage} page={page} onLogout={onLogout} />

            <div className="flex-1 ml-64 min-w-0 h-full flex flex-col overflow-y-auto">

                {/* Header */}
                <Header>
                    <span>Dashboard</span>
                    <span>/</span>
                    <span className="text-[#0DA071] font-semibold">Usuarios</span>
                </Header>

                {/* Toolbar */}
                <div className="w-full h-auto mt-10">
                    <div className="w-full flex justify-end px-16">
                        <button
                            onClick={() => setOpenModal(true)}
                            className="w-auto h-5 px-5 py-5 font-semibold font-sans bg-blue-500 text-white hover:bg-blue-600 cursor-pointer transition-all duration-300 rounded-lg flex justify-center items-center gap-2"
                        >
                            <RiAddLine /> Agregar Usuario
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
                                titleModal="Usuario"
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
                        rows={usuarios}
                        loading={loading}
                        emptyText="No hay usuarios registrados"
                        onView={handleView}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </div>

            </div>
        </div>
    );
}
