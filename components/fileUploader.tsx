'use client';

import { useState } from "react";

export default function FileUploader() {
  const [url, setUrl] = useState("");

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fileInput = event.currentTarget.file as HTMLInputElement;

    if (!fileInput.files?.length) return;

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setUrl(data.url); // URL pública do arquivo
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" name="file" />
      <button type="submit">Enviar</button>

      {url && (
        <div>
          <p>Arquivo enviado:</p>
          <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
        </div>
      )}
    </form>
  );
}
