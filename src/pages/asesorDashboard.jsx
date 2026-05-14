import Navbar from "../components/navbar";
import Header from "../components/header";
import CardDatos from "../components/cardDatos";
import CardActividad from "../components/cardActividad";
import ChartsMetas, { CellPieExample, TinyBarChart } from "../components/charts";
import {
    RiMoneyDollarCircleLine,
} from "@remixicon/react";

export default function AsesorDashboard({ handlePage, page }) {
    return (
        <section className="w-screen h-screen bg-white flex">
            <Navbar handlePage={handlePage} page={page} />

            <div className="w-[85vw] h-full flex flex-col">
                <Header>
                    <p className="text-[#0DA071] font-semibold">Dashboard</p>
                </Header>

                <div className="flex flex-row w-full h-auto">
                    <div className="w-full h-fit grid grid-cols-2 gap-5 p-5">
                        <CardDatos title="Prestamos" icon={<RiMoneyDollarCircleLine size={20} color="#0DA071" />} amount="15" description="Activos" />
                        <CardDatos title="Comisiones" icon={<RiMoneyDollarCircleLine size={20} color="#0DA071" />} amount="10" description="Pendientes" />
                        <CardDatos title="Inversionistas" icon={<RiMoneyDollarCircleLine size={20} color="#0DA071" />} amount="10" description="Activos" />
                        <CardDatos title="Clientes" icon={<RiMoneyDollarCircleLine size={20} color="#0DA071" />} amount="100" description="Activos" />
                    </div>

                    <div className="w-full h-auto flex justify-center items-center px-5 py-5 gap-5">
                        <CellPieExample />
                    </div>
                </div>

                <div className="w-full h-auto py-5 px-16">
                    <CardActividad />
                </div>
            </div>
        </section>
    )
}