import React, { useEffect, useRef } from "react";

export default function HTMLPreviewComponent({ content }) {
    const contentRef = useRef(null);

    useEffect(() => {
        const contentDiv = contentRef.current;
        if (contentDiv) {
            contentDiv.innerHTML = content; // Set the HTML content directly
        }
    }, [content]);

    return (
        <div className="w-full my-6 bg-white overflow-hidden border-none no-scrollbar font-helvetica font-normal">
            <div
                ref={contentRef}
                className="w-full h-full"
                style={{ overflow: "hidden" }}
            />
        </div>
    );
}
