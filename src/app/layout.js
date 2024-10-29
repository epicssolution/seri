import "./globals.css";
import { cx } from "@/utils";
import { Inter, Manrope } from "next/font/google";
import Header from "@/components/Header";
import siteMetadata from "@/utils/siteMetaData";
import Script from "next/script";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-in",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mr",
});

// Define metadata with Open Graph and Twitter settings
export const metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: siteMetadata.title,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    images: [siteMetadata.socialBanner],
  },
};


export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <head>
      <link rel="sitemap" type="application/xml" href="https://www.epicssolution.com/sitemap.xml" />
      <meta httpEquiv="Cache-Control" content="public, max-age=31536000, immutable" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        <meta property="og:locale" content={metadata.openGraph.locale} />
        <meta property="og:updated_time" content={metadata.openGraph.updated_time} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:image" content={metadata.openGraph.images[0]} />

        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#ffffff" /> {/* Define theme color for browsers */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="last-modified" content={metadata.openGraph.updated_time} />


      <meta
          name="google-site-verification"
          content="125c3Cukk3D1INp6HOlRmuvTDPOk-qiR_j30PREvm0I"
        />
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-D50XE9PL55"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-D50XE9PL55');`}
        </Script>
        <meta name="last-modified" content={metadata.lastModified} />
        <link rel="canonical" href={`https://www.epicssolution.com/`} />
        <meta name="author" content="Epic Solution Team" />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Epics Solution",
                "url": "https://www.epicssolution.com",
                "logo": "https://www.epicssolution.com/logo.png",
                "sameAs": [
                  "https://www.facebook.com/epicssolution",
                  "https://www.linkedin.com/company/epicssolution",
                  "https://www.youtube.com/channel/epicssolution",
                  "https://www.instagram.com/epicssolution"
                ],
                "description": "Educational websites help students to read informative blogs and enroll in the best online courses related to AI in Mechanical, HVAC, Energy, and Web Development."
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Epics Solution",
                "url": "https://www.epicssolution.com",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": "https://www.epicssolution.com/search?q={search_term_string}",
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@context": "https://schema.org",
                "@type": "WebPage",
                "name": metadata.title.default,
                "url": metadata.openGraph.url,
                "description": metadata.description,
                "breadcrumb": {
                  "@type": "BreadcrumbList",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Home",
                      "item": "https://www.epicssolution.com"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "Courses",
                      "item": "https://www.epicssolution.com/courses"
                    }
                  ]
                }
              }
            ]),
          }}
        />

      </head>
      <body
        className={cx(
          inter.variable,
          manrope.variable,
          "font-mr bg-light dark:bg-dark"
        )}
      >
        {/* Theme switcher script for dark/light mode */}
        <Script id="theme-switcher" strategy="beforeInteractive">
          {`if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }`}
        </Script>

        {/* Header and Footer are included around children */}
        <Header />
        <main >{children}</main>
        <Footer />
      </body>
    </html>
  );
}
