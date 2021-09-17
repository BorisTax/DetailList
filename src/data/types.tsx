export type TDetail = {
    name:string
    length:number
    width:number
    count:number
    materialID:number
    edgeLength1:number
    edgeLength2:number
    edgeWidth1:number
    edgeWidth2:number
    modules:string
}
export type TUnit = {
    name:string
    shortName:string
    count:number
    details:TDetail[]
    materialsCount:number

}