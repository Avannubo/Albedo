// QuillEditor.js 
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles 

const QuillEditor = dynamic(() => import('react-quill'), { ssr: false });

export default function QuillEditorComponent({ value = "" }) { // Default to an empty string

    return (
        <div className="w-full rounded-lg quill-editor-container no-padding">
            <QuillEditor
                value={value}
                readOnly={true} // Set to false if you want to allow editing
                className="w-full h-full bg-transparent border-none"
                modules={{ toolbar: false }} // Disable toolbar
            />
        </div>
    );
}
