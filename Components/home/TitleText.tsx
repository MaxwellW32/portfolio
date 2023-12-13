"use client"
import { useEffect, useState } from "react";
import styles from '../../app/page.module.css'
import Link from 'next/link'

let interval: any;

export default function TitleText() {

  //make headings focusable
  useEffect(() => {
    document.querySelectorAll(".homeSection").forEach((e) => {
      e.setAttribute("tabindex", "0");
    });
  }, []);

  const [codeText, setCodeText] = useState(`CODING`);
  const [currentStatement, setCurrentStatement] = useState(0);

  const textArray = [
    {
      statement: "I LOVE",
      glitchText: codeText,
      canEdit: true,
    },
    {
      statement: "I LOVE",
      glitchText: "LEARNING",
      canEdit: false,
    },
    {
      statement: "LET'S",
      glitchText: "CREATE",
      canEdit: false,
    },
  ];

  //start all
  useEffect(() => {
    startAuto();

    return () => {
      clearInterval(interval);
    };
  }, []);

  //change inner text
  useEffect(() => {
    const gli = document.querySelector("#glitch") as HTMLElement
    gli.innerText = textArray[currentStatement].glitchText;
  }, [currentStatement]);


  function startAuto() {
    const bigT = document.querySelector("#bigTitle") as HTMLElement

    interval = setInterval(() => {
      bigT.style.transition = "opacity 1500ms";
      bigT.style.opacity = "1";

      setCurrentStatement(prevNum => (prevNum + 1) % textArray.length);

      setTimeout(() => {
        bigT.style.transition = "opacity 1000ms";
        bigT.style.opacity = "0";
      }, 3000);
    }, 4000);
  }






  return (
    <div
      id="maindivTitleText"
      tabIndex={0}
    >

      <p>
        CREATIVE - SOFTWARE ENGINEER - FULLSTACK WEB DEVELOPER
      </p>

      <p id="bigTitle" className={styles.bigTitle}>
        {textArray[currentStatement].statement}
        {" "}
        <span
          id="glitch"
          contentEditable={textArray[currentStatement].canEdit}
          data-text={textArray[currentStatement].glitchText}
          className={textArray[currentStatement].canEdit ? styles.glitch : styles.gYellow}

          onInput={(e: any) => {
            setCodeText(e.target.innerText);
            clearInterval(interval);

            const bigT = document.querySelector("#bigTitle") as HTMLElement

            setTimeout(() => {
              bigT.style.opacity = "1"
            }, 3000);
          }}

          onBlur={startAuto}
        ></span>
      </p>

      <br />

      <Link href="#ServiceStart">
        <button >WHAT I CAN DO</button>
      </Link>
    </div>
  );
}
