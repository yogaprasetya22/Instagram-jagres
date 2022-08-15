import React from "react";
import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Sugestion from "./Sugestion";
import { useSession } from "next-auth/react";

const Feed = () => {
    const { data: session } = useSession();
    
    return (
        <main
            className={`grid grid-cols-1 md:grid-cols-2 md:max-w-3xl lg:grid-cols-3 lg:max-w-4xl mx-auto ${
                !session && "!grid-cols-1 !max-w-3xl"
            }`}
        >
            {/* Section */}
            <section className="col-span-2 ">
                {/* stori */}
                <Stories />
                {/* post */}
                <Posts />
            </section>

            {session && (
                <section className="hidden lg:inline-grid md:col-span-1">
                    <div className="fixed">
                        <MiniProfile />
                        <Sugestion />
                    </div>
                    {/* mini profil */}
                </section>
            )}
        </main>
    );
};

export default Feed;
