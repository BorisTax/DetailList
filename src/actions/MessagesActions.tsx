import { AppDispatch } from ".."
import { UnitListWorker } from "../data/classes"
import { TLibrary } from "../data/types"
import { StateActions } from "./StateActions"

export const MessagesActions={
    CONFIRM_DELETING_UNITS_FROM_PLAN:"CONFIRM_DELETING_UNITS_FROM_PLAN",
    CONFIRM_CLEARING_UNIT_LIST_IN_PLAN:'CONFIRM_CLEARING_UNIT_LIST_IN_PLAN',
    HIDE_DIALOGS:'HIDE_DIALOGS',
    OPEN_PLAN:'OPEN_PLAN',
    OPEN_PLAN_ERROR:'OPEN_PLAN_ERROR',

confirmDeletingUnitsFromPlan(selectedUnits: boolean[]){
    return {
        type:MessagesActions.CONFIRM_DELETING_UNITS_FROM_PLAN,
        payload: selectedUnits
    }
},
confirmClearingUnitListInPlan(){
    return {
        type:MessagesActions.CONFIRM_CLEARING_UNIT_LIST_IN_PLAN,
    }
},
hideDialogs(){
    return {
        type:MessagesActions.HIDE_DIALOGS,
    }
},
openPlan(library: TLibrary){
    return (dispatch: AppDispatch)=>{
        var input = document.createElement('input');
        input.type = 'file';
        input.accept=".pln";
        input.onchange = (e:any) => { 
            const file=e.target.files[0]; 
            var reader = new FileReader();
            reader.readAsText(file,'UTF-8');
            reader.onload = readerEvent => {
            try{
                var content: string|any = readerEvent?.target?.result;
               }catch(e){
                content=''
               }
               const result = UnitListWorker.parseUnitList(content, library)
               if(result.error){
                dispatch( {type:MessagesActions.OPEN_PLAN_ERROR, payload:result.errorMessage} );
               }else dispatch( {type:StateActions.SET_PLAN, payload:result.content} );
            }
        }
        input.click();
    }
},
}


