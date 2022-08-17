import React from "react";
import { DotsHorizontalIcon, EmojiHappyIcon } from "@heroicons/react/outline";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

import dynamic from "next/dynamic";
const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
    ssr: false,
});

const Emoji = ({ EmojiOnClick }) => {
    return (
        <div className="pt-1">
            <Menu as="div" className="relative inline-block text-center">
                <div>
                    <Menu.Button>
                        <EmojiHappyIcon className="h-7" />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                >
                    <Menu.Items className="absolute -top-[22rem] -right-13 mt-2 w-[15rem]">
                        <div className="px-1 py-1 ">
                            <EmojiPicker
                                onEmojiClick={EmojiOnClick}
                                className="h-full w-full scrollbar-none"
                            />
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
};

export default Emoji;
