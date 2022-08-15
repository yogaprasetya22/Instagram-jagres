import { atom, selector } from "recoil";
import { v1 } from "uuid";

export const modalState = atom({
    key: `modalState/${v1()}`,
    default: false,
});

export const modalComments = atom({
    key: `modalComments/${v1()}`,
    default: false,
});

export const modalDataCommentsId = atom({
    key: `modalDataCommentsId/${v1()}`,
    default: null,
});

// export const modalDataComments = selector({
//     key: `dataComments/${v1()}`,
//     get: ({ get }) => {
//         const list = get(modalDataCommentsId);
//         if (get(modalComments)) {
//             return list;
//         }
//     },
// });
