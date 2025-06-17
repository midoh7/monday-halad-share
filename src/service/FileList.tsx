import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

interface FileItem {
  id: string;
  fileName: string;
  uploadTime: { toDate: () => Date };
  downloadURL: string;
}

export function FileList() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [key, setKey] = useState("");

  const handleDownload = () => {
    if (key !== "") {
      toast.success("Downloading file");
    } else toast.error("Invalid Key");
  };

  useEffect(() => {
    const q = query(collection(db, "files"), orderBy("uploadTime", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setFiles(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<FileItem, "id">),
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className='max-w-3xl mx-auto mt-8 p-4'>
      <h2 className='text-xl font-bold mb-4'>Uploaded Files</h2>
      {/* <table className='table-auto w-full border-collapse border border-gray-300'>
        <thead>
          <tr>
            <th className='border border-gray-300 px-2 py-1'>File Name</th>
            <th className='border border-gray-300 px-2 py-1'>Uploaded At</th>
            <th className='border border-gray-300 px-2 py-1'>Download</th>
          </tr>
        </thead>
        <tbody>
          {files.map(({ id, fileName, uploadTime, downloadURL }) => (
            <tr key={id}>
              <td className='border border-gray-300 px-2 py-1'>{fileName}</td>
              <td className='border border-gray-300 px-2 py-1'>
                {uploadTime?.toDate().toLocaleString()}
              </td>
              <td className='border border-gray-300 px-2 py-1'>
                <a
                  href={downloadURL}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 underline'
                  download
                >
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <div className='flex items-center space-x-3'>
        <input
          type='text'
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder='Input decrytion key'
          className='px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <button
          onClick={handleDownload}
          className='inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow transition-colors duration-200'
        >
          <ArrowDownTrayIcon className='w-5 h-5 mr-2' />
          Download
        </button>
      </div>
    </div>
  );
}
