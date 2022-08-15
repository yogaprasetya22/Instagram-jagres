import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import * as faker from "@faker-js/faker";

const Sugestion = () => {
    const [suggestions, setSuggestions] = useState([]);
    useEffect(() => {
        const suggestion = [...Array(5)].map((data, i) => ({
            username: faker.faker.internet.userName(),
            userImg: faker.faker.image.faker.image.avatar(),
            img: faker.faker.image.faker.image.city(),
            compeny: faker.faker.company.companyName(),
            id: i,
        }));
        setSuggestions(suggestion);
    }, []);
    return (
        <div className="mt-4 ml-8">
            <div className="flex justify-between text-sm ">
                <h3 className="text-sm font-bold text-gray-400">
                    Suggestions for you
                </h3>
                <button className="text-gray-600 font-semibold">See All</button>
            </div>
            {suggestions.map((suggestion) => (
                <div
                    key={suggestion.id}
                    className="flex items-center justify-between mt-3"
                >
                    <img
                        src={suggestion.userImg}
                        className="w-10 h-10 rounded-full border p-[2px]"
                        alt=""
                    />
                    <div className="flex-1 ml-4">
                        <h2 className=" font-bold text-sm">
                            {suggestion.username}
                        </h2>
                        <h3 className="text-xs text-gray-400 truncate max-w-[10rem]">
                            Work at {suggestion.compeny}
                        </h3>
                    </div>
                    <button className="text-blue-400 font-semibold text-sm">
                        Follow
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Sugestion;
