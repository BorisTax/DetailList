import { Action, Messages } from ".";
import { LibraryActions } from "../actions/LibraryActions";
import { MessagesActions } from "../actions/MessagesActions";
import { StateActions } from "../actions/StateActions";
export const initLibrary={
        type:"",
        version:"",
        materials: [],
        rootGroups:[]
}
const initialState: Messages={
    type:"alert",
    show: false,
    title:"",
    ext: {},
    onOkAction:()=>({type:""})
}
const messagesReducer = (state : Messages = initialState, action : Action)=>{
    const payload:any = action.payload
    switch(action.type){
            case MessagesActions.CONFIRM_DELETING_UNITS_FROM_PLAN:
                return {type:'confirm',show: true, title:"Удалить выделенные строки?", onOkAction:()=>StateActions.deleteSelectedUnitsInPlan(payload)}
            case MessagesActions.CONFIRM_CLEARING_UNIT_LIST_IN_PLAN:
                return {type:'confirm',show: true, title:"Очистить список?", onOkAction:()=>StateActions.clearPlan()}
            case MessagesActions.HIDE_DIALOGS:
                return {...state, show: false}
            case MessagesActions.OPEN_PLAN_ERROR:
                return {...state, type:'alert',title:payload, show: true}
            case MessagesActions.SHOW_MATERIAL_EDIT_DIALOG:
                return {...state, type:'input',title:payload.newMaterial?'Добавить материал':'Редактировать материал',ext:{newMaterial: payload.newMaterial, materialIndex: payload.materialIndex}, inputform:payload.inputform, show: true, onOkAction:(values: any)=>payload.newMaterial ? LibraryActions.addMaterial(values):LibraryActions.editMaterial(values, payload.materialIndex)}
            default:
             return state;
    }
}

export default messagesReducer;