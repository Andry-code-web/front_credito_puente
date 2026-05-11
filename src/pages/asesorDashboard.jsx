import Navbar from "../components/navbar";
import Header from "../components/header";
import CardDatos from "../components/cardDatos";
import CardActividad from "../components/cardActividad";
import ChartsMetas, { CellPieExample, TinyBarChart } from "../components/charts";
import {
    RiMoneyDollarCircleLine,
} from "@remixicon/react";

export default function AsesorDashboard() {
    return (
        <section className="w-screen h-screen bg-white flex">
            <Navbar />

            <div className="w-[80vw] h-full flex flex-col">
                <Header />

                <div className="flex flex-row w-full h-auto">
                    <div className="w-full h-fit grid grid-cols-2 gap-5 p-5">
                        <CardDatos title="Prestamos" icon={<RiMoneyDollarCircleLine size={20} color="#0DA071" />} amount="15" description="Activos" />
                        <CardDatos title="Comisiones" icon={<RiMoneyDollarCircleLine size={20} color="#0DA071" />} amount="10" description="Pendientes" />
                        <CardDatos title="Inversionistas" icon={<RiMoneyDollarCircleLine size={20} color="#0DA071" />} amount="10" description="Activos" />
                        <CardDatos title="Clientes" icon={<RiMoneyDollarCircleLine size={20} color="#0DA071" />} amount="100" description="Activos" />
                    </div>

                    <div className="w-full h-auto flex justify-evenly px-5 py-5 gap-5 bg-gray-100/30">
                        <CellPieExample />
                    </div>
                </div>

                <div>
                    <CardActividad />
                </div>
            </div>
        </section>
    )
}