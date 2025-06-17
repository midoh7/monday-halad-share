import { Toaster } from "sonner";
import { FileList } from "./service/FileList";

const Download: React.FC = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-white'>
      <FileList />
      <Toaster position='top-right' richColors />
    </div>
  );
};

export default Download;
