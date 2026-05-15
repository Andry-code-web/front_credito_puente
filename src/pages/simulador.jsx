import Navbar from "../components/navbar";
import Header from "../components/header";
import FormSimulador from "../components/forms/formSimulador";
import CardResultados from "../components/cardResulSimulador";
import TablaSimulacion from "../components/tables/tablaSimulacion";

export default function Simulador({ handlePage, page }) {
    return (
        <section className="w-screen h-screen flex">
            <Navbar handlePage={handlePage} page={page} />

            <div className="flex-1 ml-64 min-w-0 h-full flex flex-col overflow-y-auto">
                <Header>
                    <span>Dashboard</span>
                    <span>/</span>
                    <span className="text-[#0DA071] font-semibold">
                        Simulación
                    </span>
                </Header>

                <div className="w-4/5 h-auto flex flex-row gap-5 mx-auto mt-10">

                    <div className="w-2/3 h-auto">
                        <FormSimulador />
                    </div>

                    {/* mostrar los resultados de la simulacion en una tarjeta */}
                    <div className="w-1/3 h-auto">
                        <CardResultados />
                    </div>
                </div>

                {/* mostrar la simulacion en una tabla */}
                <div className="w-full h-auto py-5 px-16">
                    <TablaSimulacion />
                </div>
            </div>
        </section>
    )
}