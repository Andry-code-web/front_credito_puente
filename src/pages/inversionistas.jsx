import Navbar from "../components/navbar";
import Header from "../components/header";
import FormAgregar from "../components/forms/formAgregar";
import TablaMostrarInfo from "../components/tables/tablaMostrarInfo";
import { RiAddLine } from "@remixicon/react";
import { useState } from "react";

export default function Inversionistas({ handlePage, page }) {
    const [openModal, setOpenModal] = useState(false);
    return (
        <section className="w-screen h-screen flex">
            <Navbar handlePage={handlePage} page={page} />

            <div className="flex-1 ml-64 min-w-0 h-full flex flex-col overflow-y-auto">
                <Header>
                    <span>Dashboard</span>
                    <span>/</span>
                    <span className="text-[#0DA071] font-semibold">
                        Inversionistas
                    </span>
                </Header>

                <div className="w-full h-auto mt-10">
                    <div className="w-full flex justify-end px-16">
                        <button onClick={() => setOpenModal(true)} className="w-auto h-5 px-5 py-5 font-semibold font-sans bg-blue-500 text-white hover:bg-blue-600 cursor-pointer transition-all duration-300 rounded-lg flex justify-center items-center gap-2">
                            <RiAddLine /> Agregar inversionista
                        </button>
                    </div>
                    <div className={
                        openModal
                            ? "w-full h-full absolute inset-0 m-auto inset-x-0 top-0 bottom-0 bg-gray-300/40 z-10"
                            : "hidden"
                    }>
                        <div className="w-1/2 h-fit absolute inset-0 m-auto inset-x-0 top-0 bottom-0 z-20">
                            <FormAgregar
                                openModal={openModal}
                                setOpenModal={setOpenModal}
                                fields={[
                                    { id: "nombre", label: "Nombre", type: "text" },
                                    { id: "dni", label: "DNI", type: "text" },
                                    { id: "celular", label: "Celular", type: "text" },
                                    { id: "correo", label: "Correo", type: "email" },
                                    { id: "direccion", label: "Direccion", type: "text" },
                                    { id: "monto", label: "Monto", type: "number" },
                                    { id: "detalles", label: "Detalles", type: "text" },
                                ]}
                                titleModal="Inversionista"
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full h-auto py-5 px-16">
                    <TablaMostrarInfo data={{
                        columns: ["#", "Nombres", "DNI", "Celular", "Correo", "Dirección", "Detalles", "Acciones"],
                        inversionistas: [
                            { id: "01", nombre: "Pedro Sánchez", dni: "12345678", celular: "987654321", correo: "pedrosanchezc@email.com", direccion: "Jr. Cuzco 123", detalles: "Detalles 1" },
                            { id: "02", nombre: "María García", dni: "87654321", celular: "912345678", correo: "mariagarcia@email.com", direccion: "Av. Los Libertadores 456", detalles: "Detalles 2" },
                        ]
                    }} />
                </div>
            </div>
        </section>
    )
}