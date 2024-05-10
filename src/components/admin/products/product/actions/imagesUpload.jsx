import React from 'react';
import uploadFiles from '@/lib/data'; // Assuming this is correctly configured

export default function ImagesUpload() {
    const handleFileChange = (event) => {
        const formData = new FormData();
        const files = event.target.files;

        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }

        uploadFiles(formData)
            .then(response => {
                //console.log(response); // Log or handle the response as needed
            })
            .catch(error => {
                console.error('Error uploading files:', error);
            });
    };

    return (
        <div className="flex-1 mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Images</label>
            <input
                onChange={handleFileChange}
                type="file"
                multiple
                accept="image/*"
                className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-[#304590] focus:border-[#304590]" required
            />
        </div>
    );
}
