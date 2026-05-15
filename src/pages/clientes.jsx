import Navbar from "../components/navbar";
import Header from "../components/header";
import FormAgregar from "../components/forms/formAgregar";
import TablaMostrarInfo from "../components/tables/tablaMostrarInfo";
import { RiAddLine } from "@remixicon/react";

export default function Clientes({ handlePage, page }) {
    return (
        <div className="w-screen h-screen flex">
            <Navbar handlePage={handlePage} page={page} />

            <div className="flex-1 ml-64 min-w-0 h-full flex flex-col overflow-y-auto">
                <Header>
                    <span>Dashboard</span>
                    <span>/</span>
                    <span className="text-[#0DA071] font-semibold">
                        Clientes
                    </span>


                </Header>

                <div className="w-full h-auto mt-10">
                    <div className="w-full flex justify-end px-16">
                        <button className="w-52 h-5 px-5 py-5 font-semibold font-sans bg-blue-500 text-white hover:bg-blue-600 cursor-pointer transition-all duration-300 rounded-lg flex justify-center items-center gap-2">
                            <RiAddLine /> Agregar Cliente
                        </button>
                    </div>
                    <div className="w-full h-full absolute inset-0 m-auto inset-x-0 top-0 bottom-0 bg-gray-300/40 z-10 hidden">
                        <div className="w-1/2 h-104 absolute inset-0 m-auto inset-x-0 top-0 bottom-0 z-20">
                            <FormAgregar />
                        </div>
                    </div>
                </div>

                <div className="w-full h-auto py-5 px-16">
                    <TablaMostrarInfo data={{
                        columns: ["#", "Nombres", "DNI", "Celular", "Correo", "Dirección", "Acciones"],
                        clientes: [
                            { id: "01", nombre: "Juan Pérez", dni: "12345678", celular: "987654321", correo: "juan@email.com", direccion: "Av. Lima 123" },
                            { id: "02", nombre: "María García", dni: "87654321", celular: "912345678", correo: "maria@email.com", direccion: "Jr. Cusco 456" },
                        ]

                    }} />
                </div>
            </div>
        </div>
    )
}