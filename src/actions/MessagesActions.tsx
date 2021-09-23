export const MessagesActions={
    CONFIRM_DELETING_UNITS_FROM_PLAN:"CONFIRM_DELETING_UNITS_FROM_PLAN",
    CONFIRM_CLEARING_UNIT_LIST_IN_PLAN:'CONFIRM_CLEARING_UNIT_LIST_IN_PLAN',
    HIDE_DIALOGS:'HIDE_DIALOGS',

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
}


