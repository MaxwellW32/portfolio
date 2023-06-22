"use client"
import styles from "./page.module.css"
import Image from "next/image";
import React, { useState, useEffect, useRef, useMemo } from "react";
import eye from "../../public/LearnedStuff/eyecool.png"
import eyeShadow from "../../public/LearnedStuff/eye shadow.png"
import eyeOutline from "../../public/LearnedStuff/eye outline only.png"

function Learned() {

  useEffect(()=>{
    //move eye with cursor
    const eyeCont = document.querySelector("#eyeCont") as HTMLElement
    const realEye = document.querySelector("#realeye") as HTMLElement
    const anchor = document.querySelector("#anchor") as HTMLElement
    const testT = document.querySelector("#testText") as HTMLElement
    let eyeMiddleFocused = false

    const moveEyes = (event: MouseEvent)=>{
      const {clientX: mouseX, clientY: mouseY} = event

      const rekt = anchor.getBoundingClientRect()
      const anchorX = rekt.left + rekt.width / 2
      const anchorY = rekt.top + rekt.height / 2

      let distanceX = anchorX-mouseX
      let distanceY = anchorY-mouseY

      if (distanceX < 0){
        distanceX *= -1
      }

      if (distanceY < 0){
        distanceY *= -1
      }

      let limit = 70
      if (distanceX < limit && distanceY < limit){
        eyeMiddleFocused = true

        realEye.style.transition = `translate 1s`
        realEye.style.translate = `0%`


      }else{

        if (eyeMiddleFocused){
          realEye.style.translate = `-5%`

          setTimeout(()=>{
            realEye.style.transition = `translate 400ms`
          },1000)

          eyeMiddleFocused = false
        }

              const angleDeg = angle(mouseX, mouseY, anchorX, anchorY)
        
              eyeCont.style.transform = `rotate(${angleDeg}deg)`
              realEye.style.rotate = `${angleDeg*-1}deg`
      }

    }

    const angle = (cx:number, cy:number, ex:number, ey:number)=>{
      const dy = ey - cy
      const dx = ex - cx
      const rad = Math.atan2(dy, dx)
      const deg = rad * 180 / Math.PI
      return deg

    }

    document.addEventListener("mousemove", moveEyes)

    return ()=>document.removeEventListener("mousemove", moveEyes)
  },[])


  return (
    <div className={styles.LearnDiv}>

      <div className={styles.myCont} id="anchor">
        <div className={styles.eyeCont} id="eyeCont">
          <Image alt="eye" className={styles.realeye} id="realeye" src={eye}/>
        </div>
        <Image alt="eyeshadow" src={eyeShadow}/>
        <Image alt="eyeoutline" src={eyeOutline}/>
      </div>


      <section className={styles.hidden}>
        <h1 id="htmlStart">HTML</h1>
        <p>
          I&apos;ve learned so so much in this amzaing language, so many tips and
          tricks!
        </p>
        <p>
          Html truly is a powerful language that can respond to any use request
        </p>

        <p>You can provide any user service with HTML</p>
      </section>

      <section className={styles.hidden}>
        <h1 id="cssStart">CSS</h1>
        <p>
          12.22.22 Today I learned all about animation. I can make anything.
          Including the keyframe dev tools built right into chrome.
        </p>
        <p>
          12.23.22 Today I figured out how to hide the scrollbar and keep
          functionality, I also figured out different ways to style it
        </p>
        <p>
          12.24.22 You can tell if an element is in view dynamically with the
          bserver class and assign elements that apply animation acoordingly as
          soon as it is withing view
        </p>
        <p>
          12.25.22 Today I learned that with CSS it is possible to space
          elements out in Z space and create a 3-D parallax effect
        </p>
        <p>
          12.26.22 I also learned that you can keep images in place while
          scrolling which leads to a cool effect
        </p>
        <p>
          12.29.22 Learned about the different selector methods *+~{">"} made it
          a lot easier handling complex css
        </p>
        <p>01/05/23 Checkbox hack! Such a cool find</p>
        <p>
          01/15/23 Found out you can change the default selection color in any
          text
        </p>
        <p>
          01/19/23 You can set custom variables that are specific to each
          element and only seen by their children. &quo--varName : anyProperty&quo.
          Really useful
        </p>
      </section>

      <section className={styles.hidden}>
        <h1 id="javascriptStart">Javascript</h1>
        <p>
          Where do I begin, first off you can do...anything. I mean code. Build
          mobile apps. Talk to API&apos;s all in one place
        </p>
        <p>
          I have learned so much about this language I am confident I can build
          anything
        </p>
        <p>
          I leanred use Context! Implement the cart on my donut site was the
          best way to familiarize myself with this concept. Keeping active state
          throughout my application!{" "}
        </p>
      </section>

      <section className={styles.hidden}>
        <h1 id="reactStart">React</h1>
        <p>
          React is a libray that provides all the necessary frameworks I need to
          make writing javascript easier
        </p>
        <p>
          It is also fantastic for mixing HTML and Js write into one element
          with Jsx allowing for dynamic user interactions
        </p>
        <p>
          React has been really fun as an all in one place to manage everything
          I need when designing a website. Especially with frameworks such as
          Next.js
        </p>
      </section>

      <section className={styles.hidden}>
        <h1 id="DjangoStart">Django</h1>
        <p>
          Django has taught me so much about how servers work. Not just on the
          backend, but in general how they handle user requests and send back
          and HTML document as a response
        </p>
        <p>
          I also learned how to setup my own REST Api to talk to my front end.
        </p>
        <p>
          I also get lot&apos;s of experience with Python, and as a Java programmer I
          love picking up new languages!
        </p>
      </section>
    </div>
  );
}

export default Learned;
