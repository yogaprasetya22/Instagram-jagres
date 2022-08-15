import React from "react";
import { useEffect } from "react";
// import * as faker from "faker";
import * as faker from "@faker-js/faker";
import { useState } from "react";
import Story from "./Story";
import { useSession } from "next-auth/react";

const Stories = () => {
    const { data: session } = useSession();
    const [suggestions, setSuggestions] = useState([]);
    useEffect(() => {
        const suggestion = [...Array(20)].map((data, i) => ({
            username: faker.faker.internet.userName(),
            avatar: faker.faker.image.faker.image.avatar(),
            id: i,
        }));
        setSuggestions(suggestion);
    }, []);
    return (
        <div className="flex space-x-2 py-5 px-4 bg-white mt-0 sm:mt-6  sm:border-gray-200 sm:border rounded-lg overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-200 sm:shadow-md sm:drop-shadow-sm">
            {session && (
                <Story
                    img={session?.user.image}
                    username={session?.user.username}
                />
            )}

            {suggestions.map((suggestion) => (
                <Story
                    key={suggestion.id}
                    img={suggestion.avatar}
                    username={suggestion.username}
                />
            ))}
        </div>
    );
};

export default Stories;
