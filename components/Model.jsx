import React, { Fragment, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
    modalState,
    modalComments,
    modalDataCommentsId,
} from "../atoms/modalAtom";
import { Dialog, Transition } from "@headlessui/react";
import {
    BookmarkIcon,
    CameraIcon,
    ChatIcon,
    DotsCircleHorizontalIcon,
    DotsHorizontalIcon,
    EmojiHappyIcon,
    HeartIcon,
    PaperAirplaneIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeardIconLikes } from "@heroicons/react/solid";
import { useRef } from "react";
import { db, storage } from "../firebase";
import {
    addDoc,
    serverTimestamp,
    onSnapshot,
    setDoc,
    doc,
    deleteDoc,
    updateDoc,
    query,
    orderBy,
    collection,
} from "@firebase/firestore";
import { useSession } from "next-auth/react";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import Moment from "react-moment";
import { ExampleComment, ExamplePosts } from "./DropDown";

const TamplateDialog = ({ children, open, setOpen }) => (
    <Transition.Root show={open} as={Fragment}>
        <Dialog
            as={"div"}
            className="fixed z-50 inset-0 overflow-y-auto"
            onClose={setOpen}
        >
            <div className="flex items-end justify-center min-h-[500px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <Transition.Child
                    as={Fragment}
                    enter="transition ease-out duration-150"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-in-out duration-150 transform"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay
                        className={
                            "fixed inset-0 bg-gray-700 bg-opacity-50 transition-opacity"
                        }
                    />
                </Transition.Child>
                <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                >
                    &#8203;
                </span>
                <Transition.Child
                    as={Fragment}
                    enter="transition ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    {children}
                </Transition.Child>
            </div>
        </Dialog>
    </Transition.Root>
);

// TODO: Upload image to firebase storage

export const UploadImgPopup = () => {
    const { data: session } = useSession();
    const [open, setOpen] = useRecoilState(modalState);
    const filePcikerRef = useRef(null);
    const captionRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [selecFile, setSelecFile] = useState(null);

    const uploadPost = async () => {
        if (loading) return;

        setLoading(true);

        const decRef = await addDoc(collection(db, "posts"), {
            username: session.user.username,
            caption: captionRef.current.value,
            profile: session.user.image,
            timestamp: serverTimestamp(),
        });

        console.log("New doc add with Id", decRef.id);

        const imageRef = ref(storage, `posts/${decRef.id}/image`);

        await uploadString(imageRef, selecFile, "data_url").then(
            async (snapshot) => {
                const downloadURL = await getDownloadURL(imageRef);
                await updateDoc(doc(db, "posts", decRef.id), {
                    image: downloadURL,
                });
            }
        );
        setOpen(false);
        setLoading(false);
        setSelecFile(null);
    };

    const addImageToPost = (e) => {
        // e.preventDefault();
        const render = new FileReader();
        if (e.target.files[0]) {
            render.readAsDataURL(e.target.files[0]);
        }
        render.onload = (readerEvent) => {
            setSelecFile(readerEvent.target.result);
        };
    };

    return (
        <TamplateDialog open={open} setOpen={setOpen}>
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6 ">
                <div>
                    {selecFile ? (
                        <img
                            src={selecFile}
                            alt=""
                            onClick={() => setSelecFile(null)}
                        />
                    ) : (
                        <div
                            onClick={() => filePcikerRef.current.click()}
                            className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer"
                        >
                            <CameraIcon
                                className="h-6 w-6 text-red-600"
                                aria-hidden="true"
                            />
                        </div>
                    )}

                    <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title
                            as="h3"
                            className="text-lg leading-6 font-medium text-gray-900"
                        >
                            Upload a photo
                        </Dialog.Title>
                        <div>
                            <input
                                type="file"
                                hidden
                                ref={filePcikerRef}
                                onChange={addImageToPost}
                                accept="image/png, image/gif, image/jpeg"
                            />
                        </div>
                        <div className="mt-2 mx-3">
                            <textarea
                                type="text"
                                ref={captionRef}
                                className={`min-h-[6rem] border-none focus:ring-0 w-full focus:outline-none text-center scrollbar-none`}
                                placeholder="Please enter a caption..."
                            />
                        </div>
                    </div>
                    <div className="mt-5 sm:mt-6">
                        <button
                            type="button"
                            disabled={!selecFile}
                            className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:text-red-700 focus:outline-none focus:row-span-1 disabled:cursor-not-allowed hover:bg-gray-400"
                            onClick={uploadPost}
                        >
                            {loading ? "Uploading..." : "Upload"}
                        </button>
                    </div>
                </div>
            </div>
        </TamplateDialog>
    );
};

