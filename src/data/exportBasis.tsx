import { TDetail, TMaterial } from "./types"

export const exportBasis = (list: TDetail[], mat : TMaterial) => {
//const newList: TDetail[] = []
let posString: string = ''
const pos: any = {}
const lineBr = '\r\n'
const tab = '\t'
let s:string = "List_of_panels_for_cutting" + lineBr
s = s + "Version 11.0" + lineBr + lineBr
s = s + "Текущий материал" + tab + mat.name + lineBr
s = s + "Текущий размер" + tab + mat.length + "x" + mat.width + lineBr
s = s + "Количество комплектов" + tab + "1" + lineBr
s = s + "11.5.0.29468 08.07.2020" + lineBr + lineBr
s = s + "Material " + tab + mat.name + tab + "Slab" + tab + tab + "0" + lineBr
for(const d of list){
const modules:string[] = []
d.modules?.forEach((value, key) => modules.push(`${key}-${value}`))
const moduleNamesString = modules.join(', ')
if (pos[moduleNamesString]) {
     pos[moduleNamesString] = pos[moduleNamesString] + 1
     posString = moduleNamesString + " (Поз." + pos[moduleNamesString] + ")"
    }
     else{
     pos[moduleNamesString] = 1
     posString = moduleNamesString + " (Поз.1)"
     }
s = s + posString + tab
s = s + d.length + tab
s = s + d.width + tab
s = s + d.count + tab
s = s + " " + tab
s = s + d.name + tab
s = s + "1" + tab
if (d.edgeLength1 > 0) 
          s = s + `${d.edgeLength1}` + tab + `${d.edgeLength1}` + tab + `${d.edgeLength1}` + tab;
          else
          s = s + " " + tab + " " + tab + " " + tab;
if (d.edgeLength2 > 0) 
          s = s + `${d.edgeLength2}` + tab + `${d.edgeLength2}` + tab + `${d.edgeLength2}` + tab;
          else
          s = s + " " + tab + " " + tab + " " + tab;
if (d.edgeWidth1 > 0) 
          s = s + `${d.edgeWidth1}` + tab + `${d.edgeWidth1}` + tab + `${d.edgeWidth1}` + tab;
          else
          s = s + " " + tab + " " + tab + " " + tab;
if (d.edgeWidth2 > 0) 
          s = s + `${d.edgeWidth2}` + tab + `${d.edgeWidth2}` + tab + `${d.edgeWidth2}` + tab;
          else
          s = s + " " + tab + " " + tab + " " + tab;

s = s + d.paz + tab + tab + tab + tab
s = s + "2" + tab
s = s + d.comment + tab
s = s + "0" + tab + tab
s = s + lineBr
}

return s
}