'use client';

import type { PutBlobResult } from '@vercel/blob';
import { useState, useRef } from 'react';

export default function AvatarUploadPage() {

    const inputFileRef = useRef<HTMLInputElement>(null);
    const [blob, setBlob] = useState<PutBlobResult | null>(null);

    return (
        <div className='p-5 m-5 w-[50%] border rounded-md'>
            <h1>Upload Your Avatar</h1>

            <form
                className='flex flex-col gap-5 w-60'
                onSubmit={async (event) => {
                    event.preventDefault();

                    if (!inputFileRef.current?.files) {
                        throw new Error("No file selected");
                    }

                    const file = inputFileRef.current.files[0];

                    const response = await fetch(
                        `/api/avatar/upload?filename=${file.name}`,
                        {
                            method: 'POST',
                            body: file,
                        },
                    );

                    const newBlob = (await response.json()) as PutBlobResult;

                    setBlob(newBlob);
                }}
            >
                <input name="file" ref={inputFileRef} type="file" accept="image/jpeg, image/png, image/webp" required className='border rounded-md '/>
                <button type="submit" className='w-full bg-green-400 rounded-md shadow-md p-1'>Upload</button>
            </form>
            {blob && (
                <div>
                    Blob url: <a className='text-blue-500' href={blob.url}>{blob.url}</a>
                </div>
            )}
        </div>
    );
}