import { ThreeDCardDemo } from "@/components/ThreeDCard";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <>
      <section className="profile_container">
        <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col  max-w-sm mx-auto p-4 relative h-[30rem] items-center justify-center">
          <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

          <EvervaultCard text="hover" imageUrl="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/1631/posts/40055/image-upload/Screenshot_2022_02_16_at_9_30_14_am_copy.jpg"/>

          <h2 className="dark:text-white text-black mt-4 text-lg font-bold text-center">
            First Name
          </h2>
          <p className="text-sm border font-semibold dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5 line-clamp-2 text-center pb-11">
            Watch me hover Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus animi error reprehenderit, dolor iste veritatis aliquam culpa dolore cum labore minima facere quos? Quos enim, esse ipsa molestiae ab in animi accusantium.
          </p>
        </div>


        <div className="flex-1 flex flex-col gap-5 lg:mt-5">
          <p className="text-30-bold">
            All Projects 
          </p>
           <ul className="mt-7 card_grid grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-1 justify-center">
                    {
                    
                    [
                      {'id':1233, 'title':'A project is good', 'desc': 'A great desp'},
                      {'id':1223, 'title':'A project is good', 'desc': 'A great desp'},
                      {'id':1243, 'title':'A project is good', 'desc': 'A great desp'},
                      {'id':1235, 'title':'A project is good', 'desc': 'A great desp'},
          
                    ].map((item, i) => (
                     <ThreeDCardDemo key={item.id}/>
                    ))
          
                    }
                  </ul>
        </div>
      </section>
    </>
  );
};

export default page;
