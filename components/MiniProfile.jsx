import React from "react";
import { signOut, useSession } from "next-auth/react";

const MiniProfile = () => {
    const { data: session } = useSession();
    
    return (
        <div className="flex items-center mt-10 ml-8 justify-between ">
            <img
                src={session?.user.image}
                alt=""
                className="rounded-full h-16 w-16 object-contain border p-[2px] mr-3"
            />
            <div className="flex-1 mx-2">
                <h2 className="font-bold pb-2">{session?.user.username}</h2>
                <h3 className="text-sm text-gray-400 truncate max-w-[10rem]">
                    Welcomeback to my channel
                </h3>
            </div>
            <button
                onClick={signOut}
                className="text-blue-400 text-sm font-semibold"
            >
                Sign Out
            </button>
        </div>
    );
};

export default MiniProfile;
