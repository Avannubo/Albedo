"use client"// QuillEditor.js 
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

export default function QuillEditorComponent({ value, onChange }) {
    
    const quillModules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link'],
            [{ align: [] }],
            [{ color: [] }],
            ['code-block'],
            ['clean'],
        ],
    };

    const quillFormats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'link',
        // 'image',, 'image'
        'align',
        'color',
        'code-block',
    ];

    return (
        <div className=" w-full rounded-lg">
            <QuillEditor
                value={value}
                onChange={onChange}
                modules={quillModules}
                formats={quillFormats}
                className="w-full h-[70%]  bg-white "
            />
        </div>
    );
}
