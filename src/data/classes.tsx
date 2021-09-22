import { TDetail, TLibrary, TLibraryUnit, TLibraryRootGroup, TUnit, TLibraryGroup } from "./types";

export class DetailListWorker {
    public static getListByMaterial = (detailList :TDetail[], materialName:string):TDetail[] => {
        return detailList.filter((d:TDetail) => d.material === materialName)
    }
    
}

export class UnitListWorker {
    public static addUnit=(unitList: TUnit[], unit: TUnit):TDetail[] => {
        let inList:boolean = false
        for(const u of unitList){
            if(isEqualUnit(unit,u)) {
                u.count += unit.count
                inList = true
                break;
            }
        }
        if(!inList) unitList.push({...unit})
        return UnitListWorker.makeDetailList(unitList)
    }

    private static makeDetailList = (unitList: TUnit[]): TDetail[] => {
        const detailList: TDetail[] = []
        for(const unit of unitList){
            for(const detail of unit.details){
                //detail.count = detail.count
                detail.modules = new Map()
                detail.modules.set(unit.shortName,detail.count * unit.count)
                detail.material = unit.materials[detail.materialId]
                const det = detailList.find((d:TDetail) => isEqualDetail(detail,d))
                if(det){
                    det.count += detail.count * unit.count
                    for(const key of detail.modules)
                            //if(det.modules?.has(key[0])){
                                det.modules?.set(key[0], det.modules.get(key[0])||0 + (detail.modules.get(key[0])||0))
                            //}//else det.modules?.set(key[0], det.modules.get(key[0])||0 + ((detail.modules.get(key[0])||0) * unit.count)
                }else{
                    detailList.push({...detail, count: detail.count * unit.count})
                }
            }
        }
        return detailList
    }
}

export class LibraryWorker{
    public static getUnit = (library: TLibrary, rootGroupName:string, groupName:string, name:string): TLibraryUnit | undefined => {
        const rootGroup: TLibraryRootGroup|undefined = library.rootGroups.find((rg: TLibraryRootGroup) => rg.name === rootGroupName);            
        const group: TLibraryGroup|undefined = rootGroup?.groups.find((g: TLibraryGroup) => g.name === groupName);            
        const unit: TLibraryUnit|undefined = group?.units.find((u: TLibraryUnit) => u.name === name)
        return unit
        }
    
}

const isEqualDetail=(det1:TDetail,det2:TDetail):boolean => {
    return (det1.name===det2.name&&
            det1.length===det2.length&&
            det1.width&&det2.width&&
            det1.material === det2.material&&
            det1.edgeLength1===det2.edgeLength1&&
            det1.edgeLength2===det2.edgeLength2&&
            det1.edgeWidth1===det2.edgeWidth1&&
            det1.edgeWidth2===det2.edgeWidth2&&
            det1.paz===det2.paz&&
            det1.comment===det2.comment)?true:false
}
const isEqualUnit=(unit1:TUnit,unit2:TUnit):boolean => {
    return (unit1.rootGroupName===unit2.rootGroupName&&
        unit1.groupName===unit2.groupName&&
        unit1.name===unit2.name&&
        unit1.materials.every((m, index)=>m===unit2.materials[index]));
}

export class UnitMap{
    private units = new Map()
    public has = (key:string):boolean => this.units.has(key)
    public set = (key:string,value:number):void => {this.units.set(key,value)}
    public get = (key:string):number => this.units.get(key)
    public delete = (key:string):boolean => this.units.delete(key)
    public clear = ():void => {this.units.clear()}
}