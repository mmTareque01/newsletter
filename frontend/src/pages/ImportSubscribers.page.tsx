// 'use client'
// import Loading from '@/app/loading';
// import Select from '@/components/Select';
// import { Title } from '@/components/typography';
// import { useNewsletter } from '@/hooks/callAPI.tsx/useNewsletter';
// import { useSubscribers } from '@/hooks/callAPI.tsx/useSubscriber';
// // import { createBulkProject } from '@/backend/controller/createProject.controller';
// import { useAppStore } from '@/stores/app.store';
// import { useNewsletterTypesStore } from '@/stores/newsletterTypes.store';
// import React, { useRef, useState } from 'react';
// import { FiDownload } from 'react-icons/fi';

// // Sample template structure
// const sampleProjectTemplate = [
//     {
//         "email": "user1@example.com",
//         "name": "User One",
//     }
// ];

// const GetDataFormat = () => {
//     const handleDownloadTemplate = () => {
//         const blob = new Blob([JSON.stringify(sampleProjectTemplate, null, 2)], { type: 'application/json' });
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'projects_template.json';
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//         URL.revokeObjectURL(url);
//     };
//     return (
//         <button
//             onClick={handleDownloadTemplate}
//             className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
//         >
//             <FiDownload className="text-lg" />
//             <span>Download Template</span>
//         </button>
//     )
// }

// export default function ImportSubscribers() {
//     const { setHeader } = useAppStore();
//     const fileInputRef = useRef<HTMLInputElement>(null);
//     const [loading, setLoading] = useState(false);

//     const { handleGetAllNewsletterTypes } = useNewsletter();
//     const { allNewsletterTypes } = useNewsletterTypesStore();
//     const {handleCreateBulkSubscriber} = useSubscribers();

//     const handleBrowseClick = () => {
//         fileInputRef.current?.click();
//     };





//     const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const file = e.target.files?.[0];

//         if (file && file.type === 'application/json') {
//             setLoading(true);
//             const reader = new FileReader();
//             reader.onload = async (event) => {
//                 try {
//                     const result = event.target?.result;
//                     if (typeof result === 'string') {
//                         let jsonData = JSON.parse(result);

//                         // If the JSON is an array, filter out objects with empty title
//                         if (Array.isArray(jsonData)) {
//                             jsonData = jsonData.filter(item => item.title && item.title.trim() !== '');
//                         }

//                         console.log("Filtered JSON Data:", jsonData);
//                         // await createBulkProject(jsonData);
//                         alert('Successfully created new projects');
//                     } else {
//                         console.error("File content is not a string.");
//                     }
//                 } catch (error) {
//                     console.error("Invalid JSON file:", error);
//                     alert('Something went wrong!');
//                 } finally {
//                     setLoading(false);
//                 }
//             };
//             reader.readAsText(file);
//         } else {
//             alert('Please upload a valid JSON file.');
//         }
//     };

//     React.useEffect(() => {
//         setHeader(
//             <div className='flex items-center justify-between gap-4'>
//                 <Title>Import Subscribers</Title>
//                 <GetDataFormat />
//             </div>

//         )
//         handleGetAllNewsletterTypes();
//     }, [])

//     return (
//         <>
//             {loading && <Loading />}

//             <div className="rounded-2xl shadow-lg relative flex size-full  flex-col bg-white justify-between group/design-root overflow-x-hidden">
//                 <div>
//                     <div className="flex flex-col p-4 gap-4">
//                         <div className="flex justify-between items-center">
//                             <p className="text-[#111418] text-base font-normal leading-normal">
//                                 Upload a JSON file with your subscribers' data to import them into your newsletter.
//                             </p>
//                             <Select options={allNewsletterTypes.map(type => ({ id: type.id, label: type.title }))} onSelect={(value) => console.log(value)} label='Select Newsletter Type' />
//                         </div>

//                         <div className="flex flex-col items-center gap-6 rounded-lg border-2 border-dashed border-[#dbe0e6] px-6 py-14">
//                             <div className="flex max-w-[480px] flex-col items-center gap-2">
//                                 <p className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">
//                                     Drag and drop your JSON file here
//                                 </p>
//                                 <p className="text-[#111418] text-sm font-normal leading-normal max-w-[480px] text-center">
//                                     Or
//                                 </p>
//                             </div>
//                             <button
//                                 className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#e0e2e5] transition-colors"
//                                 onClick={handleBrowseClick}
//                             >
//                                 <span className="truncate">Browse Files</span>
//                             </button>

//                             {/* Hidden file input */}
//                             <input
//                                 type="file"
//                                 accept="application/json"
//                                 ref={fileInputRef}
//                                 onChange={handleFileChange}
//                                 style={{ display: 'none' }}
//                             />
//                         </div>


//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }



'use client'
import Loading from '@/app/loading';
import Select from '@/components/Select';
import { Title } from '@/components/typography';
import { useNewsletter } from '@/hooks/callAPI.tsx/useNewsletter';
import { useSubscribers } from '@/hooks/callAPI.tsx/useSubscriber';
import { useAppStore } from '@/stores/app.store';
import { useNewsletterTypesStore } from '@/stores/newsletterTypes.store';
import React, { useRef, useState } from 'react';
import { FiDownload, FiUpload } from 'react-icons/fi';
import { toast } from 'react-toastify';

