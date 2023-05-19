"use client"
import { useEffect, useRef, useState } from "react";
import styles from './page.module.css'

const playerInfo = {
  width: 5,
  height: 10,
  step: function(){
    return this.width / 4
  },
  top: 0,
  left: 0,
  directionFacing: "left",
}


const keys: {
  [key : string]: [boolean, number]
} = {
  w: [false, 0],
  a: [false, 0],
  s: [false, 0],
  d: [false, 0],
};


export default function MyPlayer(){

    const playerRef = useRef<HTMLDivElement>(null!)

    //start up the player - event listeners
    useEffect(()=>{
      playerRef.current.style.width = `${playerInfo.width}%`
      playerRef.current.style.height = `${playerInfo.height}%`

      document.addEventListener("keydown", handleKeyDown)
      document.addEventListener("keyup", handleKeyUp)

      return ()=>{
        document.removeEventListener("keydown", handleKeyDown)
        document.removeEventListener("keyup", handleKeyUp)

      }
    },[])

    const [playersOnGround, setPlayersOnGround] = useState(false)

    //start gravity interval
    useEffect(()=>{
      const gravityInterval = setInterval(()=>{

        keys["s"][0] = true;          
        movePlayer()

      },10)


      if (playersOnGround){
        //stop interval
        clearInterval(gravityInterval)
      }

      return () => clearInterval(gravityInterval)
    },[playersOnGround])

    
    function movePlayer(specificKey?: string){
        // Check for simultaneous key presses
   
       const futurePosition = {top: playerInfo.top, left: playerInfo.left}
       const stepAmount = playerInfo.step()
     
     
        if (keys['w'][0]) {
         // Move player up
         setPlayersOnGround(false)
         futurePosition.top -= stepAmount * 2
       } 
       
       if (keys['s'][0]) {
         // Move player down
         futurePosition.top += stepAmount
         
       } 
       
       if (keys['a'][0]) {
         // Move player left
         futurePosition.left -= stepAmount
         rotatePlayer("left")
         playerInfo.directionFacing = "left"
       } 
       
       if (keys['d'][0]) {
         // Move player right
         futurePosition.left += stepAmount
         rotatePlayer("right")
         playerInfo.directionFacing = "right"

         
       }
   
       const maxX = 100 - playerInfo.width
       const maxY = 100 - playerInfo.height
   
       if (futurePosition.left >= 0 && futurePosition.left <= maxX){
         playerInfo.left = futurePosition.left
         playerRef.current.style.left = `${playerInfo.left}%`
       }else if (futurePosition.left < 0){
         playerInfo.left = 0
         playerRef.current.style.left = `${playerInfo.left}%`
       }else if(futurePosition.left > maxX){
         playerInfo.left = maxX
         playerRef.current.style.left = `${playerInfo.left}%`
       }
       
       if (futurePosition.top >= 0 && futurePosition.top <= maxY){
         playerInfo.top = futurePosition.top
         playerRef.current.style.top = `${playerInfo.top}%`
       }else if (futurePosition.top < 0){
         playerInfo.top = 0
         playerRef.current.style.top = `${playerInfo.top}%`
       }else if(futurePosition.top > maxY){
        //hit bottom
        setPlayersOnGround(true)
         playerInfo.top = maxY
         playerRef.current.style.top = `${playerInfo.top}%`
       }
   
    }
   
    function runExtraVelocity(key: string, repValue: number){
  
      const max = 6
      
      if(repValue > max){
        repValue = max
      }
  
      const myInterval = setInterval(()=>{
  
        if (repValue > 1){
          additionalMove()
          repValue--
        }else{
          clearInterval(myInterval)
        }
  
      },20)
  
      function additionalMove(){
        const futurePosition = {top: playerInfo.top, left: playerInfo.left}
        const stepAmount = playerInfo.step()
      
      
        if (key === "w") {
          // Move player up
          futurePosition.top -= stepAmount
        } 
        
        if (key === "s") {
          // Move player down
          futurePosition.top += stepAmount
          
        } 
        
        if (key === "a") {
          // Move player left
          futurePosition.left -= stepAmount
          
        } 
        
        if (key === "d") {
          // Move player right
          futurePosition.left += stepAmount
          
        }
    
        const maxX = 100 - playerInfo.width
        const maxY = 100 - playerInfo.height
    
        if (futurePosition.left >= 0 && futurePosition.left <= maxX){
          playerInfo.left = futurePosition.left
          playerRef.current.style.left = `${playerInfo.left}%`
        }else if (futurePosition.left < 0){
          playerInfo.left = 0
          playerRef.current.style.left = `${playerInfo.left}%`
        }else if(futurePosition.left > maxX){
          playerInfo.left = maxX
          playerRef.current.style.left = `${playerInfo.left}%`
        }
        
        if (futurePosition.top >= 0 && futurePosition.top <= maxY){
          playerInfo.top = futurePosition.top
          playerRef.current.style.top = `${playerInfo.top}%`
        }else if (futurePosition.top < 0){
          playerInfo.top = 0
          playerRef.current.style.top = `${playerInfo.top}%`
        }else if(futurePosition.top > maxY){
          playerInfo.top = maxY
          playerRef.current.style.top = `${playerInfo.top}%`
        }
      }
  
    }

    const handleKeyDown = (event: KeyboardEvent )=>{


      const key = event.key.toLowerCase()

      if (key === "w" || key === "a" || key === "s" || key === "d"){
          keys[key][0] = true;
          keys[key][1] = keys[key][1] += 1;
          
          movePlayer()
      }

    }

    const handleKeyUp = (event: KeyboardEvent)=>{

      const key = event.key.toLowerCase()

      if (key === "w" || key === "a" || key === "s" || key === "d"){
      //velocity continuation
      // runExtraVelocity(key, keys[key][1])

      keys[key][0] = false;
      keys[key][1] = 0;
      }

    }

    
    function rotatePlayer(option: string){

      //eliminate duplicate same direction clicks
      //only run when things change

      //so store a variable that represents the direction
      //if same direction is passed do nothing
      //else change
      
      if (playerInfo.directionFacing !== option){

        if(option === "left"){
          playerRef.current.style.transform = "rotateY(0deg)"
        }else{
          playerRef.current.style.transform = "rotateY(180deg)"
        }

      }
    }
    return (
        <div className={styles.playerDiv}>
            <div ref={playerRef} className={styles.player}>
            </div>
        </div>
    )
}