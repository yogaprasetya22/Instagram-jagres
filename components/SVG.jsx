export function EditInactiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 13V16H7L16 7L13 4L4 13Z"
                fill="#EDE9FE"
                stroke="#101010"
                strokeWidth="2"
            />
        </svg>
    );
}

export function EditActiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 13V16H7L16 7L13 4L4 13Z"
                fill="#eaeaea"
                stroke="#000"
                strokeWidth="2"
            />
        </svg>
    );
}

export function DuplicateInactiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 4H12V12H4V4Z"
                fill="#EDE9FE"
                stroke="#101010"
                strokeWidth="2"
            />
            <path
                d="M8 8H16V16H8V8Z"
                fill="#EDE9FE"
                stroke="#101010"
                strokeWidth="2"
            />
        </svg>
    );
}

export function DuplicateActiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 4H12V12H4V4Z"
                fill="#eaeaea"
                stroke="#000"
                strokeWidth="2"
            />
            <path
                d="M8 8H16V16H8V8Z"
                fill="#eaeaea"
                stroke="#000"
                strokeWidth="2"
            />
        </svg>
    );
}

export function ArchiveInactiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="5"
                y="8"
                width="10"
                height="8"
                fill="#EDE9FE"
                stroke="#101010"
                strokeWidth="2"
            />
            <rect
                x="4"
                y="4"
                width="12"
                height="4"
                fill="#EDE9FE"
                stroke="#101010"
                strokeWidth="2"
            />
            <path d="M8 12H12" stroke="#101010" strokeWidth="2" />
        </svg>
    );
}

export function ArchiveActiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="5"
                y="8"
                width="10"
                height="8"
                fill="#eaeaea"
                stroke="#000"
                strokeWidth="2"
            />
            <rect
                x="4"
                y="4"
                width="12"
                height="4"
                fill="#eaeaea"
                stroke="#000"
                strokeWidth="2"
            />
            <path d="M8 12H12" stroke="#101010" strokeWidth="2" />
        </svg>
    );
}

export function MoveInactiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M10 4H16V10" stroke="#101010" strokeWidth="2" />
            <path d="M16 4L8 12" stroke="#101010" strokeWidth="2" />
            <path d="M8 6H4V16H14V12" stroke="#101010" strokeWidth="2" />
        </svg>
    );
}

export function MoveActiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M10 4H16V10" stroke="#000" strokeWidth="2" />
            <path d="M16 4L8 12" stroke="#000" strokeWidth="2" />
            <path d="M8 6H4V16H14V12" stroke="#000" strokeWidth="2" />
        </svg>
    );
}

export function DeleteInactiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="5"
                y="6"
                width="10"
                height="10"
                fill="#EDE9FE"
                stroke="#101010"
                strokeWidth="2"
            />
            <path d="M3 6H17" stroke="#101010" strokeWidth="2" />
            <path d="M8 6V4H12V6" stroke="#101010" strokeWidth="2" />
        </svg>
    );
}

export function DeleteActiveIcon(props) {
    return (
        <svg
            {...props}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                x="5"
                y="6"
                width="10"
                height="10"
                fill="#eaeaea"
                stroke="#000"
                strokeWidth="2"
            />
            <path d="M3 6H17" stroke="#000" strokeWidth="2" />
            <path d="M8 6V4H12V6" stroke="#000" strokeWidth="2" />
        </svg>
    );
}

export function UserProfile(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
        </svg>
    );
}
