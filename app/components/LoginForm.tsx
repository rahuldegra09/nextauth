'use client'
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
const LoginForm = () => {

  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res && res.error) {
        setError("invalid id creddd");
        return;
      }
      router.replace("user")
    } catch (error) {
      console.log("erroe", error);
    }
  };


  return (
    <section className=" bg-back bg-cover bg-no-repeat">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
          <Image className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" width={50}
            height={50} alt="logo" />
          <h2 className="text-4xl font-bold text-yellow-400"> login</h2>
        </Link>
        <div className="w-[600px] bg-yellow-600  border rounded-lg shadow">
          <div className="p-5 h-full space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-3xl ">
              Sign in to your account
            </h1>
            <form className=" space-y-2 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">Your username</label>
                <input onChange={e => setusername(e.target.value)} type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="username" required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                <input onChange={e => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  
                </div>
              </div>
              <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign in</button>

              {error && (

                <div className="bg-red-500 text-white w-fit text-sm py-1 px-2 rounded-mdmt-3">{error}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>

  )
}

export default LoginForm