
import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three"



type GLTFResult = {
    nodes: {
        [name: string] : THREE.Mesh;
    }
}

export function MainStudioModel ({
    currentIndex,
    scale,
}:{
    currentIndex: number;
    scale: number;
}){
   const {nodes} = useGLTF(
    "/models/main/MainStudio.glb"
   ) as unknown as GLTFResult;

   const textures = useMainStudioTextures();
   const mats = createMaterials(textures) as Record<keyof typeof studioTextures.main, 
   THREE.MeshBasicMaterial>;

   const shirts = useMemo(
    ()=> [
        {
            position: [0.65, 0.7, -0.45] as [number, number, number],
            rotation: [0, Math.PI / 9,0] as [number, number, number],
            geometry: nodes.Shirt_White.geometry,
            materials: mats.whiteShirt,
            hoverMat: mats.whiteStudio,
            slug: "white",
        },
        {
            position: [0, 0.7, 0] as [number, number, number],
            rotation: [0, 0, 0] as [number, number, number],
            geometry: nodes.Shirt_Sport.geometry,
            materials: mats.sportShirt,
            hoverMat: mats.redStudio,
            slug: "sport",
        },
        {
            position: [-0.65, 0.7, -0.45] as [number, number, number],
            rotation: [0, -Math.PI / 9,0] as [number, number, number],
            geometry: nodes.Shirt_Gray.geometry,
            materials: mats.grayShirt,
            hoverMat: mats.grayStudio,
            slug: "gray",
        },
    ],
    [nodes, mats]
   );
}