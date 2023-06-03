import { useCallback, useState } from "react";
import Input from '@/components/Input';
import Footer from '@/components/Footer';
import axios from "axios";
import { signIn } from "next-auth/react";

import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'


function Auth() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const [variant, setVariant] = useState('login')

    const toogleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === "login" ? "register" : "login")
    }, [])


    const login = useCallback(async () => {
        try {
            await signIn(
                'credentials',
                {
                    email,
                    password,
                    callbackUrl: '/profiles',
                }
            )
        }
        catch (error) {
            console.log(error)
        }
    }, [email, password])

    const register = useCallback(async () => {
        try {
            await axios.post(
                '/api/register',
                {
                    email, name, password
                }
            )
        } catch (error) {
            console.log(error)
        }

        await login()
    }, [email, name, password, login])

    

    return (
        // <div className="relative h-full w-full bg-[url('/images/hero-2.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
        <div className="relative h-auto w-full bg-[url('/images/hero-2.jpg')] bg-cover">
            <div className="bg-black w-full h-[90%] lg:bg-opacity-50 pb-56">
                <nav className="px-12 py-5">
                    <a href="https://www.netflix.com" target="_blank" rel="noreferrer">
                        <img
                            src="/images/logo.png"
                            alt="logo"
                            className="h-12 hover:cursor-pointer"
                        />
                    </a>

                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 opacity-100 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {variant === 'login' ? "Sign in" : "Register"}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant === "register" ?
                                <Input
                                    id={'Username'}
                                    label={"Username"}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                        setName(event.target.value)
                                    }}
                                    type="text"
                                    value={name}
                                />
                                : null
                            }

                            <Input
                                id={'Email'}
                                label={"Email"}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setEmail(event.target.value)
                                }}
                                type="email"
                                value={email}
                            />
                            <Input
                                id={'Password'}
                                label={"Password"}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setPassword(event.target.value)
                                }}
                                type="password"
                                value={password}
                            />
                        </div>
                        <button
                            onClick={async() => {
                                variant === "login" ? await login() : await register()
                            }}
                            className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
                        >
                            {variant === 'login' ? 'Login' : "Sign up"}
                        </button>
                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <div onClick={() => signIn('google', { callbackUrl: '/profiles' })} className="w-16 h-16 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                <FcGoogle size={40} />
                            </div>
                            <div onClick={() => signIn('github', { callbackUrl: '/profiles' })} className="w-16 h-16 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                <FaGithub size={40} color="black" />
                            </div>
                        </div>
                        <p className="text-neutral-500 mt-12">
                            {variant === 'login' ? 'Fist time using Netflix?' : 'Already have an account?'}
                            <span onClick={toogleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                                {variant === 'login' ? 'Create an account' : 'Login'}

                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Auth;

/* import axios from 'axios';
import { useCallback, useState } from 'react';
import { NextPageContext } from 'next';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

import Input from '@/components/Input';
import Footer from '@/components/Footer';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}

const Auth = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/'
      });

      router.push('/profiles');
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password
      });

      login();
    } catch (error) {
        console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" className="h-12" alt="Logo" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === 'login' ? 'Sign in' : 'Register'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'register' && (
                <Input
                  id="name"
                  type="text"
                  label="Username"
                  value={name}
                  onChange={(e: any) => setName(e.target.value)} 
                />
              )}
              <Input
                id="email"
                type="email"
                label="Email address or phone number"
                value={email}
                onChange={(e: any) => setEmail(e.target.value)} 
              />
              <Input
                type="password" 
                id="password" 
                label="Password" 
                value={password}
                onChange={(e: any) => setPassword(e.target.value)} 
              />
            </div>
            <button onClick={variant === 'login' ? login : register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
              {variant === 'login' ? 'Login' : 'Sign up'}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div onClick={() => signIn('google', { callbackUrl: '/profiles' })} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FcGoogle size={32} />
              </div>
              <div onClick={() => signIn('github', { callbackUrl: '/profiles' })} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FaGithub size={32} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
              <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                {variant === 'login' ? 'Create an account' : 'Login'}
              </span>
              .
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Auth; */
