import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Post from "./Post";
import * as faker from "@faker-js/faker";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(
        () =>
            onSnapshot(
                query(collection(db, "posts"), orderBy("timestamp", "desc")),
                (snapshot) => {
                    setPosts(snapshot.docs);
                }
            ),
        [db]
    );

    // ! Faker Values
    // const [suggestions, setSuggestions] = useState([]);
    // useEffect(() => {
    //     const suggestion = [...Array(10)].map((data, i) => ({
    //         username: faker.faker.internet.userName(),
    //         userImg: faker.faker.image.faker.image.avatar(),
    //         img: faker.faker.image.faker.image.city(),
    //         caption: faker.faker.lorem.sentence(),
    //         id: i,
    //     }));
    //     setSuggestions(suggestion);
    // }, []);
    return (
        <div>
            {posts.map((post) => (
                <Post
                    key={post.id}
                    id={post.id}
                    username={post.data().username}
                    userImg={post.data().profile}
                    img={post.data().image}
                    caption={post.data().caption}
                />
            ))}
            {/*//! Faker Value */}
            {/* {suggestions.map((suggestion) => (
                <Post
                    key={suggestion.id}
                    id={suggestion.id}
                    username={suggestion.username}
                    userImg={suggestion.userImg}
                    img={suggestion.img}
                    caption={suggestion.caption}
                />
            ))} */}
        </div>
    );
};

export default Posts;
