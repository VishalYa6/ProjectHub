
import { Boxes } from "@/components/ui/background-boxes";
import SearchForm from "@/components/SearchForm";
import { ThreeDCardDemo } from "@/components/ThreeDCard";
import { auth } from "@/auth";
import { sanityFetch } from "@/sanity/lib/live";
import { PROJECT_QUERY } from "@/sanity/lib/queries";
import { ProjectTypeCard } from "@/components/ProjectCard";

export default async function Home({searchParams} :{
  searchParams : Promise<{query ? : string}>
}){
  const query = (await searchParams).query;
  const params = {search : query || null};
  const session = await auth;
  console.log(session?._id);


  const {data : posts} = await sanityFetch({query : PROJECT_QUERY, params})
  
  return (
    <>
      <div className="h-[530px] relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
        <div className="absolute inset-0 w-full h-full  z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

        <Boxes />
        <h1 className="heading relative">Welcome To Project Hub</h1>
        <p className="sub-heading  !max-w-3xl relative">
          Where Project is with God
        </p>
        <SearchForm query={query}/>
      </div>

      <section className="section_container">
        <p className="text-30-semibold">{query? `Search results for "${query}"`: 'The Projects'}</p>
        <ul className="mt-7 card_grid grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-1 justify-center">
          {
          posts?.length >0 ? (
            posts.map((post : ProjectTypeCard, index : number) => (
           <ThreeDCardDemo key={post._id} post={post}/>
          ))
          ) : (<p className="no-results">No Projects Found</p>)
          

          }
        </ul>
      </section>
    </>
  )
}




