"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Head from "next/head";

const Engineering = () => {
  const [universities, setUniversities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data client-side
    const fetchData = async () => {
      try {
        const query = `
          *[_type=="Eng"]{
            description,
            "slug": slug.current,
            image,
            title,
            href,
            tags,
            content,
            publishedAt,  
            heading1,
            heading2,     
            heading3,    
            heading4
          }
        `;
        const result = await client.fetch(query);
        setUniversities(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Display loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Handle case when no data is available
  if (!universities || universities.length === 0) {
    return <div>No courses available at the moment.</div>;
  }

  // Dynamic meta tags based on the first course
  const firstCourse = universities[0];
  const metaTitle = `Online Courses | ${firstCourse.title}`;
  const metaDescription = `Explore ${firstCourse.title} and other courses on Epics Solution.`;

  return (
    <main className="w-full mt-16 sm:mt-24 md:mt-32 px-5 sm:px-10 md:px-24 lg:px-32 flex flex-col items-center justify-center">
      {/* Dynamic Open Graph meta tags */}
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://www.epicssolution.com/Engineering`} />
        <meta name="keywords" content="engineering courses, online learning, Epics Solution" />

       

        {/* Refined Open Graph Tags */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={urlFor(firstCourse.image).url()} />
        <meta property="og:url" content="https://www.epicssolution.com/Engineering" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Epics Solution" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={urlFor(firstCourse.image).url()} />

        {/* Enhanced Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Course",
              "name": firstCourse.title,
              "description": firstCourse.description,
              "provider": {
                "@type": "Organization",
                "name": "Epics Solution",
                "url": "https://www.epicssolution.com/Engineering",
              },
              "duration": firstCourse.duration,
              "educationalLevel": firstCourse.level,
              "audience": firstCourse.audience,
            }),
          }}
        />
      </Head>

      {/* Grid layout for displaying courses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {universities.map((uni) => (
          <div
            key={uni.slug}
            className="group flex flex-col items-center text-dark dark:text-light mb-8"
          >
            <Link href={`/Engineering/${uni.slug}`}  aria-label={`Read more about ${uni.title}`} className="h-full rounded-xl overflow-hidden">
              {uni.image && (
                <Image
                  src={urlFor(uni.image).url()}
                  alt={uni.image.alt || uni.title}
                  width={400}
                  height={300}
                  className="aspect-[4/3] w-full h-full object-cover object-center group-hover:scale-105 transition-all ease duration-300"
                  sizes="(max-width: 440px) 80vw, (max-width: 824px) 30vw, 23vw"
                  placeholder="blur"
                  blurDataURL={urlFor(uni.image).width(10).height(10).url()}
                  loading="lazy"
                  quality={80}
                />
              )}
            </Link>

            <div className="flex flex-col w-full mt-4">
              {uni.tags && uni.tags.length > 0 && (
                <span className="uppercase text-accent dark:text-accentDark font-semibold text-xs sm:text-sm">
                  {uni.tags[0]}
                </span>
              )}
              <Link href={`/Engineering/${uni.slug}`} className="inline-block my-1">
                <h2 className="font-semibold capitalize text-base sm:text-lg">
                  <span
                    className="bg-gradient-to-r from-accent/50 to-accent/50 dark:from-accentDark/50 dark:to-accentDark/50
                    bg-[length:0px_4px] group-hover:bg-[length:100%_4px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500"
                  >
                    {uni.title}
                  </span>
                </h2>
              </Link>

              <span className="capitalize text-gray dark:text-light/50 font-semibold text-sm sm:text-base mt-2">
                {uni.publishedAt
                  ? new Date(uni.publishedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Date not available"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Engineering;
