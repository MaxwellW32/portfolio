"use client"
import { useEffect, useRef, useState } from "react";
import styles from '../page.module.css'
import Link from 'next/link'

let interval: any;
let gravityInterval:any = "goAgain";

const keyTimeRec : [string, number][]  = []
const currentKeyTime: [string, Date] = ["", new Date()]
let keyLifted = true

const playerInfo = {
  positionX: 0,
  positionY: 900,
  canMove: true,
  playerWidth: 5,
  playerHeight: function () {
    return this.playerWidth * 2;
  },
};

const playerTwoInfo = {
  positionX: 0,
  positionY: 900,
  playerWidth: 5,
  playerHeight: function () {
    return this.playerWidth * 2;
  },

};

export default function TitleText() {

    useEffect(() => {
        //make headings focusable
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
  
    useEffect(() => {
      //start all
      startAuto();
  
      return () => {
        clearInterval(interval);
      };
    }, []);
  
    useEffect(() => {
      //change inner text
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
  

    



 
      
  const playerRef = useRef<HTMLDivElement>(null!);
  const playerTwoRef = useRef<HTMLDivElement>(null!);

  const moveDownVal = 200
  const moveUpVal = 500
  const moveLeftRightVal = 200

  function startGravity() {
    let maxYPosition = (100 / playerInfo.playerHeight()) * 100 - 100;

    gravityInterval = setInterval(() => {

      if (playerInfo.positionY >= maxYPosition && playerTwoInfo.positionY >= maxYPosition ) {
        clearInterval(gravityInterval);
        gravityInterval = "goAgain";

      } else {

        console.log(`max ${maxYPosition}, play2 ${playerTwoInfo.positionY}`)

          if (playerInfo.positionY <= maxYPosition){

            playerRef.current.style.translate = `${playerInfo.positionX}% ${(playerInfo.positionY += 5)}%`;
          }

          if (playerTwoInfo.positionY <= maxYPosition){
            playerTwoRef.current.style.translate = `${playerTwoInfo.positionX}% ${(playerTwoInfo.positionY += 5)}%`;
          }

          console.log(`still running`)
        }
    }, 10);
  }
  const starterOff = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // detect keyboard show player
    //make main div focused

    starterOff?.current?.focus();

    function handleKey(e:any) {
      if (e.key) {
        const player = document.getElementById("player") as HTMLElement
        player.style.display = "block";
        window.removeEventListener("keydown", handleKey);
      }
    }

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, []);


  function startAnimatingPlayerTwo(){

    playerTwoRef.current.style.display = "block"

    let index = 0
    const firstTime = keyTimeRec[0][1] 

    startLoop(firstTime)
    function startLoop(loopTime: number){

      //go over all array values in a loop
      //change things here

      if (keyTimeRec[index][0] === "w") { 
        console.log(`got in here`) 

        if (playerTwoInfo.positionY - moveUpVal < 0) {
          playerTwoRef.current.style.translate = `${playerTwoInfo.positionX}% ${playerTwoInfo.positionX = 0}%`;
        } else {
          playerTwoRef.current.style.translate = `${playerTwoInfo.positionX}% ${playerTwoInfo.positionX -= moveUpVal}%`;
        }

        
      } else if (keyTimeRec[index][0] === "a") {

        playerTwoRef.current.style.translate = `${playerTwoInfo.positionX -= moveLeftRightVal}% ${playerTwoInfo.positionX}%`;

      } else if (keyTimeRec[index][0] === "s") {

        playerTwoRef.current.style.translate = `${playerTwoInfo.positionX}% ${playerTwoInfo.positionX += moveDownVal}%`;

      } else if (keyTimeRec[index][0] === "d") {

        playerTwoRef.current.style.translate = `${playerTwoInfo.positionX += moveLeftRightVal}% ${playerTwoInfo.positionX}%`;
      }

      console.log(`index is ${index}, ${keyTimeRec.length}`)
      setTimeout(()=>{
        index++
        if (index <= keyTimeRec.length - 1){
          startLoop(keyTimeRec[index][1])
        }
      }, loopTime)

    }

  }

  
    return (
      <div
      ref={starterOff}
      tabIndex={0}
      onKeyDown={(e) => {
        e.key.toLowerCase()
        if (keyTimeRec.length >= 15){
          keyTimeRec.length = 0
        }
        
        if (keyTimeRec.length === 10){
          startAnimatingPlayerTwo()
        }

        if (e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d"){
          
          if (keyLifted){
            console.log(`hit ${e.key}`)
            currentKeyTime[0] = e.key
            currentKeyTime[1] =  new Date()

          }else{
            console.log(`holding down ${e.key}`)
            keyTimeRec.push([currentKeyTime[0], 0])
          }

          console.log("keyslist ", keyTimeRec)


          if (e.key === "w") {
            //gravity is constant until it hits th floor
            //gravity also stops when i press w
            //then starts again afyer a second
            //gravity does not star again unless the user leaves the keyboard for 200ms

            if (gravityInterval === "goAgain") {
              startGravity();
            }

            if (playerInfo.positionY - moveUpVal < 0) {
              playerInfo.positionY = 0;
            } else {
              playerInfo.positionY -= moveUpVal;
            }

            playerRef.current.style.translate = `${playerInfo.positionX}% ${playerInfo.positionY}%`;
          } else if (e.key === "a") {
            if (playerInfo.positionX - moveLeftRightVal < 0) {
              playerInfo.positionX = 0;
            } else {
              playerInfo.positionX -= moveLeftRightVal;
            }

            playerRef.current.style.transform = `rotateY(0deg)`;
            playerRef.current.style.translate = `${playerInfo.positionX}% ${playerInfo.positionY}%`;
          } else if (e.key === "s") {
            let maxYPosition = (100 / playerInfo.playerHeight()) * 100 - 100;

            if (playerInfo.positionY + moveDownVal > maxYPosition) {
              playerInfo.positionY = maxYPosition;
            } else {
              playerInfo.positionY += moveDownVal;
            }

            playerRef.current.style.translate = `${playerInfo.positionX}% ${playerInfo.positionY}%`;
          } else if (e.key === "d") {
            let maxXPosition = (100 / playerInfo.playerWidth) * 100 - 100;

            if (playerInfo.positionX + moveLeftRightVal > maxXPosition) {
              playerInfo.positionX = maxXPosition;
            } else {
              playerInfo.positionX += moveLeftRightVal;
            }

            playerRef.current.style.transform = `rotateY(180deg)`;
            playerRef.current.style.translate = `${playerInfo.positionX}% ${playerInfo.positionY}%`;
          }

        }

        keyLifted = false
      }}

      onKeyUp={(e) => {
        const endTime = new Date()
        const duration = Math.abs(endTime.getTime() - currentKeyTime[1].getTime())

        keyTimeRec.push([currentKeyTime[0], duration])

        console.log(`duration for key ${currentKeyTime[0]}: ${duration}`)

        keyLifted = true
      }}
      >
        <div
          ref={playerRef}
          style={{
            "--playerWidth": `${playerInfo.playerWidth}%`,
            "--playerHeight": `${playerInfo.playerHeight()}%`,
          }as React.CSSProperties}
          className={styles.player}
          id="player"
      ></div>

      <div
        ref={playerTwoRef}
        style={{
          "--playerWidth": `${playerInfo.playerWidth}%`,
          "--playerHeight": `${playerInfo.playerHeight()}%`
        }as React.CSSProperties}
        className={styles.playerTwo}
        id="playerTwo"
      ></div>


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
  
            onInput={(e:any) => {
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
  