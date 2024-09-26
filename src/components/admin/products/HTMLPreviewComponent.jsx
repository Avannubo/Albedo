import React, { useEffect, useRef } from "react";

export default function HTMLPreviewComponent({ content }) {
    const iframeRef = useRef(null);

    useEffect(() => {
        const iframe = iframeRef.current;
        if (iframe) {
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            doc.open();
            doc.write(content);
            doc.close();

            // Adjust the iframe height to fit the content
            iframe.onload = () => {
                iframe.style.height = `${doc.body.scrollHeight}px`;
                iframe.style.overflow = "hidden";
            };
        }
    }, [content]);

    return (
        <div className="w-full h-auto overflow-hidden">
            <iframe
                ref={iframeRef}
                title="HTML Preview"
                sandbox="allow-scripts allow-same-origin"
                className="w-full bg-white overflow-hidden border-none no-scrollbar font-helvetica font-normal"
                style={{ overflow: 'hidden' }} // Hide overflow
            />
        </div>
    );
}
