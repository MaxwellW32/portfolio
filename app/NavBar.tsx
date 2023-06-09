"use client"

import React, { useState, useEffect, useLayoutEffect } from "react";
import './globals.css'
import Link from 'next/link'
import styles from './page.module.css'


export default function Navbar() {  
  const [themeLight, setThemeLight] = useState(false);
  const [mobileNavHidden, setMobileNavHidden] = useState(true);
  const [rotateTheme, rotateThemeSet] = useState(0)

  function changeTheme() {
    setThemeLight((prev) => {
      const toggleTheme = !prev;

      localStorage.setItem("oldThemePick", `${toggleTheme}`);
      return toggleTheme;
    });
  }

  useLayoutEffect(() => {
    //read theme from browser if there
    const oldThemePick = localStorage.getItem("oldThemePick");

    if (oldThemePick !== null) {
      if (oldThemePick === "true") {
        setThemeLight(true);
      } else {
        setThemeLight(false);
      }
    }
  }, []);

  useEffect(() => {
    // close navbar on mobile all links clicked
    document.querySelectorAll(".detectClickTMobile").forEach((e) =>
      e.addEventListener("click", () => {
        setMobileNavHidden(true);
      })
    );
  }, []);

  let mainColor:string;
  let secondColor:string;
  let whiteSwitch:string;
  let blackSwitch:string;

  if (themeLight) {
    //make light
    mainColor = "255, 199, 95";
    secondColor = "255, 150, 113";
    whiteSwitch = "255, 255, 255";
    blackSwitch = "0, 0, 0";
  } else {
    //make dark
    mainColor = "132, 94, 194";
    secondColor = "214, 93, 177";
    whiteSwitch = "0, 0, 0";
    blackSwitch = "255, 255, 255";
  }

  const themeColors:{
    [key: string]: string;
  } = {
    "--mainColor": mainColor,
    "--secondColor": secondColor,
    "--whiteSwitch": whiteSwitch,
    "--blackSwitch": blackSwitch,
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    });

    document.querySelectorAll(".hidden").forEach((el) => observer.observe(el));
  }, []);

  useEffect(() => {
    //set the body styles
    const htmlStyle = document.documentElement.style;

    Object.keys(themeColors).forEach((key) => {
      htmlStyle.setProperty(key, themeColors[key]);
    });

    return () => {
      Object.keys(themeColors).forEach((key) => {
        htmlStyle.removeProperty(key);
      });
    };
  }, [themeLight]);

  return (
    <nav
        id="mainNav"
        className={styles.mainNav}
        style={{
          "--changeNavSizeMobile": mobileNavHidden ? "0" : "100dvh",
        } as React.CSSProperties}
      >

        <Link
          onClick={() => {
            setMobileNavHidden(true);
          }}
          id="navHomeBttn"
          className={styles.navHomeBttn}
          href="/"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
          </svg>
        </Link>

        <div className={styles.NavBarMiddleCont}>
          <svg
            onClick={() => {
              setMobileNavHidden((prev) => !prev);
            }}
            id="NavbarIcon"
            className={styles.NavbarIcon}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
          <div
            style={{ "--MobileNavTrigger": mobileNavHidden ? "none" : "grid" } as React.CSSProperties}
            id="MNavULCont"
            className={styles.MNavULCont}
          >
            <ul>
              <p>About Me</p>
              <div>
                <li>
                  <Link
                    className="detectClickTMobile"
                    href="/#whatIOffer"
                  >
                    What I offer
                  </Link>
                </li>
                <li>
                  <Link
                    className="detectClickTMobile"
                    href="/#ServiceStart"
                  >
                    Our Service
                  </Link>
                </li>

                <li>
                  <Link
                    className="detectClickTMobile"
                    href="/#ContactUsStart"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className="detectClickTMobile"
                    href="/#testimonialStart"
                  >
                    Testimonials
                  </Link>
                </li>
              </div>
            </ul>

            <ul>
              <p>Projects</p>
              <div>
                <li>
                  <Link
                    className="detectClickTMobile"
                    href="/#projectListStart"
                  >
                    All Projects
                  </Link>
                </li>
                <li>
                  <Link
                    className="detectClickTMobile"
                    href="/videoGenerator"
                  >
                    Video Generator
                  </Link>
                </li>
                <li>
                  <Link
                    className="detectClickTMobile"
                    href="/dictionary"
                  >
                    Dictionary
                  </Link>
                </li>
                <li>
                  <Link
                    className="detectClickTMobile"
                    href="/artDraw"
                  >
                    Art canvas
                  </Link>
                </li>
                <li>
                  <Link
                    className="detectClickTMobile"
                    href="/perspectivePlayground"
                  >
                    Perspective Playground
                  </Link>
                </li>
                <li>
                  <Link
                    className="detectClickTMobile"
                    href="/toDo"
                  >
                    To Do List
                  </Link>
                </li>

                <li>
                  <Link
                    className="detectClickTMobile"
                    href="/calculator"
                  >
                    Calculator
                  </Link>
                </li>

                <li>
                  <Link
                    className="detectClickTMobile"
                    href="/techHaven"
                  >
                    Eccomerce
                  </Link>
                </li>
              </div>
            </ul>
            <ul>
              <p>Websites</p>

              <div>
                <li>
                  <Link
                    className="detectClickTMobile"
                    href="/#projectListStart"
                  >
                    All websites
                  </Link>
                </li>
              </div>
            </ul>
            
            <ul>
              <p>What I&apos;ve Learned</p>

              <div>
                <li>
                  <Link className="detectClickTMobile" href="/learned#htmlStart">
                    Html
                  </Link>
                </li>
                <li>
                  <Link className="detectClickTMobile" href="/learned#cssStart">
                    Css
                  </Link>
                </li>
                <li>
                  <Link
                    className="detectClickTMobile"
                    href="/learned#javascriptStart"
                  >
                    Javascript
                  </Link>
                </li>
                <li>
                  <Link className="detectClickTMobile" href="/learned#reactStart">
                    React
                  </Link>
                </li>
                <li>
                  <Link
                    className="detectClickTMobile"
                    href="/learned#DjangoStart"
                  >
                    Django
                  </Link>
                </li>
              </div>
            </ul>
          </div>
        </div>

        <div
          onClick={() => {rotateThemeSet(prev => prev + 360)}}
          id="navThemeCont"
          className={styles.navThemeCont}
          style={{rotate: `${rotateTheme}deg`}}
        >
          {themeLight ? (
            <svg
              onClick={changeTheme}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM352 256c0 53-43 96-96 96s-96-43-96-96s43-96 96-96s96 43 96 96zm32 0c0-70.7-57.3-128-128-128s-128 57.3-128 128s57.3 128 128 128s128-57.3 128-128z" />
            </svg>
          ) : (
            <svg
              onClick={changeTheme}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
            </svg>
          )}
        </div>
    
    </nav>
  )
}
