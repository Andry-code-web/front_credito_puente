export function InfoPrestamo() {
    return (
        <div className="flex justify-between">
            <div className="flex gap-2">
                {/* fecha */}
                <div className="w-12 h-12 flex justify-center items-center border-4 border-double border-green-600 rounded-full">
                    <p className="text-xs font-semibold font-sans text-gray-500">02/26</p>
                </div>

                {/* monto y tasa de interes y tipo de prestamo */}
                <div className="gap-5">
                    <h2 className="text-base font-bold font-sans text-gray-500">15,000.00 S/.</h2>
                    <div className="flex gap-2">
                        <p className="text-sm font-semibold font-sans text-gray-500">12%</p>
                        <p className="text-sm font-semibold font-sans text-gray-500">Hipotecario</p>
                    </div>
                </div>
            </div>

            {/* id */}
            <div className="ms-5">
                <p className="text-gray-300 font-sans font-regular">#150</p>
            </div>
        </div>
    )
}