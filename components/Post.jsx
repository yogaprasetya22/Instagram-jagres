import {
    BookmarkIcon,
    ChatIcon,
    EmojiHappyIcon,
    PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/outline";
import { HeartIcon as HeardIconLikes } from "@heroicons/react/solid";
import React, { useDebugValue } from "react";
import { useSession } from "next-auth/react";
import {
    addDoc,
    collection,
    serverTimestamp,
    query,
    onSnapshot,
    orderBy,
    setDoc,
    doc,
    deleteDoc,
} from "@firebase/firestore";
import { db } from "../firebase";
import Moment from "react-moment";
import {
    modalComments,
    modalDataComments,
    modalDataCommentsId,
} from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { ExamplePosts } from "./DropDown";
import Emoji from "./Emoji";

const Post = ({ username, userImg, img, caption, id }) => {
    const { data: session } = useSession();
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [open, setOpen] = useRecoilState(modalComments);
    const [likes, setLikes] = useState([]);
    const [haslike, setHaslike] = useState(false);
    const [dataComments, setDataComments] = useRecoilState(modalDataCommentsId);

    // TODO: Emoji
    const EmojiOnClick = (e, emojiObject) => {
        setComment(comment + emojiObject.emoji);
    };

    // TODO: Likesss
    useEffect(() => {
        onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
            setLikes(snapshot.docs);
        });
    }, [db, id]);

    useEffect(() => {
        setHaslike(
            likes.findIndex((like) => like.id === session?.user.uid) !== -1
        );
    }, [likes, session]);

    const likesPost = async () => {
        if (haslike) {
            await deleteDoc(doc(db, "posts", id, "likes", session.user.uid), {
                username: session.user.username,
            });
        } else {
            await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
                username: session.user.username,
            });
        }
    };

    const handleLike = async (e) => {
        switch (e.detail) {
            case 2: {
                await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
                    username: session.user.username,
                });
            }
        }
    };

    // TODO: Comments
    useEffect(
        () =>
            onSnapshot(
                query(
                    collection(db, "posts", id, "comments"),
                    orderBy("timestamp", "desc")
                ),
                (snapshot) => {
                    setComments(snapshot.docs);
                }
            ),
        [db, id]
    );

    const handleComments = () => {
        setDataComments({
            id,
            username,
            caption,
            img,
            userImg,
        });
        setOpen(true);
    };

    const sendComment = async (e) => {
        e.preventDefault();
        const commentToSend = comment;
        setComment("");

        await addDoc(collection(db, "posts", id, "comments"), {
            comment: commentToSend,
            username: session.user.username,
            profile: session.user.image,
            timestamp: serverTimestamp(),
        });
    };
    return (
        <div className="bg-white my-7 border-none sm:border rounded-lg shadow-md drop-shadow-sm">
            {/* headers */}{" "}
            <div className="flex items-center px-3 py-2 justify-between">
                <img
                    src={userImg}
                    className="rounded-full h-12 w-12 object-contain border p-1 mr-3 cursor-pointer"
                    alt=""
                />
                <p className="flex-1 font-bold text-sm ">{username}</p>
                <ExamplePosts id={id} username={username} />
            </div>
            {/* img */}
            <img
                src={img}
                alt={username}
                className="object-contain w-full cursor-pointer"
                onClick={(e) => handleLike(e)}
            />
            {/* Button */}
            <div className="flex justify-between px-4 pt-3">
                <div className="flex space-x-4 ">
                    {session && (
                        <>
                            {haslike ? (
                                <HeardIconLikes
                                    onClick={likesPost}
                                    className="btn text-red-500"
                                />
                            ) : (
                                <HeartIcon
                                    onClick={likesPost}
                                    className="btn"
                                />
                            )}
                        </>
                    )}
                    <ChatIcon onClick={handleComments} className="btn" />
                    <PaperAirplaneIcon className=" rotate-90 btn" />
                </div>
                <BookmarkIcon className="btn" />
            </div>
            {/* caption */}
            <div className="px-5  text-md flex flex-col pt-1 max-w-xl">
                {likes.length > 0 && (
                    <p className="font-semibold text-gray-800">
                        {likes.length} {likes.length > 1 ? "likes" : "like"}
                    </p>
                )}
                <div className="flex flex-row pb-3">
                    <span className="font-bold  mr-2">{username}</span>
                    <p className="truncate"> {caption}</p>
                </div>
            </div>
            {/* Comment */}
            {comments.length > 0 ? (
                <div
                    onClick={() => handleComments()}
                    className="text-sm text-gray-500 font-semibold cursor-pointer px-5  "
                >
                    <p>
                        {comments.length > 1
                            ? ` Lihat semua ${comments.length} komentar`
                            : `Lihat ${comments.length} komentar`}
                    </p>
                </div>
            ) : (
                <div
                    onClick={() => handleComments()}
                    className="text-sm text-gray-500 font-semibold cursor-pointer px-5"
                >
                    <p>Berikan Komentar</p>
                </div>
            )}
            {/* input box */}
            {session && (
                <form className="flex items-center p-4 ">
                    <Emoji EmojiOnClick={EmojiOnClick} />
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full px-3 py-2  rounded-lg outline-none"
                        placeholder="Add a comment..."
                    />
                    <button
                        disabled={!comment.trim()}
                        onClick={sendComment}
                        type="submit"
                        className="font-bold text-sm "
                    >
                        Post
                    </button>
                </form>
            )}
        </div>
    );
};

export default Post;
