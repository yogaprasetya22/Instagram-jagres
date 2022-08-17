import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

const Profiles = ({ id, url }) => {
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);

    useEffect(
        () =>
            onSnapshot(
                query(collection(db, "posts"), orderBy("timestamp", "desc")),
                (snapshot) => {
                    snapshot.docs.map((data) => {
                        if (data.data().username === id) {
                            console.log(data.data());
                        }
                    });
                }
            ),
        [db]
    );

    return (
        <main
            className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl lg:grid-cols-3 lg:max-w-4xl mx-auto ${
                !session && "!grid-cols-1 !max-w-3xl"
            }`}
        >
            <div>
                <img src={posts.profile} alt="" />
            </div>
        </main>
    );
};

export default Profiles;
