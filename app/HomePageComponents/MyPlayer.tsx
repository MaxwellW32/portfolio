"use client"
import { useEffect, useRef, useState } from "react";
import styles from './page.module.css'

//intersection observe
//get working with 1 platform

export default function MyPlayer() {

  useEffect(() => {
    startAll()
  }, [])

  function startAll() {

    interface PlayerStats {
      width: number;
      height: number;
      step: number;
      top: number;
      left: number;
      directionFacing: string;
    }


    interface collisionObjs {
      [key: string]: {
        floorElement: HTMLElement,
        floorLocaInfo: DOMRect,
      }
    }

    const player1Info: PlayerStats = {
      width: 50,
      height: 76,
      step: 3,
      top: 0,
      left: 0,
      directionFacing: "left",
    }

    // const collsnElsMaster:collisionObjs = getAllFloorElements("#maindivTitleText")
    const collsnElsMaster: collisionObjs = getAllFloorElements("h1, h2, h3, h4, h5, h6, img, p, button")

    function getAllFloorElements(searchElements: string) {
      const elements: NodeListOf<HTMLElement> = document.querySelectorAll(`${searchElements}`);

      const newObj: collisionObjs = {}
      const name = `CollEl_`
      elements.forEach((eachEl, index) => {
        index++
        eachEl.setAttribute("data-platform-name", `${name + index}`)
        newObj[name + index] = {
          floorElement: eachEl,
          floorLocaInfo: eachEl.getBoundingClientRect(),
        }
      })

      return newObj
    }


    MakePlayer(player1Info, "player1", "wasd")
    MakePlayer({ ...player1Info }, "player2", "ijkl")

    function MakePlayer(playerInfo: PlayerStats, idName: string, upLeftBottRight: string) {

      const newPlayEl = document.createElement("div")
      const playerCanvasDiv = document.querySelector("#playerCanvasDiv") as HTMLElement

      newPlayEl.setAttribute("class", styles.player)
      newPlayEl.setAttribute("id", idName)

      newPlayEl.style.width = `${playerInfo.width}px`
      newPlayEl.style.height = `${playerInfo.height}px`
      newPlayEl.style.top = `${playerInfo.top}px`
      newPlayEl.style.left = `${playerInfo.left}px`


      function makePlatformVisible(elementsObj: collisionObjs) {
        // console.clear()

        let allEl = document.querySelectorAll(`.${styles.platform}`) as NodeListOf<HTMLElement>

        allEl.forEach((eachEl) => {
          eachEl.remove()
        })

        for (const key in elementsObj) {

          const newPlatform = document.createElement("div")

          newPlatform.setAttribute("class", styles.platform)

          newPlatform.style.width = `${elementsObj[key].floorLocaInfo.width}px`
          newPlatform.style.height = `${5}px`
          newPlatform.style.top = `${elementsObj[key].floorLocaInfo.top}px`
          newPlatform.style.left = `${elementsObj[key].floorLocaInfo.left}px`

          // console.log(`top ${top}`, elementsObj[key].floorElement)

          playerCanvasDiv.append(newPlatform)
        }

        // console.table(elementsObj)

      }

      const plyrCollisObjs: collisionObjs = {}

      runObserver()
      function runObserver() {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {

            const dataPlatformNameVal = entry.target.getAttribute("data-platform-name")!

            if (entry.isIntersecting) {

              plyrCollisObjs[dataPlatformNameVal] = { ...collsnElsMaster[dataPlatformNameVal] }

              // makePlatformVisible(plyrCollisObjs)
              // The element is visible

            } else {
              // The element is not visible
              delete plyrCollisObjs[dataPlatformNameVal]
              // makePlatformVisible(plyrCollisObjs)
            }
          });
        });

        for (const key in collsnElsMaster) {
          observer.observe(collsnElsMaster[key].floorElement);
        }
      }


      document.addEventListener("keydown", handleKeyDown)
      document.addEventListener("keyup", handleKeyUp)

      playerCanvasDiv.append(newPlayEl)

      const keys: {
        [key: string]: boolean
      } = {
      };

      keys[upLeftBottRight[0]] = false
      keys[upLeftBottRight[1]] = false
      keys[upLeftBottRight[2]] = false
      keys[upLeftBottRight[3]] = false


      let gravityOn = false
      let canStartControlsRepeater = false

      function handleKeyDown(event: KeyboardEvent) {
        const key = event.key.toLowerCase()

        if (key === upLeftBottRight[0] || key === upLeftBottRight[1] || key === upLeftBottRight[2] || key === upLeftBottRight[3]) {

          keys[key] = true;

          if (!gravityOn) {
            gravityOn = true
          }

          if (!canStartControlsRepeater) {
            canStartControlsRepeater = true
            controlsRepeater("start")
          }



          //end gravity in movement on ground
          //end controls repeater if no key pressed


        }

      }

      function handleKeyUp(event: KeyboardEvent) {

        const key = event.key.toLowerCase()

        if (key === upLeftBottRight[0] || key === upLeftBottRight[1] || key === upLeftBottRight[2] || key === upLeftBottRight[3]) {
          keys[key] = false;
        }



      }

      let moveRepeaterInterval: NodeJS.Timer | undefined
      function controlsRepeater(option: string) {
        //run the move function over and over

        if (option === "start") {
          moveRepeaterInterval = setInterval(() => {
            console.log(`moving`)
            movePlayer()
          }, 0)
        } else if (option === "stop") {
          console.log(`went to stop`, keys)
          clearInterval(moveRepeaterInterval)
        }



      }

      // makePlayerLineVisible()
      function makePlayerLineVisible() {
        const plysBttmLineView = document.createElement("div")

        plysBttmLineView.setAttribute("class", styles.playerBottomLine)
        plysBttmLineView.setAttribute("id", `playerPlatform`)

        plysBttmLineView.style.width = `${playerInfo.width}px`
        plysBttmLineView.style.height = `${5}px`

        playerCanvasDiv.append(plysBttmLineView)
      }



      let playerOnAPlatform = false

      function movePlayer() {
        const futurePosition = { top: playerInfo.top, left: playerInfo.left }
        const stepAmount = playerInfo.step

        if (keys[upLeftBottRight[0]]) {
          // Move player up
          futurePosition.top -= stepAmount * 2
        }

        if (keys[upLeftBottRight[2]] || gravityOn) {
          // Move player down
          futurePosition.top += stepAmount
        }

        if (keys[upLeftBottRight[1]]) {
          // Move player left
          futurePosition.left -= stepAmount
          flipPlayer("left")
          playerInfo.directionFacing = "left"
        }

        if (keys[upLeftBottRight[3]]) {
          // Move player right
          futurePosition.left += stepAmount
          flipPlayer("right")
          playerInfo.directionFacing = "right"
        }


        let playerBottomLine = playerInfo.top + playerInfo.height

        if (playerOnAPlatform) {
          playerBottomLine += 1
          playerOnAPlatform = false
        }

        //  plysBttmLineView.style.top = `${playerBottomLine}px`
        //  plysBttmLineView.style.left = `${futurePosition.left}px`

        const maxX = window.innerWidth - playerInfo.width
        let closest = findClosestPlatform(playerBottomLine, futurePosition.left, playerInfo.width)

        //  if (closest > 1000){
        //   closest = 1000
        //  }

        const maxY = closest - playerInfo.height

        if (futurePosition.left >= 0 && futurePosition.left <= maxX) {
          playerInfo.left = futurePosition.left
        } else if (futurePosition.left < 0) {
          playerInfo.left = 0
        } else if (futurePosition.left > maxX) {
          playerInfo.left = maxX
        }

        if (futurePosition.top >= 0 && futurePosition.top <= maxY) {
          playerInfo.top = futurePosition.top
        } else if (futurePosition.top < 0) {
          playerInfo.top = 0
        } else if (futurePosition.top > maxY) {
          //hit bottom
          gravityOn = false

          const { height } = document.body.getBoundingClientRect()
          if (maxY !== height) {
            //player on a platform
            playerOnAPlatform = true
          }

        }


        if (keys[upLeftBottRight[0]] === false && keys[upLeftBottRight[1]] === false && keys[upLeftBottRight[2]] === false && keys[upLeftBottRight[3]] === false && gravityOn === false) {
          canStartControlsRepeater = false
          controlsRepeater("stop")
        }

        drawPlayerToDom(newPlayEl, playerInfo.left, playerInfo.top)
      }



      function findClosestPlatform(plyrBttmLine: number, playerX: number, playerWidth: number) {
        let minDistance = Infinity
        let minElement: HTMLElement | undefined

        //get all platforms in obj that player above
        //only look at platforms player can land on x values
        //choose a distance the closest one is at

        //returned only floors the player was above

        //get the closest one on x value
        for (const key in plyrCollisObjs) {
          const playerOverlappingFloor = playerX + playerInfo.width >= plyrCollisObjs[key].floorLocaInfo.left && playerX + playerWidth <= plyrCollisObjs[key].floorLocaInfo.right
          const playerAboveFloor = plyrBttmLine <= plyrCollisObjs[key].floorLocaInfo.top

          if (playerAboveFloor && plyrCollisObjs[key].floorLocaInfo.top < minDistance && playerOverlappingFloor) {
            minDistance = plyrCollisObjs[key].floorLocaInfo.top
            minElement = plyrCollisObjs[key].floorElement
          }

        }

        if (minDistance === Infinity) {
          const { height } = document.body.getBoundingClientRect()
          minDistance = height
        }


        //  console.log(minDistance)
        //  console.log(minElement)

        return minDistance
      }

      function drawPlayerToDom(playerElement: HTMLElement, updatedX: number, updatedY: number) {
        playerElement.style.top = `${updatedY}px`
        playerElement.style.left = `${updatedX}px`
      }

      function flipPlayer(option: string) {

        if (playerInfo.directionFacing !== option) {

          if (option === "left") {
            newPlayEl.style.transform = "rotateY(0deg)"
          } else {
            newPlayEl.style.transform = "rotateY(180deg)"
          }

        }
      }

    }
  }



  return (
    <div id="playerCanvasDiv" className={styles.playerCanvasDiv}>
    </div>
  )
}