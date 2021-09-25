import { AppDispatch } from ".."
import { UnitListWorker } from "../data/classes"
import { TLibrary, TUnit } from "../data/types"
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
        input.multiple = true
        input.onchange = async (e:any) => { 
            //const file=e.target.files[0];
            let unitList: TUnit[]=[]
            let result:any={}
            for(const file of e.target.files){ 
                let content
                try{
                content = await openFile(file) as string
                }catch(e){
                    dispatch( {type:MessagesActions.OPEN_PLAN_ERROR, payload:`Ошибка при чтении файла ${file}`} );
                    return
                }
                result = UnitListWorker.parseUnitList(content, library)
                if(result.error){
                    dispatch( {type:MessagesActions.OPEN_PLAN_ERROR, payload:`${result.errorMessage} в файле ${file}`} );
                    return
                }
                else unitList=UnitListWorker.composeUnitList(unitList,result.content)
                }
            dispatch( {type:StateActions.SET_PLAN, payload:unitList} );
            }   
        input.click();
        }
        
    }
}

const openFile = (file: Blob) => {
    return new Promise((resolve,reject)=>{
        var reader = new FileReader();
        reader.readAsText(file,'UTF-8');
        reader.onload = readerEvent => {
            try{
                var content: string|any = readerEvent?.target?.result;
            }catch(e){
                return reject(file)
            }
            resolve(content)
    }
}
)
}