// TODO: POSTINGAN

export const PostinganPopup = () => {
    const [open, setOpen] = useRecoilState(modalComments);
    const dataId = useRecoilValue(modalDataCommentsId);
    const [commets, setComments] = useState([]);
    const { data: session } = useSession();
    const [comment, setComment] = useState("");
    const [likes, setLikes] = useState([]);
    const [haslike, setHaslike] = useState(false);

    // TODO: Likesss
    useEffect(() => {
        if (dataId) {
            onSnapshot(
                collection(db, "posts", dataId.id, "likes"),
                (snapshot) => {
                    setLikes(snapshot.docs);
                }
            );
        }
    }, [db, dataId]);

    useEffect(() => {
        setHaslike(
            likes.findIndex((like) => like.id === session?.user.uid) !== -1
        );
    }, [likes]);

    const handleLike = async (e) => {
        switch (e.detail) {
            case 2: {
                if (dataId.id) {
                    await setDoc(
                        doc(db, "posts", dataId.id, "likes", session.user.uid),
                        {
                            username: session.user.username,
                        }
                    );
                }
            }
        }
    };

    const likesPost = async () => {
        if (dataId.id) {
            if (haslike) {
                await deleteDoc(
                    doc(db, "posts", dataId.id, "likes", session.user.uid),
                    {
                        username: session.user.username,
                    }
                );
            } else {
                await setDoc(
                    doc(db, "posts", dataId.id, "likes", session.user.uid),
                    {
                        username: session.user.username,
                    }
                );
            }
        }
    };

    // TODO: Comments
    useEffect(() => {
        if (dataId) {
            onSnapshot(
                query(
                    collection(db, "posts", dataId.id, "comments"),
                    orderBy("timestamp", "desc")
                ),
                (snapshot) => {
                    setComments(snapshot.docs);
                }
            );
        }
    }, [db, dataId]);

    const sendComment = async (e) => {
        e.preventDefault();
        const commentToSend = comment;
        setComment("");

        await addDoc(collection(db, "posts", dataId.id, "comments"), {
            comment: commentToSend,
            username: session.user.username,
            profile: session.user.image,
            timestamp: serverTimestamp(),
        });
    };

    return (
        <TamplateDialog open={open} setOpen={setOpen}>
            <div className="inline-flex mt-[5rem] md:mt-0 flex-col md:flex-row justify-between bg-white  text-left overflow-hidden shadow-xl transform transition-all  sm:align-middle sm:max-w-[70rem] sm:w-full relative ">
                <div className=" w-full bg-black">
                    <img
                        src={dataId?.img}
                        alt=""
                        className=" h-[35rem] w-full object-contain md:inline-block hidden"
                        onClick={(e) => handleLike(e)}
                    />
                </div>
                <div className="w-full max-w-[35rem] overflow-y-scroll scrollbar-none max-h-[26rem] ">
                    {/* top */}
                    <div className="flex items-center justify-between shadow-sm drop-shadow-sm px-4 py-3 sticky top-0 z-40 bg-white">
                        <img
                            src={dataId?.userImg}
                            alt=""
                            className="rounded-full h-10 w-10 object-contain border p-[2px] mr-3 "
                        />
                        <div className="flex-1 mx-1 flex items-center pb-2 text-sm">
                            <h2 className="font-semibold">
                                {dataId?.username}
                            </h2>
                            <p className="text-center px-1">
                                •
                                <span className="pl-1 cursor-pointer select-none">
                                    Diikuti
                                </span>
                            </p>
                        </div>
                        <ExamplePosts
                            id={dataId?.id}
                            username={dataId?.username}
                        />
                    </div>
                    {/* middle */}
                    <div>
                        <div className="flex items-center justify-between py-3 z-40 bg-white ">
                            <div className="flex-1 mx-1 flex items-start pb-2 text-sm flex-col">
                                <div className="text-start px-2 flex mb-4">
                                    <img
                                        src={dataId?.userImg}
                                        alt=""
                                        className="rounded-full h-10 w-10 object-contain border p-[2px] mr-3 "
                                    />
                                    <p className="mt-2 max-w-[30rem] break-words">
                                        <span className="pr-2 font-semibold text-center">
                                            {dataId?.username}
                                        </span>
                                        {dataId?.caption}
                                    </p>
                                </div>
                                <CommentHandler
                                    commets={commets}
                                    session={session}
                                    dataId={dataId}
                                />
                            </div>
                        </div>
                    </div>
                    {/* bottom */}

                    <div className="flex items-center flex-col shadow-sm drop-shadow-sm px-4 fixed w-[35rem] bottom-0 z-20 bg-white  border-t-[1px]">
                        <div className="w-full">
                            <div className="flex justify-between px-4 pt-2 ">
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
                                    <ChatIcon className="btn" />
                                    <PaperAirplaneIcon className=" rotate-90 btn" />
                                </div>
                                <BookmarkIcon className="btn" />
                            </div>
                            <div className="px-5 truncate text-md flex flex-col pt-2">
                                {likes.length > 0 && (
                                    <p className="font-semibold text-gray-800 select-none">
                                        {likes.length}{" "}
                                        {likes.length > 1 ? "likes" : "like"}
                                    </p>
                                )}
                                <p className="text-[10px] text-gray-400 pb-1 select-none">
                                    2 JAM YANG LALU
                                </p>
                            </div>
                        </div>
                        <div className="w-full  border-t-[1px]">
                            <form className="flex items-center py-2 px-4">
                                <EmojiHappyIcon className="h-7" />
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
                        </div>
                    </div>
                </div>
            </div>
        </TamplateDialog>
    );
};

