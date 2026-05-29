
import { getAuthUser } from '../services/authService';
import { useState, useEffect } from 'react';

export default function Header({ children }) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        const authUser = getAuthUser();
        setUser(authUser);
    }, []);

    const avatarUrl = user?.rol === 'asesor' ? 'https://i.pravatar.cc/150?img=33' : 'https://i.pravatar.cc/150?img=12';

    return (
        <header className="w-[85vw] h-20 py-4 flex justify-between items-center px-10">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
                {children}
            </div>

            {/* Perfil de usuario */}
            <div className="flex items-center gap-2 me-5">



                <img
                    src={avatarUrl}
                    alt="avatar"
                    className="w-12 h-12 rounded-full object-cover"
                />


                <div className=" flex flex-col justify-start items-start">
                    <h2 className="text-[#0DA071] font-bold font-sans text-sm">{user?.nombre || "..."}</h2>
                    <p className="text-gray-400 font-regular font-sans text-sm">{user?.rol || "..."}</p>
                </div>
            </div>
        </header>
    )
}