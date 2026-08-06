import { useMask } from "@react-three/drei";
import * as THREE from "three";
import { texture } from "three/src/nodes/accessors/TextureNode.js";

export const createMaterials = (
    textures: Record<string, THREE.Texture>,
    stencil?: ReturnType<typeof useMask>
)=>{
   const mats: Record<string, THREE.MeshBasicMaterial> = {};
   for(const [key, tex] of Object.entries(textures)){
    mats[key] = new THREE.MeshBasicMaterial({map: tex, ...(stencil ?? {})});
   }
   return mats;
}