const CommentHandler = ({ commets, session, dataId }) => {
    const [likes, setLikes] = useState([]);
    const [haslike, setHaslike] = useState(false);
    const [commentsId, setCommentsId] = useState([]);

    return (
        <>
            {commets?.map((dat, i) => (
                <div className="text-start px-2 flex mb-4  w-full" key={i}>
                    <img
                        src={dat.data().profile}
                        alt=""
                        className="rounded-full h-10 w-10 object-contain border p-[2px] mr-3 "
                    />
                    <div className="mt-2 max-w-[28rem] break-words flex-1">
                        <span className="pr-2 font-semibold text-center">
                            {dat.data().username}
                        </span>
                        {dat.data().comment}
                        <br />
                        <div className="flex flex-row space-x-5 font-semibold text-[12px] text-gray-600">
                            {" "}
                            <Moment fromNow>
                                {dat.data().timestamp?.seconds * 1000}
                            </Moment>
                            {/* {likeComment.length > 0 && (
                                <p>
                                    <span className="text-[14px] text-black">
                                        {likeComment.length}{" "}
                                    </span>
                                    {likeComment.length > 1 ? "likes" : "like"}
                                </p>
                            )} */}
                            <div className="flex items-center pl-1 ">
                                {session.user.username ===
                                    dat.data().username && (
                                    <ExampleComment
                                        id={dataId?.id}
                                        username={dataId?.username}
                                        commentsId={dat?.id}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className=" flex items-center">
                        <LikeComments
                            dataId={dataId.id}
                            commentsId={dat.id}
                            setCommentsId={setCommentsId}
                        />
                    </div>
                </div>
            ))}
        </>
    );
};

const LikeComments = ({ dataId, username, commentsId, setCommentsId }) => {
    // TODO: Likesss
    // useEffect(() => {
    //     if (dataId) {
    //         onSnapshot(
    //             collection(
    //                 db,
    //                 "posts",
    //                 dataId,
    //                 "comments",
    //                 commentsId,
    //                 "likes"
    //             ),
    //             (snapshot) => {
    //                 console.log(snapshot.docs);
    //             }
    //         );
    //     }
    // }, [dataId]);

    // useEffect(() => {
    //     setHaslike(
    //         likes.findIndex((like) => like.id === session?.user.uid) !== -1
    //     );
    // }, [likes]);

    return (
        <>
            <HeartIcon
                className="btn w-4 h-4"
                // onClick={() => commentslike(dat?.id)}
            />
        </>
    );
};
