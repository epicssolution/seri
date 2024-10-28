"use client"; // Add this at the top

import BlogDetails from "@/components/blogdetail/page";
import siteMetadata from "@/utils/siteMetaData";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { notFound } from "next/navigation";
import VisitCourseButton from "@/components/buttons/page";
import { PortableText } from "next-sanity";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react"; // For client-side state management

// Define the fullBlog object structure
export const fullBlog = {
  currentSlug: '',
  title: '',
  content: null,
  titleImage: null,
  description: '',
  href: ''
};

// Blog Page Component
export default function BlogPage({ params }) {
  const { slug } = params;

  // State for blog data
  const [blog, setBlog] = useState(fullBlog);
  const [loading, setLoading] = useState(true);

  // Fetch blog data on mount
  useEffect(() => {
    const fetchBlogData = async () => {
      const query = `
        *[_type == "Eng" && slug.current == $slug][0]{
          title,
          description,
          "currentSlug": slug.current,
          image,
          publishedAt,
          href,
          content
        }
      `;

      const blogData = await client.fetch(query, { slug });

      if (blogData) {
        setBlog({
          ...fullBlog,
          currentSlug: blogData.currentSlug,
          title: blogData.title,
          content: blogData.content,
          titleImage: blogData.image,
          description: blogData.description,
          href: blogData.href
        });
      } else {
        notFound();
      }

      setLoading(false);
    };

    fetchBlogData();
  }, [slug]);

  // Generate the image URL for use in JSON-LD
  const imageUrl = blog.titleImage ? urlFor(blog.titleImage).url() : siteMetadata.socialBanner;

  // Extract headings for Table of Contents (TOC)
  const headings = [];
  if (blog.content && Array.isArray(blog.content)) {
    blog.content.forEach((block, index) => {
      if (block.style && block.style.match(/^h[1-4]$/)) {
        const level = block.style.replace('h', '');
        const text = block.children.map((child) => child.text).join("");
        headings.push({
          text,
          slug: `content-heading-${index}`,
          level
        });
      }
    });
  }

  // Render the page content
  return (
    <>
        <Head>
        <meta name="keywords" content={`${blog.title}, AI, Epic Solution, Blog`} />
        <link rel="canonical" href={`https://www.epicssolution.com/artificialf/${slug}`} />
        <meta name="author" content="Epic Solution Team" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph Tags */}
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.description} />
        <meta property="og:url" content={`https://www.epicssolution.com/artificialf/${slug}`} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Epic Solution Blog" />
        <meta property="og:locale" content="en_US" /> {/* Added og:locale */}
        <meta property="og:updated_time" content={new Date().toISOString()} /> {/* Added og:updated_time */}


        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.description} />
        <meta name="twitter:image" content={imageUrl} />

        {/* Pinterest Tags */}
        <meta property="pinterest:title" content={blog.title} />
        <meta property="pinterest:description" content={blog.description} />
        <meta property="pinterest:image" content={imageUrl} />

        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
              {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": "${blog.title}",
                "image": "${imageUrl}",
                "author": {
                  "@type": "Person",
                  "name": "Epic Solution Team"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "Epic Solution",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "${siteMetadata.logo}"
                  }
                },
                "datePublished": "${blog.publishedAt}",
                "dateModified": "${new Date().toISOString()}",
                "description": "${blog.description}",
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": "https://www.epicssolution.com/artificialf/${slug}"
                }
              }
            `,
          }}
        />
      </Head>

      <div className="flex justify-center align-top mt-7 mb-7  border-dark dark:border-light text-black dark:text-light max-w-screen-lg mx-auto">
      <h1>
        <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
          Abdul Ghaffar Khan - Blog
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {blog.title}
        </span>
      </h1>
      
      </div>

      {loading ? (
        <div className="loading-skeleton" aria-busy="true">Loading...</div>
      ) : (
        <article>
          <div className="mb-8 text-center relative w-full h-[70vh] bg-gray-800">
            <h1 className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
              {blog.title}
            </h1>
            
            <div className="absolute top-0 left-0 right-0 bottom-0 h-full bg-gray-800/60" />
            {blog.titleImage && (
              <Image
                src={urlFor(blog.titleImage).url()}
                alt={blog.title}
                fill
                className="aspect-square w-full h-full object-cover object-center"
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
                aria-hidden="true"
                quality={100}
              />
            )}
          </div>

          <BlogDetails blog={blog} slug={params.slug} toc={headings} />
          
      <div className="grid grid-cols-12 gap-y-8 lg:gap-8 sxl:gap-16 mt-8 px-5 md:px-10">
        <div className="col-span-12 lg:col-span-4">
          <details
            className="border-[1px] border-solid border-dark dark:border-light text-black dark:text-light rounded-lg p-4 sticky top-6 max-h-[80vh] overflow-hidden overflow-y-auto"
            open
          >
            <summary className="text-lg font-semibold capitalize cursor-pointer">
              Table Of Contents
            </summary>
            <ul className="mt-4 font-in text-base">
              {headings.length > 0 ? (
                headings.map((heading) => (
                  <li key={heading.slug} className="py-1">
                    <a
                      href={`#${heading.slug}`}
                      data-level={heading.level}
                      className={`data-[level="1"]:pl-0 data-[level="2"]:pl-4
                                  data-[level="2"]:border-t border-solid border-dark/40
                                  data-[level="3"]:pl-8
                                  data-[level="4"]:pl-12
                                  flex items-center justify-start
                                  hover:text-blue-500`}
                    >
                      <span className="hover:underline">{heading.text}</span>
                    </a>
                  </li>
                ))
              ) : (
                <li>No content available</li>
              )}
            </ul>
          </details>
        </div>
        <div className="col-span-12 lg:col-span-8 border-dark dark:border-light text-black dark:text-light">
          {blog.content ? (
            <PortableText value={blog.content} />
          ) : (
            <p>No content available</p>
          )}
        </div>
      </div>
        </article>
      )}
    </>
  );
}
