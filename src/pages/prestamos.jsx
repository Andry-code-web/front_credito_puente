import { useState, useEffect, useCallback } from "react";

import Navbar from "../components/navbar";
import Header from "../components/header";
import TablaMostrarInfo from "../components/tables/tablaMostrarInfo";

import { getPrestamos, deletePrestamo } from "../services/prestamosService";

// ─── Columnas y campos ──────────────────────────────────────────────────────────
const COLUMNS = [
    "#",
    "Cliente",
    "Monto",
    "Interés (%)",
    "Meses",
    "Fecha inicio",
    "Estado",
];
const FIELDS = [
    "id",
    "cliente_nombre",
    "monto",
    "interes",
    "meses",
    "fecha_inicio",
    "estado",
];

// ─── Helpers ────────────────────────────────────────────────────────────────────
function formatRow(p) {
    return {
        ...p,
        // Intenta resolver el nombre del cliente desde distintas estructuras
        cliente_nombre:
            p.cliente_nombre ??
            p.cliente?.nombre ??
            p.nombre_cliente ??
            `Cliente #${p.cliente_id ?? p.clienteId ?? "—"}`,
        monto:
            p.monto != null
                ? Number(p.monto).toLocaleString("es-PE", {
                      style: "currency",
                      currency: "PEN",
                  })
                : "—",
        interes: p.interes != null ? `${p.interes}%` : "—",
        fecha_inicio: p.fecha_inicio
            ? new Date(p.fecha_inicio).toLocaleDateString("es-PE")
            : "—",
        estado: p.estado ?? "—",
    };
}

// ─── Página Préstamos ───────────────────────────────────────────────────────────
export default function Prestamos({ handlePage, page, onLogout }) {
    const [prestamos, setPrestamos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // ── Carga ──────────────────────────────────────────────────────────────────
    const fetchPrestamos = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getPrestamos();
            // La API puede devolver array directamente o envuelto en { prestamos: [] }
            const list = Array.isArray(data)
                ? data
                : data?.prestamos ?? data?.data ?? [];
            setPrestamos(list.map(formatRow));
        } catch (err) {
            console.error(err);
            setError(err.message || "Error al cargar los préstamos");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPrestamos();
    }, [fetchPrestamos]);

    // ── Eliminar ───────────────────────────────────────────────────────────────
    const handleDelete = async (row) => {
        if (!window.confirm(`¿Eliminar el préstamo #${row.id}?`)) return;
        try {
            await deletePrestamo(row.id);
            setPrestamos((prev) => prev.filter((p) => p.id !== row.id));
        } catch (err) {
            alert(err.message || "Error al eliminar el préstamo");
        }
    };

    // ── Ver ────────────────────────────────────────────────────────────────────
    const handleView = (row) => {
        console.log("Ver préstamo:", row);
        // TODO: abrir panel de detalle / modal con el cronograma
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
                    <span className="text-[#0DA071] font-semibold">Préstamos</span>
                </Header>

                {/* Contenido */}
                <div className="w-full h-auto mt-10 px-16 flex flex-col gap-4">

                    {/* Resumen rápido */}
                    <div className="flex gap-4 mb-2">
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-6 py-4 flex flex-col gap-1">
                            <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                                Total préstamos
                            </span>
                            <span className="text-2xl font-bold text-gray-700">
                                {loading ? "…" : prestamos.length}
                            </span>
                        </div>
                    </div>

                    {/* Alerta de error */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 text-sm">
                            {error}
                            <button
                                onClick={fetchPrestamos}
                                className="ml-4 underline font-medium cursor-pointer"
                            >
                                Reintentar
                            </button>
                        </div>
                    )}

                    {/* Tabla */}
                    <TablaMostrarInfo
                        columns={COLUMNS}
                        fields={FIELDS}
                        rows={prestamos}
                        loading={loading}
                        emptyText="No hay préstamos registrados"
                        onView={handleView}
                        onDelete={handleDelete}
                    />
                </div>
            </div>
        </div>
    );
}
