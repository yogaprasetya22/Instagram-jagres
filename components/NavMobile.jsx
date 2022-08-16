import { HomeIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

const NavMobile = () => {
    const [open, setOpen] = useRecoilState(modalState);
    const router = useRouter();
    const { data: session } = useSession();
    return (
        <div className=" fixed bottom-0 w-full bg-white px-10 py-3 flex justify-between">
            <div>
                {" "}
                <HomeIcon
                    onClick={() => router.push("/")}
                    className="h-10 w-10 cursor-pointer "
                />
            </div>
            <div>
                <PlusCircleIcon
                    onClick={() => setOpen(true)}
                    className="h-10 w-10 cursor-pointer"
                />
            </div>
            <div>
                <img
                    src={session?.user.image}
                    layout="fill"
                    className="h-10 w-10 cursor-pointer rounded-full "
                />
            </div>
        </div>
    );
};

export default NavMobile;
