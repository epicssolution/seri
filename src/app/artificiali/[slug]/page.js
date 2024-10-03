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

  // Fetch the blog data from Sanity for the "AI" type
  const query = `
    *[_type == "AI" && slug.current == $slug][0]{
      title,
      description,
      "slug": slug.current,
      image,
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
      url: `https://www.epicssolution.com/artificialf/${slug}`,
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
    *[_type == "AI" && slug.current == $slug][0]{
      title,
      description,
      "slug": slug.current,
      image,
      publishedAt,
      href,
      content,
      heading1,
      heading2,
      heading3,
      heading4
    }
  `;

  const blog = await client.fetch(query, { slug });

  if (!blog) {
    notFound();
    return null;
  }

  // Extract headings for Table of Contents (TOC)
  const headings = [];

  if (blog.heading1) {
    headings.push({ text: blog.heading1, slug: "heading-1", level: "1" });
  }
  if (blog.heading2) {
    headings.push({ text: blog.heading2, slug: "heading-2", level: "2" });
  }
  if (blog.heading3) {
    headings.push({ text: blog.heading3, slug: "heading-3", level: "3" });
  }
  if (blog.heading4) {
    headings.push({ text: blog.heading4, slug: "heading-4", level: "4" });
  }

  // Additional Headings from Content
  if (blog.content && Array.isArray(blog.content)) {
    blog.content
      .filter((block) => block.style && block.style.match(/^h[1-6]$/))
      .forEach((heading, index) => {
        const level = heading.style.replace('h', ''); // Extract the heading level
        const text = heading.children.map((child) => child.text).join("");
        headings.push({
          text,
          slug: `content-heading-${index}`,
          level,
        });
      });
  }

  // Render the blog content
  return (
    <article className="py-12 px-4 sm:px-10 lg:px-20 bg-light dark:bg-dark">
      {/* Hero Section */}
      <div className="mb-8 text-center relative w-full h-[70vh] bg-gray-900">
        <div className="w-full z-10 flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold capitalize text-white">
            {blog.title}
          </h1>
          <VisitCourseButton href={blog.href} className="mt-6" />
        </div>
        <div className="absolute top-0 left-0 right-0 bottom-0 h-full bg-gray-800/60" />
        {blog.image && (
          <Image
            src={urlFor(blog.image).url()}
            alt={blog.title}
            layout="fill"
            className="object-cover object-center"
            priority
          />
        )}
      </div>

      {/* Blog Content and TOC */}
      <div className="grid grid-cols-12 gap-6 lg:gap-10">
        {/* Table of Contents */}
        <aside className="col-span-12 lg:col-span-4 border-[1px] border-dark dark:border-light rounded-lg p-4 sticky top-6 max-h-[80vh] overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4 text-dark dark:text-light">Table of Contents</h2>
          <ul className="space-y-4">
            {headings.length > 0 ? (
              headings.map((heading) => (
                <li key={heading.slug}>
                  <a
                    href={`#${heading.slug}`}
                    className={`text-sm sm:text-base text-dark dark:text-light hover:underline`}
                  >
                    {heading.text}
                  </a>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No content available</li>
            )}
          </ul>
        </aside>

        {/* Blog Details */}
        <section className="col-span-12 lg:col-span-8 text-dark dark:text-light">
          {blog.content ? (
            <PortableText value={blog.content} components={{
              types: {
                block: ({ children, node }) => {
                  const Tag = `h${node.level || 1}`;
                  return (
                    <Tag className="font-semibold text-2xl lg:text-3xl mt-6 mb-4">
                      {children}
                    </Tag>
                  );
                },
              },
            }} />
          ) : (
            <p>No content available</p>
          )}
        </section>
      </div>
    </article>
  );
}
