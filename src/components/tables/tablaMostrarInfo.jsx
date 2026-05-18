import { RiEyeLine, RiEditLine, RiDeleteBin7Line } from "@remixicon/react";

const ActionButton = ({ onClick, color, icon: Icon, title }) => (
    <button
        onClick={onClick}
        title={title}
        className={`p-1.5 rounded-md text-${color}-500 hover:bg-${color}-50 transition-colors duration-200 cursor-pointer`}
    >
        <Icon size={16} />
    </button>
);

/**
 * Tabla genérica de datos.
 *
 * Props:
 *   - columns: string[]           — encabezados de columna
 *   - rows: object[]              — arreglo de objetos; las keys deben coincidir con `fields`
 *   - fields: string[]            — keys del objeto a mostrar (en orden)
 *   - onView?:   (row) => void
 *   - onEdit?:   (row) => void
 *   - onDelete?: (row) => void
 *   - loading?:  boolean
 *   - emptyText?: string
 */
export default function TablaMostrarInfo({
    columns = [],
    rows = [],
    fields = [],
    onView,
    onEdit,
    onDelete,
    loading = false,
    emptyText = 'Sin registros',
}) {
    const hasActions = onView || onEdit || onDelete;

    return (
        <div className="w-[70vw] mx-auto overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm text-left">
                <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                        {columns.map((col) => (
                            <th
                                key={col}
                                className="px-5 py-3 font-medium text-gray-400 uppercase tracking-wider text-xs"
                            >
                                {col}
                            </th>
                        ))}
                        {hasActions && (
                            <th className="px-5 py-3 font-medium text-gray-400 uppercase tracking-wider text-xs">
                                Acciones
                            </th>
                        )}
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                    {loading ? (
                        <tr>
                            <td
                                colSpan={columns.length + (hasActions ? 1 : 0)}
                                className="px-5 py-8 text-center text-gray-400 text-sm"
                            >
                                Cargando...
                            </td>
                        </tr>
                    ) : rows.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length + (hasActions ? 1 : 0)}
                                className="px-5 py-8 text-center text-gray-400 text-sm"
                            >
                                {emptyText}
                            </td>
                        </tr>
                    ) : (
                        rows.map((row, idx) => (
                            <tr
                                key={row.id ?? idx}
                                className="hover:bg-gray-50/60 transition-colors duration-150"
                            >
                                {fields.map((field, fi) => (
                                    <td
                                        key={fi}
                                        className={
                                            fi === 0
                                                ? 'px-5 py-3.5 text-gray-400 font-mono text-xs'
                                                : fi === 1
                                                    ? 'px-5 py-3.5 text-gray-700 font-medium'
                                                    : 'px-5 py-3.5 text-gray-500'
                                        }
                                    >
                                        {fi === 0 ? `#${row[field]}` : row[field]}
                                    </td>
                                ))}

                                {hasActions && (
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-1">
                                            {onView && (
                                                <ActionButton
                                                    icon={RiEyeLine}
                                                    color="yellow"
                                                    title="Ver"
                                                    onClick={() => onView(row)}
                                                />
                                            )}
                                            {onEdit && (
                                                <ActionButton
                                                    icon={RiEditLine}
                                                    color="blue"
                                                    title="Editar"
                                                    onClick={() => onEdit(row)}
                                                />
                                            )}
                                            {onDelete && (
                                                <ActionButton
                                                    icon={RiDeleteBin7Line}
                                                    color="red"
                                                    title="Eliminar"
                                                    onClick={() => onDelete(row)}
                                                />
                                            )}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}