import Head from "next/head";
import { Suspense, useEffect } from "react";
import Feed from "../components/Feed";
import Headers from "../components/Headers";
import { PostinganPopup, UploadImgPopup } from "../components/Model";
import { useSelector } from "react-redux";

export default function Home() {
    // const currentComments = useSelector((state) => state.Comments);
    // useEffect(() => {
    //     console.log(currentComments);
    // }, [currentComments]);
    const datas = {
        data: [
            {
                comment: "kontol kontol kontol kontol jontol kontol",
                profile:
                    "https://lh3.googleusercontent.com/a/AItbvmkm85vaLACq2sfUPFoLZNWDi2C2woTgmO_UWb4W=s96-c",
                username: "YogaprasetyaUye",
            },
            {
                comment: "ngentoooot",
                profile:
                    "https://lh3.googleusercontent.com/a/AItbvmkm85vaLACq2sfUPFoLZNWDi2C2woTgmO_UWb4W=s96-c",
                username: "YogaprasetyaUye",
            },
            {
                comment: "konz",
                profile:
                    "https://lh3.googleusercontent.com/a/AItbvmkm85vaLACq2sfUPFoLZNWDi2C2woTgmO_UWb4W=s96-c",
                username: "YogaprasetyaUye",
            },
        ],
    };
    return (
        <div className=" h-screen bg-gray-50 overflow-auto">
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
        </div>
    );
}
