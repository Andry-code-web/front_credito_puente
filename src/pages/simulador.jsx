import Navbar from "../components/navbar";
import Header from "../components/header";
import FormSimulador from "../components/forms/formSimulador";
import CardResultados from "../components/cardResulSimulador";

export default function Simulador({ handlePage, page }) {
    return (
        <section className="w-screen h-screen flex">
            <Navbar handlePage={handlePage} page={page} />

            <div className="w-[85vw] h-full flex flex-col">
                <Header>
                    <span>Dashboard</span>
                    <span>/</span>
                    <span className="text-[#0DA071] font-semibold">
                        Simulación
                    </span>
                </Header>

                <div className="w-4/5 h-auto flex flex-row gap-5 mx-auto">

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

                </div>
            </div>
        </section>
    )
}