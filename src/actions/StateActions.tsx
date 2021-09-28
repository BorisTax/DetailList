import { AppDispatch } from "..";

export const StateActions={
    EXPORT_GIBLAB:'EXPORT_GIBLAB',
    EXPORT_EXCEL:'EXPORT_EXCEL',
    PRINT_PDF:'PRINT_PDF',
    SAVE_PROJECT:"SAVE_PROJECT",
    SAVE_PLAN:"SAVE_PLAN",
    SET_PLAN:"SET_PLAN",
    OPEN_PROJECT:"OPEN_PROJECT",
    OPEN_LIBRARY:"OPEN_LIBRARY",
    SAVE_LIBRARY:"SAVE_LIBRARY",
    OPEN_FAILURE:"OPEN_FAILURE",
    SET_PROJECT:"SET_PROJECT",
    SET_LIBRARY:"SET_LIBRARY",
    SET_INFORMATION:'SET_INFORMATION',
    SET_MATERIAL:'SET_MATERIAL',
    SET_ACTIVE_UNIT_COUNT:'SET_ACTIVE_UNIT_COUNT',  
    SET_UNIT_COUNT_IN_PLAN:'SET_UNIT_COUNT_IN_PLAN',    
    SET_ACTIVE_ROOT_GROUP:'SET_ACTIVE_ROOT_GROUP',
    SET_ACTIVE_GROUP:'SET_ACTIVE_GROUP',
    SET_ACTIVE_UNIT:'SET_ACTIVE_UNIT',
    SET_ACTIVE_LIBRARY_MATERIAL:'SET_ACTIVE_LIBRARY_MATERIAL',
    SET_ACTIVE_DETAILLIST_MATERIAL:'SET_ACTIVE_DETAILLIST_MATERIAL',
    SET_DETAIL_PROPERTY:'SET_DETAIL_PROPERTY',
    LOAD_DETAIL_LIST:'LOAD_DETAIL_LIST',
    SET_DETAIL_LIST:'SET_DETAIL_LIST',
    SET_DRAW_MODULE:'SET_DRAW_MODULE',
    ADD_DETAIL:'ADD_DETAIL',
    ADD_ACTIVE_UNIT:'ADD_ACTIVE_UNIT',
    SET_ACTIVE_TABLE:"SET_ACTIVE_TABLE",
    GROUP_DETAILS_BY_UNITS:"GROUP_DETAILS_BY_UNITS",
    DELETE_SELECTED_UNITS_IN_PLAN:"DELETE_SELECTED_UNITS_IN_PLAN",
    CLEAR_PLAN:'CLEAR_PLAN',
    DELETE_TABLE_CONFIRM:"DELETE_TABLE_CONFIRM",
    ADD_TABLE:"ADD_TABLE",
    UPDATE_STATE:"UPDATE_STATE",
    MOVE_UP:'MOVE_UP',
    MOVE_DOWN:'MOVE_DOWN',
    SHOW_EDGE_COLUMN:"SHOW_EDGE_COLUMN",
    SET_PRINT_SCALE:"SET_PRINT_SCALE",
exportGiblab(material: string){
        return {
            type:StateActions.EXPORT_GIBLAB,
            payload: material
        }
    },
exportExcel(){
        return {
            type:StateActions.EXPORT_EXCEL,
        }
    },
printPdf(printState: any){
        return {
            type:StateActions.PRINT_PDF,
            payload: printState
        }
    },
setPrintScale(scale: number){
        return {
            type:StateActions.SET_PRINT_SCALE,
            payload: scale
        }
    },
updateState(){
    return {
        type:StateActions.UPDATE_STATE
    }
},
moveUp(index:number){
    return {
        type:StateActions.MOVE_UP,
        payload: index
    }
},
moveDown(index:number){
    return {
        type:StateActions.MOVE_DOWN,
        payload: index
    }
},
groupDetailsByUnits(value: boolean){
    return {
        type:StateActions.GROUP_DETAILS_BY_UNITS,
        payload: value
    }
},
saveProject(){
    return {
        type:StateActions.SAVE_PROJECT
    }
},
savePlan(){
    return {
        type:StateActions.SAVE_PLAN
    }
},
saveLibrary(){
    return {
        type:StateActions.SAVE_LIBRARY
    }
},
openProject(){

    return (dispatch: AppDispatch)=>{
        var input = document.createElement('input');
        input.type = 'file';
        input.accept=".json";
        input.onchange = (e:any) => { 
            const file=e.target.files[0]; 
            var reader = new FileReader();
            reader.readAsText(file,'UTF-8');
         
            // here we tell the reader what to do when it's done reading...
            reader.onload = readerEvent => {
            try{
                var content = JSON.parse(`${readerEvent?.target?.result}`);
               }catch(e){
                content={}
               }
               dispatch( {type:StateActions.SET_PROJECT,payload:content} );
            }
        }
        input.click();
    }
},
openLibrary(){
    return (dispatch: AppDispatch)=>{
        var input = document.createElement('input');
        input.type = 'file';
        input.accept=".json";
        input.onchange = (e:any) => { 
            const file=e.target.files[0]; 
            var reader = new FileReader();
            reader.readAsText(file,'UTF-8');
         
            // here we tell the reader what to do when it's done reading...
            reader.onload = readerEvent => {
            try{
                var content = JSON.parse(`${readerEvent?.target?.result}`);
               }catch(e){
                content=null
               }
               if(content && content.type==='library') dispatch( {type:StateActions.SET_LIBRARY,payload:content} );
            }
        }
        input.click();
    }
},
setInformation:(info:any)=>{
        return {
            type:StateActions.SET_INFORMATION,
            payload:info,
        }
    },
setMaterial:(mat:any)=>{
        return {
            type:StateActions.SET_MATERIAL,
            payload:mat,
        }
    },
setActiveLibraryMaterial:(index:number, material:string)=>{
        return {
            type:StateActions.SET_ACTIVE_LIBRARY_MATERIAL,
            payload:{index, material},
        }
    },
setActiveDetailListMaterial:(material:string)=>{
        return {
            type: StateActions.SET_ACTIVE_DETAILLIST_MATERIAL,
            payload: material,
        }
    },
setActiveRootGroup:(value:number)=>{
        return {
            type:StateActions.SET_ACTIVE_ROOT_GROUP,
            payload:value,
        }
    },
setActiveGroup:(value:number)=>{
        return {
            type:StateActions.SET_ACTIVE_GROUP,
            payload:value,
        }
    },
setActiveUnit:(value:number)=>{
    return {
            type:StateActions.SET_ACTIVE_UNIT,
            payload:value,
        }
    },
setActiveUnitCount:(value:number)=>{
        return {
                type:StateActions.SET_ACTIVE_UNIT_COUNT,
                payload:value,
            }
        },
 setUnitCountInPlan:(index:number,value:number)=>{
     return {
             type:StateActions.SET_UNIT_COUNT_IN_PLAN,
             payload:{index,value},
         }
     },
addActiveUnit:()=>{
        return {
                type:StateActions.ADD_ACTIVE_UNIT,
            }
        },
deleteTableConfirm:()=>{
    return {

          type:StateActions.DELETE_TABLE_CONFIRM,
        }
   },
deleteSelectedUnitsInPlan:(selectedUnits: boolean[])=>{
    return {
          type:StateActions.DELETE_SELECTED_UNITS_IN_PLAN,
          payload: selectedUnits
        }
   },
clearPlan:()=>{
    return {
          type:StateActions.CLEAR_PLAN,
        }
   },
showEdgeColumn:(value: boolean)=>{
    return {
          type:StateActions.SHOW_EDGE_COLUMN,
          payload: value
        }
   },
loadDetailList:()=>{
    return (dispatch: AppDispatch)=>{
        var input = document.createElement('input');
        input.type = 'file';
        input.accept=".list";
        input.onchange = (e:any) => { 
            const file=e.target.files[0]; 
            var reader = new FileReader();
            reader.readAsText(file,'UTF-8');
            reader.onload = readerEvent => {
               //var content = readerEvent?.target?.result; 
               dispatch( {type:StateActions.SET_DETAIL_LIST,payload: {}} );
            }
        }
        input.click();
    }
}
}


