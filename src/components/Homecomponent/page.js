"use client";

import React, { useEffect, useState } from "react";
import Head from 'next/head'; 
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const query = `*[ _type=="blog"]{
        _id,
        title,
        "slug": slug.current,
        image,
        description,
      }`;
      try {
        const result = await client.fetch(query);
        setBlogs(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  if (!blogs || blogs.length === 0) {
    return <div>No blogs available</div>;
  }

  const blog = blogs[0];

  return (
    <div className='w-full inline-block'>
      <Head>
        <title>{blog.title} | Epics solution platform offers world best courses and blogs</title>
        <meta name="description" content={blog.description} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.description} />
        <meta property="og:image" content={urlFor(blog.image).url()} />
        <meta property="og:url" content={`https://www.epicssolution.com/${blog.slug}`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:updated_time" content={new Date().toISOString()} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.description} />
        <meta name="twitter:image" content={urlFor(blog.image).url()} />
        <meta property="fb:app_id" content="your-facebook-app-id-here" />
        <link rel="canonical" href={`https://www.epicssolution.com/${blog.slug}`} />
        <meta name="keywords" content="epic solution, best blogs,energy, HVAC ,Artificial intelligence,healthcare, latest courses, technology blog" />
        <link
          rel="preload"
          as="image"
          href={urlFor(blog.image).url()}
          imagesrcset={`${urlFor(blog.image).url()} 1x, ${urlFor(blog.image).url()} 2x`}
          imagesizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Head>

      <article className='flex flex-col items-start justify-end mx-5 sm:mx-10 relative h-[60vh] sm:h-[85vh]'>
        <div className='absolute top-0 left-0 bottom-0 right-0 h-full bg-gradient-to-b from-transparent to-dark/90 rounded-3xl z-0' />
        {blog.image && (
          <Image
            src={urlFor(blog.image).url()}
            placeholder='blur'
            blurDataURL={urlFor(blog.image).url()}
            priority={true}
            fetchPriority="high"
            alt={blog.title}
            fill
            className='object-center object-cover rounded-3xl -z-10'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            aria-hidden="true"
            quality={100}
          />
        )}
        
      </article>
      <div className='w-full lg:w-3/4 p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col items-start justify-center z-0   bg-light dark:bg-dark text-dark dark:text-light'>
          {blog.tags && blog.tags.length > 0 && (
            <span className='mt-2 text-sm text-gray-300'>{blog.tags[0]}</span>
          )}
          <div>
            <h1 className='font-bold capitalize text-lg sm:text-xl md:text-3xl lg:text-4xl'>
              <span className='bg-gradient-to-r from-accent to-accent  dark:from-accentDark/50 dark:to-accentDark/50 bg-[length:0px_6px] hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500'>
                {blog.title}
              </span>
            </h1>
          </div>
          <h2 className='hidden sm:inline-block mt-4 md:text-lg lg:text-xl font-in'>
            {blog.description}
          </h2>
        </div>
    </div>
  );
};

export default HomePage;