// Sample template structure
const sampleProjectTemplate = [
    {
        "email": "user1@example.com",
        "name": "User One",
    },
    {
        "email": "user2@example.com",
        "name": "User Two",
    }
];

const GetDataFormat = () => {
    const handleDownloadTemplate = () => {
        const blob = new Blob([JSON.stringify(sampleProjectTemplate, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'subscribers_template.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    return (
        <button
            onClick={handleDownloadTemplate}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
        >
            <FiDownload className="text-lg" />
            <span>Download Template</span>
        </button>
    )
}

export default function ImportSubscribers() {
    const { setHeader } = useAppStore();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedNewsletterType, setSelectedNewsletterType] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const { handleGetAllNewsletterTypes } = useNewsletter();
    const { allNewsletterTypes } = useNewsletterTypesStore();
    const { handleCreateBulkSubscriber } = useSubscribers();

    const handleBrowseClick = () => {
        fileInputRef.current?.click();
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (file && file.type === 'application/json') {
            setSelectedFile(file);
        } else {
            toast.error('Please upload a valid JSON file.');
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === 'application/json') {
            setSelectedFile(file);
        } else {
            toast.error('Please upload a valid JSON file.');
        }
    };

    const handleUpload = async () => {
        if (!selectedNewsletterType) {
            toast.error('Please select a newsletter type');
            return;
        }

        if (!selectedFile) {
            toast.error('Please select a file to upload');
            return;
        }

        console.log({
            subscribers: selectedFile,
            newsletterTypeId: selectedNewsletterType,
        })
        // return 0;

        setLoading(true);
        try {
            const reader = new FileReader();
            reader.onload = async (event) => {
                try {
                    const result = event.target?.result;
                    if (typeof result === 'string') {
                        const jsonData = JSON.parse(result);

                        if (!Array.isArray(jsonData)) {
                            throw new Error('JSON file should contain an array of subscribers');
                        }

                        // Validate each subscriber has required fields
                        const invalidSubscribers = jsonData.filter(
                            sub => !sub.email || typeof sub.email !== 'string'
                        );

                        if (invalidSubscribers.length > 0) {
                            throw new Error(`${invalidSubscribers.length} subscribers are missing required email field`);
                        }

                        // Prepare data for API
                        const uploadData = {
                            subscribers: selectedFile,
                            newsletterTypeId: selectedNewsletterType,
                        };

                        await handleCreateBulkSubscriber(uploadData);
                        // toast.success('Subscribers imported successfully!');
                        setSelectedFile(null);
                        if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                        }
                    }
                } catch (error) {
                    console.error("Error processing file:", error);
                    toast.error(error instanceof Error ? error.message : 'Failed to process file');
                } finally {
                    setLoading(false);
                }
            };
            reader.readAsText(selectedFile);
        } catch (error) {
            console.error("Upload error:", error);
            toast.error('Failed to upload subscribers');
            setLoading(false);
        }
    };

    React.useEffect(() => {
        setHeader(
            <div className='flex items-center justify-between gap-4'>
                <Title>Import Subscribers</Title>
                <GetDataFormat />
            </div>
        );
        handleGetAllNewsletterTypes();
    }, []);

    return (
        <>
            {loading && <Loading />}

            <div className="rounded-2xl shadow-lg relative flex size-full flex-col bg-white justify-between group/design-root overflow-x-hidden">
                <div>
                    <div className="flex flex-col p-4 gap-4">
                        <div className="flex justify-between items-center">
                            <p className="text-[#111418] text-base font-normal leading-normal">
                                Upload a JSON file with your subscribers' data to import them into your newsletter.
                            </p>
                            <Select
                                options={allNewsletterTypes.map(type => ({ id: type.id, label: type.title }))}
                                onSelect={(value) => setSelectedNewsletterType(value)}
                                label='Select Newsletter Type'
                                required
                            />
                        </div>

                        <div
                            className={`flex flex-col items-center gap-6 rounded-lg border-2 border-dashed ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-[#dbe0e6]'} px-6 py-14`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <div className="flex max-w-[480px] flex-col items-center gap-2">
                                {selectedFile ? (
                                    <>
                                        <p className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">
                                            {selectedFile.name}
                                        </p>
                                        <p className="text-[#111418] text-sm font-normal leading-normal max-w-[480px] text-center">
                                            {(selectedFile.size / 1024).toFixed(2)} KB
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">
                                            Drag and drop your JSON file here
                                        </p>
                                        <p className="text-[#111418] text-sm font-normal leading-normal max-w-[480px] text-center">
                                            Or
                                        </p>
                                    </>
                                )}
                            </div>
                            <button
                                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#f0f2f5] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#e0e2e5] transition-colors"
                                onClick={handleBrowseClick}
                            >
                                <span className="truncate">
                                    {selectedFile ? 'Change File' : 'Browse Files'}
                                </span>
                            </button>

                            {/* Hidden file input */}
                            <input
                                type="file"
                                accept="application/json"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={handleUpload}
                                disabled={!selectedFile || !selectedNewsletterType || loading}
                                className={`flex items-center gap-2 px-6 py-2 rounded-lg text-white ${(!selectedFile || !selectedNewsletterType) ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} transition-colors`}
                            >
                                <FiUpload className="text-lg" />
                                <span>Import Subscribers</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}