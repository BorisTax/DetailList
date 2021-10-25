import { Action, State } from ".";
import { StateActions } from "../actions/StateActions";
import { LibraryActions } from "../actions/LibraryActions";
import { UnitListWorker } from "../data/classes";
import { exportBasis } from "../data/exportBasis";
import { Giblab } from "../data/exportGiblab";
import { exportVacuum } from "../data/exportVacuum";
import { printToPDF } from "../data/printPdf";
import { defaultMaterial, TDetail, TLibrary, TMaterial, TUnit } from "../data/types";
export const initLibrary={
        type:"",
        version:"",
        materials: [],
        rootGroups:[]
}
const initialState: State={
    library: initLibrary,
    detailList: [],
    unitList: [],
    materials:[],
    information:{
        order:'',
        plan:'',
        date:''
    },
    activeRootGroup:"",
    activeRootGroupIndex:0,
    activeGroup:"",
    activeGroupIndex:0,
    activeUnit:"",
    activeUnitIndex:0,
    activeLibraryMaterials:[],
    activeDetailListMaterial: '',
    activeUnitCount: 1,
    groupDetailsByUnits:true,
    showEdgeColumn: false,
    materialData: {
        plateCount: {},
        totalEdgeLength: {}
    },
    printScale: 14
}
const stateReducer = (state : State = initialState, action : Action)=>{
    const payload:any = action.payload
    var activeRootGroupIndex:number
    var activeGroupIndex:number
    var activeUnitIndex:number
    var activeRootGroup:string
    var activeGroup:string
    var activeUnit:string
    var detailList: any = {}
    let plateCount = {}
    let totalEdgeLength = {}
    let activeDetailListMaterial = ''
    switch (action.type){
            case LibraryActions.ADD_MATERIAL:
                {
                const m: TMaterial = {name:payload[0], 
                                            length: payload[1], 
                                            width: payload[2],
                                            texture: payload[3],
                                            gloss: payload[4]
                                        }
                state.library.materials.push(m)
                }
                return {...state}
            case LibraryActions.EDIT_MATERIAL:
                const m: TMaterial = state.library.materials[payload.materialIndex]
                m.name = payload.values[0] 
                m.length = payload.values[1] 
                m.width = payload.values[2]
                m.texture = payload.values[3]
                m.gloss = payload.values[4]
                return {...state}
            case StateActions.ADD_ACTIVE_UNIT:
                const unit = state.library.rootGroups[state.activeRootGroupIndex].groups[state.activeGroupIndex].units[state.activeUnitIndex]
                const mat = Array(unit.materialsCount).fill(0).map((_, index:number) => state.library.materials[state.activeLibraryMaterials[index]])
                const newUnit: TUnit = {
                    name: unit.name,
                    shortName: unit.shortName,
                    groupName: state.activeGroup,
                    rootGroupName: state.activeRootGroup,
                    count: state.activeUnitCount,
                    details:[...unit.details],
                    materialsCount: unit.materialsCount,
                    materials: mat
                }
                const dList:TDetail[] = UnitListWorker.addUnit(state.unitList,newUnit);
                ({plateCount, totalEdgeLength} = UnitListWorker.calcDetailsExtra(dList, state.library.materials))
                activeDetailListMaterial = state.activeDetailListMaterial?state.activeDetailListMaterial:mat[0].name
                return {...state, detailList: dList, activeUnitCount: 1, activeDetailListMaterial, materialData: {plateCount, totalEdgeLength}}
        case StateActions.GROUP_DETAILS_BY_UNITS:
                detailList = UnitListWorker.makeDetailList(state.unitList, payload)
                return {...state, detailList, groupDetailsByUnits: payload}
        case StateActions.SET_ACTIVE_UNIT_COUNT:
                    return {...state, activeUnitCount: payload}
        case StateActions.SET_UNIT_COUNT_IN_PLAN:
            state.unitList[payload.index].count=payload.value
            detailList = UnitListWorker.makeDetailList(state.unitList);
            ({plateCount, totalEdgeLength} = UnitListWorker.calcDetailsExtra(detailList, state.library.materials))
            return {...state, detailList, materialData: {plateCount, totalEdgeLength}}
        case StateActions.SET_INFORMATION:
            return {...state, information: {...payload}}
        case StateActions.SET_LIBRARY:
            const activeFields={
                activeRootGroupIndex : 0, 
                activeRootGroup : payload.rootGroups[0].name,
                activeGroupIndex : 0,
                activeGroup : payload.rootGroups[0].groups[0].name,
                activeUnitIndex : 0,
                activeUnit : payload.rootGroups[0].groups[0].units[0].name,
                activeLibraryMaterials: Array(payload.rootGroups[0].groups[0].units[0].materialsCount).fill(0)
            }
            return {...state,library:action.payload, ...activeFields}
        case StateActions.SET_ACTIVE_ROOT_GROUP:
            activeRootGroupIndex = payload
            activeRootGroup = state.library.rootGroups[activeRootGroupIndex].name
            return {...state,activeRootGroupIndex,activeRootGroup}
        case StateActions.SET_ACTIVE_GROUP:
            activeGroupIndex = payload
            activeGroup = state.library.rootGroups[state.activeRootGroupIndex].groups[activeGroupIndex].name
            activeUnit = state.library.rootGroups[state.activeRootGroupIndex].groups[activeGroupIndex].units[0].name
            return {...state,activeGroup,activeGroupIndex,activeUnit,activeUnitIndex:0}
        case StateActions.SET_ACTIVE_UNIT:
            activeUnitIndex = payload
            activeUnit = state.library.rootGroups[state.activeRootGroupIndex].groups[state.activeGroupIndex].units[activeUnitIndex].name
            return {...state,activeUnit,activeUnitIndex}
        case StateActions.SET_ACTIVE_LIBRARY_MATERIAL:
            const materialIndex = state.library.materials.findIndex(m => m.name===payload.material)
            state.activeLibraryMaterials[payload.index] = materialIndex
            return {...state}
        case StateActions.SET_ACTIVE_DETAILLIST_MATERIAL:
            return {...state, activeDetailListMaterial: payload}
        case StateActions.SET_ACTIVE_DETAILLIST_MATERIAL_COUNT:
            state.materialData.plateCount[state.activeDetailListMaterial] = payload
            return {...state}
        case StateActions.SET_PLAN:
            const lists = {unitList : payload, detailList : UnitListWorker.makeDetailList(payload)};
            activeDetailListMaterial = Object.keys(lists.detailList)[0];
            ({plateCount, totalEdgeLength} = UnitListWorker.calcDetailsExtra(lists.detailList, state.library.materials))
            return {...state, ...lists, activeDetailListMaterial, materialData: {plateCount, totalEdgeLength} }
        case StateActions.DELETE_SELECTED_UNITS_IN_PLAN:
            const unitList = state.unitList.filter((_, index) => !payload[index])
            const detList = UnitListWorker.makeDetailList(unitList);
            ({plateCount, totalEdgeLength} = UnitListWorker.calcDetailsExtra(detList, state.library.materials))
            return {...state, unitList, detailList: detList, materialData: {plateCount, totalEdgeLength}, activeDetailListMaterial: ''}
        case StateActions.CLEAR_PLAN:
            return {...state, unitList: [], activeDetailListMaterial: '', detailList: [], materialData: {plateCount: {}, totalEdgeLength: {}}}
        case StateActions.SAVE_PLAN:
            saveUnitList(state)
            return state;
        case StateActions.SAVE_LIBRARY:
            saveLibrary(state.library)
            return state;
        case StateActions.EXPORT_GIBLAB:
            {
            const material: TMaterial|undefined = state.library.materials.find((m: TMaterial) => m.name === payload)||defaultMaterial
            const forGiblab = Giblab.export(state.unitList, material)
            exportGiblab(forGiblab);
            }
            return state;
        case StateActions.EXPORT_BASIS:
            {
            const material: TMaterial|undefined = state.library.materials.find((m: TMaterial) => m.name === payload)||defaultMaterial
            const forBasis = exportBasis(state.detailList[material.name], material)
            saveBasis(forBasis);
            }
            return state;
        case StateActions.EXPORT_VACUUM:
            var material: TMaterial|undefined = state.library.materials.find((m: TMaterial) => m.name === payload)||defaultMaterial
            const forVacuum = exportVacuum(state.detailList[material.name], material, state.information)
            saveVacuum(forVacuum);
            return state;
        case StateActions.EXPORT_EXCEL:
            //const table = createExportTable(state.detailList[payload.material], state.information, payload)
            //console.log(document.getElementById('exportTable'))
            //printToPDF(state)
            //tableToExcel()(table,'Лист1', `${payload.material}.xls`);
            return state;
         case StateActions.PRINT_PDF:
             //const table = createExportTable(state.detailList[payload.material], state.information, payload)
             //console.log(document.getElementById('exportTable'))
             printToPDF(state, payload)
             //tableToExcel()(table,'Лист1', `${payload.material}.xls`);
             return state;
         case StateActions.SET_PRINT_SCALE:
            return {...state, printScale: payload};
        case StateActions.MOVE_UP:
            if(payload>0){
                const r = state.unitList[payload - 1]
                state.unitList[payload - 1] = state.unitList[payload]
                state.unitList[payload] = r
            }
            return {...state};
        case StateActions.MOVE_DOWN:
            if(payload<state.unitList.length-1){
                const r = state.unitList[payload+1]
                state.unitList[payload + 1] = state.unitList[payload]
                state.unitList[payload] = r
            }
            return {...state};            
        case StateActions.SHOW_EDGE_COLUMN:
            return {...state, showEdgeColumn: payload};
        default:
            return state;
    }
}

