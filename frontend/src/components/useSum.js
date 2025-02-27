import React,{useState} from "react";
export default function useSum(inival=1) {
  const[count,setcount]=useState(0)
  const inc=()=>{setcount(count+inival)}
  const dec=()=>{setcount(count-inival)}
  const  res=()=>{setcount(0)}
  return[count,inc,dec,res]
}
