import { auth, signIn, signOut } from "@/auth";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = async() => {
  const session = await auth();
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans ">
      <nav className="flex justify-between items-center">
        <Link
        href="/">
        <Image src="https://th.bing.com/th/id/R.2cd5dc5d9faad85af475fd8661b7d199?rik=b65sOpGG1yw1SQ&riu=http%3a%2f%2fwww.getprojecthub.com%2fimages%2fph_logo.png&ehk=Xq0D%2fxlRC0J1LzZa2PlJlOrE6Jj0eCMBefXYu09tUYM%3d&risl=&pid=ImgRaw&r=0" alt="logo.png" width={164} height={40} /> 
        </Link>
        <div className="flex items-center gap-5 text-black">

        {
          session && session?.user ? (
            <>
                   <Link href="/">
              <span className="text-6 font-sans max-sm:hidden">
                Create
              </span>
            </Link>
            <form
                action={async () => {
                  "use server"
                  await signOut({redirectTo: "/"});
                } }
              
              >
                  <button type="submit" className="text-6 font-sans">Logout</button>
              </form>

            <Link href={`/user/${session?.id}`}>
            {session.user?.name}
            </Link>
            </>
          ) : (
              <form
                action={async () => {
                  "use server"
                  await signIn('github');
                } }
              
              >
                  <button type="submit" className="text-6 font-sans">Login</button>
              </form>

          )
        }
           
          
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
