export type TDetail = {
    name:string
    length:number
    width:number
    count:number
    materialId:number
    material?: string
    edgeLength1:number
    edgeLength2:number
    edgeWidth1:number
    edgeWidth2:number
    paz:string
    comment:string
    modules?:Map<string, number>
    edgeColumn?:string
}
export type TUnit = {
    name:string
    shortName:string
    rootGroupName:string
    groupName:string
    count:number
    details:TDetail[]
    materialsCount:number
    materials:TMaterial[]
}
export type TLibrary = {
    type:string
    version:string
    materials:TMaterial[]
    rootGroups:TLibraryRootGroup[]
}
export type TLibraryRootGroup = {
    name:string
    groups:TLibraryGroup[]
}
export type TLibraryGroup = {
    name:string
    units:TLibraryUnit[]
}
export type TLibraryUnit = {
    name:string
    shortName:string
    materialsCount:number
    details:TDetail[]
}
export type TLibraryDetail = {
    name:string
    length:number
    width:number
    count:number
    materialID:number
    edgeLength1:number
    edgeLength2:number
    edgeWidth1:number
    edgeWidth2:number
    paz:string
    comment:string
}

export type TMaterial={
    name:string
    length:number
    width:number
    texture:boolean
    kim?:number,
    gloss?:boolean
}
export const defaultMaterial: TMaterial ={
    name:"",
    length:2800,
    width:2070,
    texture:true
}
export interface IXMLTag {
    toString:()=>string
    setName:(name:string)=>void
    addAttribute:(key:string,value:string)=>void
    addChild: (child: IXMLTag)=>void
}