import React, { createContext, useState } from "react";
 
export const addStaionResponseContext =createContext()
export const updateStaionResponseContext =createContext()
export const reviewAndRatingContext= createContext()

const Contextapi = ({children})=>{
    const[addStaionResponse,setAddStaionResponse]=useState("")
    const[updateStaionResponse,setUpdateStaionResponse]=useState("")
    const[reviewStaionResponse,setReviewStaionResponse]=useState("")

    return (
       <reviewAndRatingContext.Provider value={{reviewStaionResponse,setReviewStaionResponse}} >
           <updateStaionResponseContext.Provider value={{updateStaionResponse,setUpdateStaionResponse}}>
                <addStaionResponseContext.Provider value={{addStaionResponse,setAddStaionResponse}}>
                    {children}
                </addStaionResponseContext.Provider>
           </updateStaionResponseContext.Provider>
       </reviewAndRatingContext.Provider>
    )
}
export default Contextapi;