import { TDetail, TMaterial } from "./types"

export const exportVacuum = (list: TDetail[], mat: TMaterial, info: {order:string, plan: string, date: string}) =>{
let s: string = ''
let posString: string = ''
const lineBr = '\r\n'
s = s + "Order=" + info.order + lineBr
s = s + "Plan=" + info.plan + lineBr
s = s + "Material=" + mat.name + lineBr
for(const d of list){
posString = d.modules?.keys().next().value
s = s + posString + ";"
s = s + d.name + ";"
s = s + d.length + ";"
s = s + d.width + ";"
s = s + d.count
s = s + lineBr
}
return s
}