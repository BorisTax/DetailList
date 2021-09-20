import { Dispatch } from "react";
import { AppDispatch } from "..";
import { TLibrary } from "../data/types";

export const StateActions={
    SAVE_PROJECT:"SAVE_PROJECT",
    OPEN_PROJECT:"OPEN_PROJECT",
    OPEN_LIBRARY:"OPEN_LIBRARY",
    OPEN_FAILURE:"OPEN_FAILURE",
    SET_PROJECT:"SET_PROJECT",
    SET_LIBRARY:"SET_LIBRARY",
    SET_INFORMATION:'SET_INFORMATION',
    SET_MATERIAL:'SET_MATERIAL',
    SET_ACTIVE_ROOT_GROUP:'SET_ACTIVE_ROOT_GROUP',
    SET_ACTIVE_GROUP:'SET_ACTIVE_GROUP',
    SET_ACTIVE_UNIT:'SET_ACTIVE_UNIT',
    SET_DETAIL_PROPERTY:'SET_DETAIL_PROPERTY',
    LOAD_DETAIL_LIST:'LOAD_DETAIL_LIST',
    SET_DETAIL_LIST:'SET_DETAIL_LIST',
    SET_DRAW_MODULE:'SET_DRAW_MODULE',
    ADD_DETAIL:'ADD_DETAIL',
    SET_ACTIVE_TABLE:"SET_ACTIVE_TABLE",
    SET_COMPLECT_COUNT:"SET_COMPLECT_COUNT",
    DELETE_ACTIVE_TABLE:"DELETE_ACTIVE_TABLE",
    DELETE_TABLE_CONFIRM:"DELETE_TABLE_CONFIRM",
    ADD_TABLE:"ADD_TABLE",
    UPDATE_STATE:"UPDATE_STATE",
updateState(){
    return {
        type:StateActions.UPDATE_STATE
    }
},
saveProject(){
    return {
        type:StateActions.SAVE_PROJECT
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
    var content: TLibrary 
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
setActiveRootGroup:(value:string)=>{
        return {
            type:StateActions.SET_ACTIVE_ROOT_GROUP,
            payload:value,
        }
    },
setActiveGroup:(value:string)=>{
        return {
            type:StateActions.SET_ACTIVE_GROUP,
            payload:value,
        }
    },
setActiveUnit:(value:string)=>{
    return {
            type:StateActions.SET_ACTIVE_UNIT,
            payload:value,
        }
    },
deleteTableConfirm:()=>{
    return {

          type:StateActions.DELETE_TABLE_CONFIRM,
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
         
            // here we tell the reader what to do when it's done reading...
            reader.onload = readerEvent => {
               var content = readerEvent?.target?.result; // this is the content!
               dispatch( {type:StateActions.SET_DETAIL_LIST,payload: {}} );
            }
        }
        input.click();
    }
}
}