export default stateReducer;



var textFile: any = null
// eslint-disable-next-line
var makeJSONFile = function (text: string) {
    var data = new Blob([text], {type: 'application/json'});
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }
    textFile = window.URL.createObjectURL(data);
    return textFile;
  };

  var makeTextFile = function (text: string) {
    var data = new Blob([text], {type: '"text/plain;charset=utf-8"'});
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }
    textFile = window.URL.createObjectURL(data);
    return textFile;
  };


  function saveUnitList(state: State){
    
    var contents=state.unitList.map((u: TUnit)=>`${u.groupName};${u.name};${u.count};${u.materialsCount};${u.materials.map(m=>m.name).join(';')};${u.rootGroupName}`).join('\r\n')
    var link = document.createElement('a');
    link.setAttribute('download', "project.pln");
    link.href = makeTextFile(contents);
    link.click()
}
function exportGiblab(contents:string){
    var link = document.createElement('a');
    link.setAttribute('download', "project.project");
    link.href = makeTextFile(contents);
    link.click()
}
function saveBasis(contents:string){
    var link = document.createElement('a');
    link.setAttribute('download', "project.obl");
    link.href = makeTextFile(contents);
    link.click()
}
function saveVacuum(contents:string){
    var link = document.createElement('a');
    link.setAttribute('download', "project.list");
    link.href = makeTextFile(contents);
    link.click()
}
function saveLibrary(library: TLibrary){
    const content = JSON.stringify(library)
    var link = document.createElement('a');
    link.setAttribute('download', "library.json");
    link.href = makeJSONFile(content);
    link.click()
}