"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import "@/app/globals.css";

// Dynamic import of ReactQuill, disabling SSR
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false }); 
export default function QuillEditorComponent({ value, onChange }) {
    const quillModules = {
        toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ align: [] }], // Default alignment
            ["blockquote"],
            ["link"], // Can also add 'video'
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            ["clean"], // Removes formatting
        ],
    }; 

    return (
        <div className="w-full rounded-lg">
            <div className="text-editor">
                    <ReactQuill
                    value={value}
                    onChange={onChange}
                        modules={quillModules}
                        theme="snow"
                        className="w-full h-[50%] bg-white"
                    />
            </div>
        </div>
    );
}
