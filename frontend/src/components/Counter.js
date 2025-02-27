import React from 'react';
import useSum from './useSum';

export default function Counter() {
    const[num,inc,dec,res]=useSum(2)
  return (
    <div><p>{num}</p>
     <button onClick={inc}>Increment</button>
     <button onClick={dec}>Decrement</button>
     <button onClick={res}>Reset</button>
    </div>
  );
}
