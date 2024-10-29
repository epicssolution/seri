"use client";

import Head from "next/head";
import Link from "next/link";
import Logo from "./Logo";
import {
  YoutubeIcon,
  FacebookIcon,
  LinkedinIcon,
  MoonIcon,
  SunIcon,
  InstagramIcon,
} from "../Icons";
import siteMetadata from "@/utils/siteMetaData";
import { useThemeSwitch } from "../Hooks/useThemeSwitch";
import { useState } from "react";
import { cx } from "@/utils";

const Header = () => {
  const [mode, setMode] = useThemeSwitch();
  const [click, setClick] = useState(false);

  const toggle = () => {
    setClick(!click);
  };

  return (
    <header>
      {/* Meta tags for SEO */}
      <Head>
        <title>Epics solution | Online courses and blogs</title>
        <meta
          name="description"
          content="Educational websites help students to  read informative blogs and enroll in the best online courses related to use of Artificial intelligence in Mechanical,HVAC,Energy and web Development."
        />
        <meta property="og:title" content="Epics solution | Online courses and blogs" />
        <meta property="og:description" content="Educational websites help students to  read informative blogs and enroll in the best online courses related to use of Artificial intelligence in Mechanical,HVAC,Energy and web Development." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Epics solution | Online courses and blogs" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={`https://www.epicssolution.com/`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
              "description": "Educational websites help students to  read informative blogs and enroll in the best online courses related to use of Artificial intelligence in Mechanical,HVAC,Energy and web Development."
            }),
          }}
        />


      </Head>
      

      <div className="w-full p-4 px-5 sm:px-10 flex items-center justify-between relative z-50">
        {/* Logo Section */}
        <div className="flex items-center justify-between w-full sm:w-auto">
          <Logo />
          <h1 className="text-2xl font-bold text-center py-4  bg-light dark:bg-dark text-dark dark:text-light 
      ">
        Epics Solution
      </h1>
          
          {/* Hamburger Menu for Mobile */}
          <button
            className="inline-block sm:hidden z-50"
            onClick={toggle}
            aria-label="Hamburger Menu"
          >
            <div className="w-10 cursor-pointer transition-all ease duration-300">
              <div className="relative">
                <span
                  className={`absolute top-0 inline-block w-full h-0.5 bg-dark dark:bg-light rounded transition-all ease duration-200 ${
                    click ? "rotate-45 translate-y-0" : "rotate-0 translate-y-2"
                  }`}
                />
                <span
                  className={`absolute top-0 inline-block w-full h-0.5 bg-dark dark:bg-light rounded transition-all ease duration-200 ${
                    click ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute top-0 inline-block w-full h-0.5 bg-dark dark:bg-light rounded transition-all ease duration-200 ${
                    click ? "-rotate-45 translate-y-0" : "rotate-0 translate-y-4"
                  }`}
                />
              </div>
            </div>
          </button>
        </div>

        {/* Navigation Menu for Mobile */}
        <nav
          className={`${
            click ? "top-20" : "-top-96"
          } w-full sm:w-auto py-7 px-6 sm:px-8 font-medium capitalize fixed sm:hidden left-0 right-0 bg-light dark:bg-dark text-dark dark:text-light transition-all ease duration-300 z-40`}
        >
          <ul className="flex flex-col items-center space-y-4">
            <li><Link href="/" onClick={toggle}><h2>Home</h2></Link></li>
            <li><Link href="/dev" onClick={toggle}><h2>Development</h2></Link></li>
            <li><Link href="/eng" onClick={toggle}><h2>Engineering</h2></Link></li>
            <li><Link href="/mar" onClick={toggle}><h2>Marketing</h2></Link></li>
            <li><Link href="/ai" onClick={toggle}><h2>Artificial Intelligence</h2></Link></li>
          </ul>
          <button
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
            className={`mt-4 w-8 h-8 rounded-full p-1 transition-colors ease ${
              mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
            }`}
            aria-label="theme-switcher"
          >
            {mode === "light" ? <MoonIcon /> : <SunIcon />}
          </button>
        </nav>

        {/* Navigation Menu for Desktop */}
        <nav
          className="hidden sm:flex items-center space-x-6 bg-light dark:bg-dark text-dark dark:text-light py-3 px-8 rounded-full border border-solid border-dark dark:border-light"
        >
          <Link href="/"><h2>Home</h2></Link>
          <Link href="/dev"><h2>Development</h2></Link>
          <Link href="/eng"><h2>Engineering</h2></Link>
          <Link href="/mar"><h2>Marketing</h2></Link>
          <Link href="/ai"><h2>Artificial Intelligence</h2></Link>
          <button
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
            className={`w-6 h-6 rounded-full transition-colors ease ${
              mode === "light" ? "bg-dark text-light" : "bg-light text-dark"
            }`}
            aria-label="theme-switcher"
          >
            {mode === "light" ? <MoonIcon /> : <SunIcon />}
          </button>
          
        </nav>
        
        {/* Social Media Icons */}
        <div className="hidden sm:flex items-center space-x-4">
          <a href={siteMetadata.linkedin} rel="noopener noreferrer" target="_blank">
            <LinkedinIcon className="w-6 h-6 hover:scale-125 transition-all ease duration-200" />
          </a>
          <a href={siteMetadata.facebook} rel="noopener noreferrer" target="_blank">
            <FacebookIcon className="w-6 h-6 hover:scale-125 transition-all ease duration-200" />
          </a>
          <a href={siteMetadata.youtube} rel="noopener noreferrer" target="_blank">
            <YoutubeIcon className="w-6 h-6 hover:scale-125 transition-all ease duration-200" />
          </a>
          <a href={siteMetadata.instagram} rel="noopener noreferrer" target="_blank">
            <InstagramIcon className="w-6 h-6 hover:scale-125 transition-all ease duration-200" />
          </a>
        </div>
      </div>
    </ header>
  );
};

export default Header;
