import {
    RiMoneyDollarCircleLine,
} from "@remixicon/react";

import { TitlePrincipal, TitleSecundario } from "../components/titles";
import { InfoPrestamo } from "./infoPrestamo";
import { InfoInversionista, InfoPrestatarios } from "./infoClientes";

export default function CardActividad() {

    const data = {
        title: "Actividad reciente",
        suptitle: "Prestamo concedido",
    }

    return (
        <>
            <TitlePrincipal titulo={data.title} />

            <div className="w-full grid grid-cols-2 gap-10 mt-5">
                <div className="flex flex-col gap-5 p-5 rounded-lg shadow-lg shadow-gray-500/20">
                    <InfoPrestamo />
                    <div className="grid grid-cols-2 gap-5">
                        <InfoInversionista />
                        <InfoPrestatarios />
                    </div>
                </div>
                <div className="flex flex-col gap-5 p-5 rounded-lg shadow-lg shadow-gray-500/20">
                    <InfoPrestamo />
                    <div className="grid grid-cols-2 gap-5">
                        <InfoInversionista />
                        <InfoPrestatarios />
                    </div>
                </div>

                <div className="flex flex-col gap-5 p-5 rounded-lg shadow-lg shadow-gray-500/20">
                    <InfoPrestamo />
                    <div className="grid grid-cols-2 gap-5">
                        <InfoInversionista />
                        <InfoPrestatarios />
                    </div>
                </div>
                <div className="flex flex-col gap-5 p-5 rounded-lg shadow-lg shadow-gray-500/20">
                    <InfoPrestamo />
                    <div className="grid grid-cols-2 gap-5">
                        <InfoInversionista />
                        <InfoPrestatarios />
                    </div>
                </div>

            </div>
        </>
    )
}