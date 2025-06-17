import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import AuthForm from "./components/AuthForm";
import { Toaster } from "sonner";
import { FileUpload } from "./service/FileUpload";

const Login: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#7747A9] to-[#444C63]'>
      {user ? (
        <div className='text-center bg-white w-full h-screen flex justify-center items-center flex-col'>
          <h1 className='text-lg font-semibold mb-10'>Welcome, {user.email}</h1>
          <FileUpload />
          <button
            onClick={() => signOut(auth)}
            className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition mt-5'
          >
            Logout
          </button>
        </div>
      ) : (
        <AuthForm />
      )}
      <Toaster position='top-right' richColors />
    </div>
  );
};

export default Login;
