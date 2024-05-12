import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/navbar";


export default async function Home() {

  const session = await getServerSession(options) as any;
  console.log(session)

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      {session ? (
        
        <h1>welcome {session.user.name}</h1>
      ) : (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><Link href="/api/auth/signin"> Sign In </Link></button>
      )}
    </div>
  );
}
