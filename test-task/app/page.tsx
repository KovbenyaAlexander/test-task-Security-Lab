'use client'

import Image from "next/image";
import {useState} from "react";
import {Button} from "@/components/ui/button";

export default function Home() {


  const [counter, setCounter] = useState(0)

  const onClickHandler = () => {
    console.log(`log`)
    setCounter(p => p + 1)
  }


  return (
    <div>
      <h1>{counter}</h1>
      <Button onClick={onClickHandler}>BUTTON</Button>

      {/*<div className="bg-blue-500 text-white p-4 rounded">*/}
      {/*  test*/}
      {/*</div>*/}




    </div>
  );
}
