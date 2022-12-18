import { TDetail, TMaterial } from "./types"

export const exportVacuum = (list: TDetail[], mat: TMaterial, info: {order:string, plan: string, date: string}) =>{
    let s: string = ""
    const newList: TDetail[] = []
    let detCount: number = 0
    for(let det of list){
        newList.push(det)
        detCount = detCount + 1
    }
    const order: string = info.order
    const plan: string = info.plan
    const materialName = mat.name
    const gloss: string = `${mat.gloss}`
    const texture: string = `${mat.texture}`
    let detBlock: string = "["
    let detJSON: string = ""
    let id: number = 0
    const margin: number = mat.gloss?50:40
    for(let d of newList){
        id = id + 1
        detJSON = `{"count": ${d.count}`
        detJSON = detJSON + ',"created":0'
        detJSON = detJSON + `,"id":" ${id}`
        detJSON = detJSON + `,"length": ${d.length}`
        detJSON = detJSON + `,"listKey": "primary"`
        detJSON = detJSON + `,"margin": ${margin}`
        detJSON = detJSON + `,"module": "${d.modules?.keys().next().value}"`
        detJSON = detJSON + `,"name":"${d.name}"`
        detJSON = detJSON + `,"placed": 0`
        detJSON = detJSON + `,"width": ${d.width}`
        detJSON = detJSON + "}"
        detBlock = detBlock + detJSON
        if(id < detCount) detBlock = detBlock + ","
    }
    detBlock = detBlock + "]"
    
    let detListJSON: string = `"detailList": {"primary": ${detBlock} , "secondary": []},`
    s = `{ "project": 1, "state": {"activeTable": 0, ${detListJSON}`
    s = s + `"drawModuleInCaption": true,`
    s = s + `"information": {"order": "${order}", "plan": "${plan}"},`
    s = s + `"material"": {"gloss": "${gloss}", "name": "${materialName}", "texture": "${texture}"},`
    s = s + `"panelMargin": ${margin * 2},`
    s = s + `"panels": [],`
    s = s + `"tableMarginLength": 120" ,"tableMarginWidth": 100,`
    const tables: string = `"tables": [{"active": true, "bottomRight": {"x": 2700, "y": -1240}, "id": 0, "length": 2700, "marginLength": ${120 - margin}, "marginWidth": ${100 - margin}, "multiply": 1, "topLeft": {"x": 0, "y": 0}, "width": 1240}]`
    s = s + tables + "}}"
    return s
}