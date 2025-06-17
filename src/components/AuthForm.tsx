import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { LockClosedIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const gradientStyle = {
    background: "linear-gradient(to right, #0A5CF2, #594CEA)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("User logged in successfully!");
        ("User registered successfully");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("User logged in successfully!");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-4 w-full lg:min-w-1/3 bg-white max-w-sm mx-auto p-6 rounded-lg shadow-md'
    >
      <div className='flex flex-col w-full justify-center items-center gap-3'>
        <div className='rounded-full w-fit p-4 bg-gradient-to-l from-[#0A5CF2] to-[#594CEA]'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='size-9 text-white'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 2.714A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z'
            />
          </svg>
        </div>
        <h2
          style={gradientStyle}
          className='text-2xl font-semibold text-center text-gray-800 uppercase '
        >
          {isRegistering ? "Register" : "Halad Share"}
        </h2>
        <p className='text-sm font-medium'>
          Encryption P2P file sharing with maximum security
        </p>
        <div className='flex gap-4 w-full !bg-gray-700 p-0.5 rounded-md'>
          <button
            className={`w-1/2 h-11 rounded-md focus:!outline-none focus:!ring-0 focus:!ring-transparent focus:!ring-offset-0 !border-0 ${
              !isRegistering
                ? "!bg-blue-400 text-white"
                : "!bg-gray-700 text-gray-200"
            }`}
            type='button'
            onClick={() => setIsRegistering(false)}
          >
            Login
          </button>
          <button
            className={`w-1/2 h-11 rounded-md focus:outline-none focus:ring-0 focus:!ring-transparent focus:ring-offset-0 border-0 ${
              isRegistering
                ? "!bg-blue-400 text-white"
                : "!bg-gray-700 text-gray-200"
            }`}
            type='button'
            onClick={() => setIsRegistering(true)}
          >
            Sign Up
          </button>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <label className='font-semibold' htmlFor='email'>
          Email
        </label>
        <input
          type='email'
          placeholder='your@email.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='px-4 py-2.5 border bg-gray-700 text-gray-200 border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:!ring-transparent focus:ring-offset-0'
        />
      </div>

      <div className='flex flex-col gap-2'>
        <label className='font-semibold' htmlFor='email'>
          Password
        </label>
        <input
          type='password'
          placeholder='Enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='px-4 py-2.5 border bg-gray-700 text-gray-200 border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:!ring-transparent focus:ring-offset-0'
        />
      </div>

      <button
        type='submit'
        className='mt-4 h-12 bg-gradient-to-l from-[#0A5CF2] to-[#594CEA] text-white py-2 rounded-md font-semibold transition-colors inline-flex'
      >
        {isRegistering ? (
          <div className=' w-full flex gap-2 justify-center items-center'>
            {loading ? "Loading..." : "Register"}
          </div>
        ) : (
          <div className=' w-full flex gap-2 justify-center items-center'>
            <LockClosedIcon className='w-4 h-4 font-bold' />{" "}
            <span className='font-semibold'>
              {loading ? "Loading..." : "Secure Login"}
            </span>
          </div>
        )}
      </button>
      <div className='mt-2 w-full flex gap-2 justify-center items-center'>
        <LockClosedIcon className='w-4 h-4 font-bold' />{" "}
        <p className='font-semibold text-sm'>End-to-end Encryption</p>
      </div>
      <p className='font-semibold text-sm w-full text-center -mt-2 mb-4'>
        Your files are encrypted before they leave your device
      </p>
    </form>
  );
};

export default AuthForm;
