import { async } from "@firebase/util";
import {
    addDoc,
    collection,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { Suspense, useEffect, useState } from "react";
import Feed from "../components/Feed";
import Headers from "../components/Headers";
import { PostinganPopup, UploadImgPopup } from "../components/Model";
import NavMobile from "../components/NavMobile";
import { db } from "../firebase";

export default function Home() {
    const { data: session } = useSession();
    useEffect(() => {
        const PostUser = () => {
            const username = session?.user.username;
            onSnapshot(
                query(collection(db, "users"), orderBy("timestamp", "desc")),
                (snapshot) => {
                    snapshot.docs.map(async (data) => {
                        if (username) {
                            if (data.data().username === username) {
                                console.log("user sudah ada");
                            } else {
                                if (session) {
                                    await addDoc(collection(db, "users"), {
                                        email: session?.user.email,
                                        image: session?.user.image,
                                        name: session?.user.name,
                                        uid: session?.user.uid,
                                        username: session?.user.username,
                                        timestamp: serverTimestamp(),
                                    });
                                }
                            }
                        }
                    });
                }
            );
        };

        PostUser();
    }, []);
    return (
        <div className=" h-screen bg-gray-50 overflow-auto md:mb-0 mb-[3rem]">
            <Head>
                <title>Instagram - clone</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Headers />
            <Suspense
                fallback={
                    <div className=" h-screen w-full flex justify-center items-center bg-red-50">
                        Loading..
                    </div>
                }
            >
                <Feed />
            </Suspense>
            {/* model */}
            <UploadImgPopup />
            <PostinganPopup />
            <NavMobile />
        </div>
    );
}
