
export const LibraryActions={
    ADD_MATERIAL:"ADD_MATERIAL",
    EDIT_MATERIAL:"EDIT_MATERIAL",

addMaterial(values: any){
    return {
        type:LibraryActions.ADD_MATERIAL,
        payload: values
    }
},
editMaterial(values: any, materialIndex: number){
    return {
        type:LibraryActions.EDIT_MATERIAL,
        payload: {values, materialIndex}
    }
},
}
