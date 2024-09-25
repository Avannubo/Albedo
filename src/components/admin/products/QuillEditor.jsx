"use client"// QuillEditor.js 
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

export default function QuillEditorComponent({ value, onChange }) {

    const quillModules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            // toggled buttons
            [{ 'align': [] }],
            ['blockquote', 'code-block'],

            ['link', 'image'],//'video',

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],

            // [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            // [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            // [{ 'direction': 'rtl' }],                         // text direction

            [{ 'color': [] },// { 'background': [] }
            ],          // dropdown with defaults from theme
            // [{ 'font': [] }],


            ['clean']
        ],
    };

    // const quillFormats = [
    //     'header',
    //     'bold',
    //     'italic',
    //     'underline',
    //     'strike',
    //     'blockquote',
    //     'list',
    //     'bullet',
    //     ['link', 'image'],
    //     'align',
    //     'color',
    //     'code-block',
    // ];

    return (
        <div className=" w-full rounded-lg">
            <QuillEditor
                value={value}
                onChange={onChange}
                modules={quillModules}
                // formats={quillFormats}
                className="w-full h-[50%] bg-white "
                
            />
        </div>
    );
}
