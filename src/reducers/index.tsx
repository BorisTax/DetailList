import { combineReducers } from "redux";
import { TLibrary, TMaterial, TUnit } from "../data/types";
import messagesReducer from "./messages";
import stateReducer from "./state";
const rootReducer = combineReducers({
         state: stateReducer,
         messages: messagesReducer
    })

 export type RootState = {
         state: State,
         messages: Messages
 }


export type State = {
    library: TLibrary,
    detailList: any
    unitList: TUnit[]
    materials: TMaterial[]
    information: {
        order: string
        plan: string
        date: string
    }
    activeRootGroup:string
    activeRootGroupIndex:number
    activeGroup:string
    activeGroupIndex:number
    activeUnit:string
    activeUnitIndex:number
    activeLibraryMaterials:number[]
    activeDetailListMaterial:string
    activeUnitCount:number
    groupDetailsByUnits:boolean
    showEdgeColumn: boolean
    materialData: {
        plateCount: any
        totalEdgeLength: any
    }
    printScale: number
}

export type Messages = {
        type:'alert'|'confirm'|'input'
        show:boolean
        title:string
        inputform?:[]
        ext?:any
        onOkAction:(props?: any)=>Action
}

export type Action = {
    type:string
    payload?:any
}

export default rootReducer