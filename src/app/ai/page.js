import React from "react";
import Head from 'next/head';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';

// Lazy load Artificial component
const Artificial = dynamic(() => import('@/components/Artificial/page'), {
  loading: () => <p>Loading...</p>,
});

export default function Artif() {
  return (
    <>
      <Head>
        <title>Artificial Intelligence Courses | Development Courses</title>
        <meta name="description" content="Discover the best online AI courses to boost your skills." />
        <meta property="og:title" content="BEST online courses" />
        <meta property="og:description" content="Educational websites help students gain admission to top online courses and enroll in the best courses." />
        <meta property="og:image" content="https://www.epicssolution.com/social-banner.png" />
        <meta property="og:url" content="https://www.epicssolution.com/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Study Visa Consultant" />
        <meta name="twitter:description" content="Educational websites help students gain admission to top universities and enroll in the best courses." />
        <meta name="twitter:image" content="https://www.epicssolution.com/social-banner.png" />
        <link rel="canonical" href="https://www.epicssolution.com/" />
        {/* Add Structured Data */}
        <script type="application/ld+json">{`{
          "@context": "https://schema.org",
          "@type": "Course",
          "name": "Artificial Intelligence Courses",
          "description": "Discover the best AI courses and enhance your skills.",
          "provider": {
            "@type": "Organization",
            "name": "Epic Solutions",
            "url": "https://www.epicssolution.com/"
          }
        }`}</script>
      </Head>
      
      <div className="mt-8">
        <div className="flex justify-center align-middle font-semibold text-2xl border-[1px] border-solid border-dark dark:border-light text-black dark:text-light rounded-lg p-4 sticky top-6 max-h-[80vh]">
          Artificial Intelligence Courses
        </div>
        <div className="mt-6">
          <article style={{ minHeight: '300px', width: '100%' }}>
            <Artificial />
          </article>
        </div>
      </div>
    </>
  );
}
