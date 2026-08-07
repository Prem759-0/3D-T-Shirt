"use client"

import Scene from "@/components/Scene";
import { ShirtType } from "@/lib/textures";
import { notFound, useParams } from "next/navigation"

const Page = () => {
    const params =  useParams();
    const shirtType = params?.slug as ShirtType;
    if(!shirtType) return notFound();
       return(
          <>
             <Scene shirtType={shirtType}/>
             <ScrollIndicator shirtType={shirtType}/>
          </>
       )
}