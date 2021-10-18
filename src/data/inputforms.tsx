import { TMaterial } from "./types";

export const getMaterialInputForm = (material: TMaterial) => [{ type: TYPE_STRING, caption: "Материал", value: material.name},
    { type: TYPE_NUMBER, caption: "Длина", value: material.length},
    { type: TYPE_NUMBER, caption: "Ширина", value: material.width},
    { type: TYPE_CHECKBOX, caption: "Структурный", value: material.texture},
    { type: TYPE_CHECKBOX, caption: "Глянцевый", value: material.gloss}
]
export const TYPE_STRING = 'string'
export const TYPE_NUMBER = 'number'
export const TYPE_CHECKBOX = 'checkbox'
