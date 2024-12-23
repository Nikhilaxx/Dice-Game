import TotalScore from "./TotalScore"
import NumberSelector from "./NumberSelector"
import styled from "styled-components"
import RollDice from "./RollDice"
import Rules from "./Rules"
import { useState } from "react"
import {Button, OutlineButton} from "../styled/Button"

const GamePlay = () => {
  const [score,setScore]=useState(0);
  const [selectedNumber,setSelectedNumber]=useState(null);
  const[currentDice,setCurrentDice]=useState(1);
  const[error,setError]=useState("");
  const [showRules,setShowRules]=useState(false);

  const generateRandomNumber = (min,max) => { 
    console.log(Math.floor(Math.random() * (max - min) + min));
    return Math.floor(Math.random() * (max - min) + min);
}
const rollDice = () =>{
  if(!selectedNumber){
    setError("You Have Not Selected any Number");
    return;
}


    const randomNumber = generateRandomNumber(1,7);
    setCurrentDice((prev)=>randomNumber);

    if (selectedNumber===randomNumber){
      setScore((prev)=>prev +randomNumber);
    }
    else{
      setScore((prev)=>prev -2);
    }
    setSelectedNumber(undefined);
  }

  const resetScore = () =>{
    setScore(0);

  }
  
  return (
    <MainContainer>
      <div className="TopSection">
      <TotalScore score={score} />
      <NumberSelector 
      error={error}
      setError={setError}
      selectedNumber={selectedNumber}
      setSelectedNumber={setSelectedNumber}/>
      </div>
      <RollDice currentDice={currentDice } 
        rollDice={rollDice}
     />
     <div className="btns">
<OutlineButton onClick={resetScore}>Reset</OutlineButton>
<Button onClick={()=>setShowRules((prev)=>!prev)}>{showRules ? "Hide": "Show"} Rules</Button>
{showRules && <Rules />}
     </div>
    </MainContainer>
  )
}

export default GamePlay

const MainContainer=styled.main`
padding-top: 70px;
.TopSection{
  display: flex;
  justify-content: space-around;
  align-items: end;
}
.btns{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap:10px;
}`;