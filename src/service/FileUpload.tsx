import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { storage, db } from "../firebase"; // your firebase config

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const fileName = `${Date.now()}_${file.name}`;
      const fileRef = ref(storage, `uploads/${fileName}`);

      await uploadBytes(fileRef, file);
      const downloadURL = await getDownloadURL(fileRef);

      await addDoc(collection(db, "files"), {
        fileName,
        uploadTime: serverTimestamp(),
        storagePath: fileRef.fullPath,
        downloadURL,
      });

      setMessage("File uploaded successfully!");
      setFile(null);
    } catch (err) {
      setMessage("Upload failed: " + (err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleUpload}
      className='flex flex-col gap-4 w-full max-w-md mx-auto p-4 border rounded shadow'
    >
      <h2 className='text-xl font-bold mb-2'>Upload File</h2>

      <input
        type='file'
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className='border p-2'
      />

      <button
        type='submit'
        disabled={loading}
        className='bg-blue-600 text-white py-2 rounded disabled:opacity-50'
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

      {message && <p className='mt-2 text-center'>{message}</p>}
    </form>
  );
}
