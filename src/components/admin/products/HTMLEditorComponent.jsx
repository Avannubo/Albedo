import React, { useState, useEffect, useRef } from "react";

export default function HTMLEditorComponent({ value, onChange }) {
    const [htmlContent, setHtmlContent] = useState(value || "");
    const [rawHtml, setRawHtml] = useState(value || "");
    const [showRaw, setShowRaw] = useState(true);
    const iframeRef = useRef(null);

    useEffect(() => {
        if (!showRaw) {
            setRawHtml(htmlContent); // Sync raw HTML to formatted editor HTML
            updateIframeContent();
        }
    }, [htmlContent, showRaw]);

    const updateIframeContent = () => {
        const iframe = iframeRef.current;
        if (iframe) {
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            doc.open();
            doc.write(htmlContent);
            doc.close();
        }
    };

    const handleRawChange = (e) => {
        const updatedRawHtml = e.target.value;
        setRawHtml(updatedRawHtml);
        setHtmlContent(updatedRawHtml); // Update HTML content as raw changes
        onChange(updatedRawHtml); // Propagate changes upward
    };

    const toggleRawView = () => {
        setShowRaw(!showRaw); // Toggle between raw and rendered views
    };

    const handleEditorChange = (e) => {
        const updatedHtml = e.target.value;
        setHtmlContent(updatedHtml); // Update editor content
        onChange(updatedHtml); // Propagate changes upward
    };

    return (
        <div className="w-full rounded-lg">
            
            <div className="text-editor">
                {!showRaw ? (
                    <iframe
                        ref={iframeRef}
                        title="HTML Preview"
                        sandbox="allow-scripts allow-same-origin" // Relaxing restrictions
                        className="w-full h-auto min-h-[200px] bg-white border rounded"
                    />
                ) : (
                    <textarea
                        className="w-full h-auto min-h-[200px] p-2 border bg-gray-100 text-gray-800"
                        value={rawHtml}
                        onChange={handleRawChange}
                        style={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }} // Apply custom CSS for raw editing
                    />
                )}
            </div> 
            <button onClick={toggleRawView} className="mt-2 font-medium p-2 bg-gray-300 rounded">
                {showRaw ? "Prevista" : "Editar Html"}
            </button>
        </div>
    );
}
