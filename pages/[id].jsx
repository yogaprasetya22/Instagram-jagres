import Head from "next/head";
import React from "react";
import Headers from "../components/Headers";
import { PostinganPopup, UploadImgPopup } from "../components/Model";
import NavMobile from "../components/NavMobile";
import Profiles from "../components/Profiles";

const Profile = ({ id, url }) => {
    return (
        <div className=" h-screen bg-gray-50 overflow-auto md:mb-0 mb-[5rem]">
            <Head>
                <title>Instagram - {id}</title>
                <meta
                    name={`instagram-jagres-${id}`}
                    content={`instagram-jagres-${id}`}
                />
            </Head>
            <Headers />
            <Profiles id={id} url={url} />
            <UploadImgPopup />
            <PostinganPopup />
            <NavMobile />
        </div>
    );
};

export default Profile;

export const getServerSideProps = async (ctx) => {
    const url = ctx.req.url;
    if (ctx.query.id) {
        return {
            props: {
                id: ctx.query.id,
                url,
            },
        };
    } else {
        return {
            props: {
                id: null,
                url: null,
            },
        };
    }
};
