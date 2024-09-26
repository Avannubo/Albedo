"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import "@/app/globals.css";

// Dynamic import of ReactQuill, disabling SSR
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// Import Quill and extend it to preserve styles and classes
import { Quill } from "react-quill";

// Create a custom matcher for images to preserve inline styles
const Block = Quill.import("blots/block");
Block.tagName = "DIV"; // Handle image better inside div instead of default P tag
Quill.register(Block, true);

const ImageFormat = Quill.import("formats/image");
ImageFormat.className = "float-right"; // Preserve the float-right class for images
Quill.register(ImageFormat, true);

// Simple function to format (pretty-print) HTML
const formatHTML = (html) => {
    const tab = "\t";
    let result = "";
    let indent = "";

    // Split at the start of a tag (<), instead of splitting between tags (><)
    html.split(/(?=<)/g).forEach((element) => {
        if (element.match(/^<\/\w/)) indent = indent.substring(tab.length); // Decrease indent for closing tags
        result += `${indent}${element.trim()}\n`; // Add trimmed element
        if (element.match(/^<\w[^>]*[^/]$/)) indent += tab; // Increase indent for opening tags
    });

    return result.trim(); // Remove leading/trailing whitespace
};

export default function QuillEditorComponent({ value, onChange }) {
    const [editorHtml, setEditorHtml] = useState(value || ""); // Initialize with prop value
    const [rawHtml, setRawHtml] = useState(value || ""); // Sync with initial value
    const [showRaw, setShowRaw] = useState(false); // Toggle view

    // Update rawHtml when editorHtml changes (used when rich text is active)
    useEffect(() => {
        if (!showRaw) {
            setRawHtml(formatHTML(editorHtml)); // Sync raw HTML to formatted editor HTML
        }
    }, [editorHtml, showRaw]);

    // Update editorHtml when rawHtml changes (used when raw text is active)
    useEffect(() => {
        if (showRaw) {
            setEditorHtml(rawHtml); // Sync editor HTML to raw HTML
        }
    }, [rawHtml, showRaw]);

    const quillModules = {
        toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ align: [] }], // Default alignment
            ["blockquote"],
            ["link", "image"], // Can also add 'video'
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            ["clean"], // Removes formatting
        ],
    };

    const handleEditorChange = (html) => {
        setEditorHtml(html); // Sync rich text changes
        if (!showRaw) onChange(html); // If in rich text mode, propagate changes upward
    };

    const handleRawChange = (e) => {
        const updatedRawHtml = e.target.value;
        setRawHtml(updatedRawHtml); // Sync raw HTML changes
        if (showRaw) {
            setEditorHtml(updatedRawHtml); // Force re-render Quill when switching back
            onChange(updatedRawHtml); // If in raw text mode, propagate changes upward
        }
    };

    const toggleRawView = () => {
        setShowRaw(!showRaw); // Toggle between views
        // When switching to raw view, format the HTML for better readability
        if (!showRaw) {
            setRawHtml(formatHTML(editorHtml)); // Format the HTML when switching to raw mode
        }
    };

    const CustomToolbar = ({ onClickRaw }) => (
        <button onClick={onClickRaw}>
            <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M2 11V13C2 16.7712 2 18.6569 3.17157 19.8284C4.34315 21 6.22876 21 10 21H14C17.7712 21 19.6569 21 20.8284 19.8284C22 18.6569 22 16.7712 22 13V11C22 7.22876 22 5.34315 20.8284 4.17157C19.6569 3 17.7712 3 14 3H10C6.22876 3 4.34315 3 3.17157 4.17157C2.51839 4.82475 2.22937 5.69989 2.10149 7"
                    stroke="#44403C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
                <path d="M15 3L15 13M15 17L15 21" stroke="#44403C" strokeWidth="1.5" strokeLinecap="round" />
                <path
                    d="M6 14L5 15L6 16M10.5 16L11.5 17L10.5 18M9 14L7.5 18"
                    stroke="#44403C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    );

    return (
        <div className="w-full rounded-lg">
            <CustomToolbar onClickRaw={toggleRawView} />
            <div className="text-editor">
                {!showRaw ? (
                    <ReactQuill
                        value={editorHtml}
                        onChange={handleEditorChange}
                        modules={quillModules}
                        theme="snow"
                        className="w-full h-[50%] bg-white"
                    />
                ) : (
                    <textarea
                        className="w-full h-[250px] p-2 border bg-gray-100 text-gray-800"
                        value={rawHtml}
                        onChange={handleRawChange}
                        style={{ fontFamily: "monospace", whiteSpace: "pre-wrap" }} // Apply custom CSS for raw editing
                    />
                )}
            </div>
        </div>
    );
}
