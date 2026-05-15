import { RiEyeLine, RiEditLine, RiDeleteBin7Line } from "@remixicon/react";

const ActionButton = ({ onClick, color, icon: Icon }) => (
    <button
        onClick={onClick}
        className={`p-1.5 rounded-md text-${color}-500 hover:bg-${color}-50 transition-colors duration-200 cursor-pointer`}
    >
        <Icon size={16} />
    </button>
);

export default function TablaMostrarInfo({
    data = {
        columns: [],
        clientes: [],
        inversionistas: []
    }
}) {
    return (
        <div className="w-[70vw] mx-auto overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm text-left">
                <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                        {data?.columns?.map((col) => (
                            <th
                                key={col}
                                className="px-5 py-3 font-medium text-gray-400 uppercase tracking-wider text-xs"
                            >
                                {col}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                    {data?.clientes?.map((c) => (
                        <tr
                            key={c.id}
                            className="hover:bg-gray-50/60 transition-colors duration-150"
                        >
                            <td className="px-5 py-3.5 text-gray-400 font-mono text-xs">#{c.id}</td>
                            <td className="px-5 py-3.5 text-gray-700 font-medium">{c.nombre}</td>
                            <td className="px-5 py-3.5 text-gray-500">{c.dni}</td>
                            <td className="px-5 py-3.5 text-gray-500">{c.celular}</td>
                            <td className="px-5 py-3.5 text-gray-500">{c.correo}</td>
                            <td className="px-5 py-3.5 text-gray-500">{c.direccion}</td>
                            <td className="px-5 py-3.5">
                                <div className="flex items-center gap-1">
                                    <ActionButton icon={RiEyeLine} color="yellow" onClick={() => { }} />
                                    <ActionButton icon={RiEditLine} color="blue" onClick={() => { }} />
                                    <ActionButton icon={RiDeleteBin7Line} color="red" onClick={() => { }} />
                                </div>
                            </td>
                        </tr>
                    ))}

                    {data?.inversionistas?.map((i) => (
                        <tr
                            key={i.id}
                            className="hover:bg-gray-50/60 transition-colors duration-150"
                        >
                            <td className="px-5 py-3.5 text-gray-400 font-mono text-xs">#{i.id}</td>
                            <td className="px-5 py-3.5 text-gray-700 font-medium">{i.nombre}</td>
                            <td className="px-5 py-3.5 text-gray-500">{i.dni}</td>
                            <td className="px-5 py-3.5 text-gray-500">{i.celular}</td>
                            <td className="px-5 py-3.5 text-gray-500">{i.correo}</td>
                            <td className="px-5 py-3.5 text-gray-500">{i.direccion}</td>
                            <td className="px-5 py-3.5 text-gray-500">{i.detalles}</td>
                            <td className="px-5 py-3.5">
                                <div className="flex items-center gap-1">
                                    <ActionButton icon={RiEyeLine} color="yellow" onClick={() => { }} />
                                    <ActionButton icon={RiEditLine} color="blue" onClick={() => { }} />
                                    <ActionButton icon={RiDeleteBin7Line} color="red" onClick={() => { }} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}