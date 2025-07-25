import { Boxes } from "@/components/ui/background-boxes";
import { client } from "@/sanity/lib/client";

import { PROJECT_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import markdownit from "markdown-it"
import { formateDate } from "@/lib/utils";

const md = markdownit();
const page = async ({params}: {params : Promise<{id:string}>}) => {

  const id = (await params).id
  const post = await client.fetch(PROJECT_BY_ID_QUERY, {id})

  if(!post) return notFound();

  const parsedContent = md.render(post?.details || "");
  return (
    <>
      <div className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
        <div className="absolute inset-0 w-full h-full  z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

        <Boxes />
        <p className="tag relative ">{formateDate(post?._createdAt)}</p>
        <h1 className="heading relative line-clamp-3">
          {post?.title}
        </h1>
        <p className="sub-heading  !max-w-5xl relative">
          {post?.description}
        </p>
       
      </div>
       <section className="section_container">
        <img src={post?.image} alt="" className='w-full h-auto rounded-xl'    />

          <div className="space-y-5 mt-10 max-w-4xl mx-auto">
            <div className="flex-between gap-5">
              <Link href="/" className="flex gap-2 items-center mb-3">
                <Image
                  src={post?.author?.image}
                  alt=""
                  width={64}
                  height={64}
                  className="rounded-full drop-shadow-lg"
                />

                <div>
                  <p className="text-20-medium">{post?.author?.name}</p>
                  <p className="text-16-medium  !text-black-300">@{post?.author?.username}</p>
                </div>
              </Link>
              <p className="category-tag">
                {post.category}
              </p>
            </div>
          <h3 className="text-30-bold">PROJECT DETAILS</h3>
          {parsedContent ? (
            <article className="prose max-w-4xl font-work-sans break-all" 
            dangerouslySetInnerHTML={{__html : parsedContent}}
            />
          ): (<p className="no-result">No Details Provided</p>)}
          
          </div>
          <hr className="divider" />
        </section>
    </>
  );
};

export default page;
