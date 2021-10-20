import { TMaterial } from "./types";

export const getMaterialInputForm = (materialList: string[], material: TMaterial, newMaterial:boolean) => [
    { type: TYPE_STRING, caption: "Материал", value: newMaterial?'':material.name, ext:{exceptList:materialList,placeholder:'Введите название материала',errorMessage:'Материал уже существует!'}},
    { type: TYPE_NUMBER, caption: "Длина", value: material.length},
    { type: TYPE_NUMBER, caption: "Ширина", value: material.width},
    { type: TYPE_CHECKBOX, caption: "Структурный", value: material.texture},
    { type: TYPE_CHECKBOX, caption: "Глянцевый (для пленки)", value: material.gloss}
]
export const TYPE_STRING = 'string'
export const TYPE_NUMBER = 'number'
export const TYPE_CHECKBOX = 'checkbox'
