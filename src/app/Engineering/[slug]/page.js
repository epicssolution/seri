import BlogDetails from "@/components/blogdetail/page";
import siteMetadata from "@/utils/siteMetaData";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { notFound } from "next/navigation";
import VisitCourseButton from "@/components/buttons/page";
import { PortableText } from "next-sanity";

// Use the Metadata API for handling meta tags and SEO
export async function generateMetadata({ params }) {
  const { slug } = params;

  // Fetch the blog data from Sanity for the "Eng" type
  const query = `
    *[_type == "Eng" && slug.current == $slug][0]{
      title,
      description,
      "slug": slug.current,
      image,
      content,
      publishedAt
    }
  `;

  const blog = await client.fetch(query, { slug });

  if (!blog) {
    notFound();
    return null;
  }

  // Generate the image URL or fallback to a social banner image
  const imageUrl = blog.image ? urlFor(blog.image).url() : siteMetadata.socialBanner;

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: `https://www.epicssolution.com/Engineering/${slug}`,
      images: imageUrl ? [{ url: imageUrl }] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.description,
      images: imageUrl ? [imageUrl] : [],
    },
    other: {
      'pinterest:title': blog.title,
      'pinterest:description': blog.description,
      'pinterest:image': imageUrl,
    },
  };
}

export default async function BlogPage({ params }) {
  const { slug } = params;

  // Fetch the blog data from Sanity
  const query = `
    *[_type == "Eng" && slug.current == $slug][0]{
      title,
      description,
      "slug": slug.current,
      image,
      publishedAt,
      href,
      content
    }
  `;

  const blog = await client.fetch(query, { slug });

  if (!blog) {
    notFound();
    return null;
  }

  // PortableText component styling for heading tags
  const portableTextComponents = {
    types: {
      block: ({ children, style }) => {
        switch (style) {
          case 'h1':
            return <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold my-6">{children}</h1>;
          case 'h2':
            return <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold my-6">{children}</h2>;
          case 'h3':
            return <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold my-4">{children}</h3>;
          case 'h4':
            return <h4 className="text-xl md:text-2xl lg:text-3xl font-semibold my-4">{children}</h4>;
          default:
            return <p className="text-base md:text-lg lg:text-xl my-2">{children}</p>;
        }
      },
    },
  };

  return (
    <article>
      {/* Blog Image with Overlay */}
      <div className="mb-8 text-center relative w-full h-[70vh] bg-gray-800">
        <div className="w-full z-10 flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="inline-block mt-6 font-semibold capitalize text-white text-4xl md:text-5xl lg:text-6xl !leading-normal relative w-5/6">
            {blog.title}
          </h1>
          <VisitCourseButton href={blog.href} />
        </div>
        <div className="absolute top-0 left-0 right-0 bottom-0 h-full bg-gray-800/60" />
        {blog.image && (
          <Image
            src={urlFor(blog.image).url()}
            alt={blog.title}
            fill
            className="aspect-square w-full h-full object-cover object-center"
            priority
            sizes="100vw"
          />
        )}
      </div>

      {/* Blog Details and Content */}
      <BlogDetails blog={blog} slug={params.slug} />

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
              {/* Map through your headings array and render them */}
            </ul>
          </details>
        </div>

        {/* Blog Content */}
        <div className="col-span-12 lg:col-span-8 border-dark dark:border-light text-black dark:text-light">
          {blog.content ? (
            <PortableText value={blog.content} components={portableTextComponents} />
          ) : (
            <p>No content available</p>
          )}
        </div>
      </div>
    </article>
  );
}