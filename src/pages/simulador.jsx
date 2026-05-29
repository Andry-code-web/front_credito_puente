import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Header from "../components/header";
import FormSimulador from "../components/forms/formSimulador";
import CardResultados from "../components/cardResulSimulador";
import TablaSimulacion from "../components/tables/tablaSimulacion";
import { getClientes } from "../services/clientesService";
import { getInversores } from "../services/inversoresService";
import { simularCredito, crearPrestamo } from "../services/simulacionService";

export default function Simulador({ handlePage, page, onLogout }) {
    const [clientes, setClientes] = useState([]);
    const [inversores, setInversores] = useState([]);
    const [simulationResult, setSimulationResult] = useState(null);
    const [selectedClienteName, setSelectedClienteName] = useState("—");
    const [moneda, setMoneda] = useState("pen");

    const [loadingSimulate, setLoadingSimulate] = useState(false);
    const [loadingSave, setLoadingSave] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Carga de maestros
    useEffect(() => {
        async function loadMasterData() {
            try {
                const [cData, iData] = await Promise.all([
                    getClientes().catch(() => []),
                    getInversores().catch(() => [])
                ]);
                setClientes(cData);
                setInversores(iData);
            } catch (err) {
                console.error("Error al cargar datos maestros:", err);
            }
        }
        loadMasterData();
    }, []);

    // Manejador de Simulación
    const handleSimulate = async (formData) => {
        setLoadingSimulate(true);
        setError(null);
        setSuccessMessage(null);
        try {
            // Buscamos el nombre del cliente seleccionado
            const cli = clientes.find(c => String(c.id) === String(formData.cliente_id));
            setSelectedClienteName(cli ? cli.nombre : "Cliente no seleccionado");
            setMoneda(formData.moneda || "pen");

                       const result = await simularCredito({
                monto: formData.monto_prestamo,
                interes: formData.tasa_interes,
                meses: formData.meses,
                fecha_inicio: formData.created_at
            });
            setSimulationResult({
                ...result,
                formData: formData
            });
        } catch (err) {
            setError(err.message || "Error al realizar la simulación");
        } finally {
            setLoadingSimulate(false);
        }
    };

    // Manejador de Guardar Préstamo
    const handleSave = async (formData) => {
        if (!simulationResult) return;
        setLoadingSave(true);
        setError(null);
        setSuccessMessage(null);
        try {
            const dataToSave = {
                monto: parseFloat(formData.monto_prestamo),
                moneda: formData.moneda || "pen",
                interes: parseFloat(formData.tasa_interes),
                meses: parseInt(formData.meses),
                tipo_pago: formData.tipo_pago || "mensual",
                fecha_inicio: formData.created_at,
                id_cliente: parseInt(formData.cliente_id),
                id_inversor: parseInt(formData.inversionista_id),
                id_asesor: 1, // Por defecto asesor 1
                status: "pending"
            };
            const response = await crearPrestamo(dataToSave);
            setSuccessMessage("Préstamo y cuotas creados exitosamente en la base de datos.");
            // Resetear simulación después de guardar con éxito
            setSimulationResult(null);
            setSelectedClienteName("—");
            setMoneda("pen");
        } catch (err) {
            setError(err.message || "Error al crear el préstamo");
        } finally {
            setLoadingSave(false);
        }
    };

    const handleClear = () => {
        setSimulationResult(null);
        setSelectedClienteName("—");
        setMoneda("pen");
        setError(null);
        setSuccessMessage(null);
    };

    return (
        <section className="w-screen h-screen flex">
            <Navbar handlePage={handlePage} page={page} onLogout={onLogout} />

            <div className="flex-1 ml-64 min-w-0 h-full flex flex-col overflow-y-auto">
                <Header>
                    <span>Dashboard</span>
                    <span>/</span>
                    <span className="text-[#0DA071] font-semibold">
                        Simulación
                    </span>
                </Header>

                {error && (
                    <div className="mx-16 mt-6 px-4 py-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                        {error}
                    </div>
                )}

                {successMessage && (
                    <div className="mx-16 mt-6 px-4 py-2 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg">
                        {successMessage}
                    </div>
                )}

                <div className="w-4/5 h-auto flex flex-row gap-5 mx-auto mt-10">
                    <div className="w-2/3 h-auto">
                        <FormSimulador
                            clientes={clientes}
                            inversores={inversores}
                            onSimulate={handleSimulate}
                            onSave={handleSave}
                            onClear={handleClear}
                            simulationResult={simulationResult}
                            loadingSimulate={loadingSimulate}
                            loadingSave={loadingSave}
                        />
                    </div>

                    {/* mostrar los resultados de la simulacion en una tarjeta */}
                    <div className="w-1/3 h-auto">
                        <CardResultados
                            simulationResult={simulationResult}
                            clienteName={selectedClienteName}
                            moneda={moneda}
                        />
                    </div>
                </div>

                {/* mostrar la simulacion en una tabla */}
                <div className="w-full h-auto py-5 px-16">
                    <TablaSimulacion
                        cuotas={simulationResult?.cuotas || []}
                        moneda={moneda}
                    />
                </div>
            </div>
        </section>
    );
}