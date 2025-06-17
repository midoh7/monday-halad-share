import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Download from "./Download";
import { Toaster } from "sonner";

const App: React.FC = () => {
  return (
    <div className='min-h-screen'>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/share' element={<Download />} />
        <Route
          path='*'
          element={
            <div className='flex items-center space-x-3 p-2'>
              <div>404 - Page not found</div>
              <a
                href='/'
                className='inline-flex items-center px-4 py-2 bg-blue-500 !text-white hover:bg-blue-700 font-medium rounded-md shadow transition-colors duration-200'
              >
                Home
              </a>
            </div>
          }
        />
      </Routes>
      <Toaster position='top-right' richColors />
    </div>
  );
};

export default App;
