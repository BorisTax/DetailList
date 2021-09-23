import { Action, Messages } from ".";
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
            default:
             return state;
    }
}

export default messagesReducer;