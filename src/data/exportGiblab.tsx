import { XMLTag } from "./classes";
import { TDetail, TMaterial, TUnit } from "./types";

export class Giblab{
    public static export(unitList: TUnit[], material: TMaterial){
        let project : XMLTag
        let part : XMLTag
        let operation : XMLTag
        let partId : number[] = []
        let partEdgeId : any = {}
        let edgeOperations : any = {}
        let toolCuttingId : number
        let toolEdgeLineId : number
        let sheetId : number
        let bandId : any = {}
        let goodTagId : number
        let partTagId : number
        const edgeSet = new Set()
        for(const u of unitList)
         for(const d of u.details){
             if(d.material===material.name){
                if(d.edgeLength1>0) edgeSet.add(d.edgeLength1)
                if(d.edgeLength2>0) edgeSet.add(d.edgeLength2)
                if(d.edgeWidth1>0) edgeSet.add(d.edgeWidth1)
                if(d.edgeWidth2>0) edgeSet.add(d.edgeWidth2)
            }
         }
        let op = 0
        for(const edge of edgeSet.keys()) {
            op++
            partEdgeId[`${edge}`] = []
            edgeOperations[`${edge}`] = `@operation#${op}`
        }
        project = new XMLTag()
        project.setName("project")
        goodTagId = 0
        partTagId = 1
        unitList.forEach((u:TUnit)=>{
            const good = new XMLTag()
            good.setName("good")
            good.addAttribute("typeId", "product")
            good.addAttribute("id", `${goodTagId}`)
            good.addAttribute("count", `${u.count}`)
            good.addAttribute("name", `${u.name}`)
            u.details.forEach((d: TDetail)=>{
                partTagId = partTagId + 1
                const {part, partEdgeSet} = Giblab.getPartXML(d, partTagId, material.texture, edgeOperations)
                for(const edge of partEdgeSet.keys()) partEdgeId[`${edge}`].push(partTagId)
                good.addChild(part)
                partId.push(partTagId)
            })
            project.addChild(good)
            goodTagId++
        })
        toolCuttingId = goodTagId
        project.addChild(Giblab.getToolCuttingTag(goodTagId))
        goodTagId++
        toolEdgeLineId = goodTagId
        project.addChild(Giblab.getToolEdgelineTag(goodTagId))
        goodTagId++
        sheetId = goodTagId
        project.addChild(Giblab.getSheetTag(goodTagId, material))
        goodTagId++
        for(const edge of edgeSet.keys()){
            project.addChild(Giblab.getBandTag(goodTagId, edge as number))
            bandId[`${edge}`] = goodTagId
            goodTagId++
        }
        operation = Giblab.getOperationCS(0, toolCuttingId, material)
        part = new XMLTag()
        part.setName("material")
        part.addAttribute("id", `${sheetId}`)
        operation.addChild(part)
        for(const p of partId){
            const part = new XMLTag()
            part.setName("part")
            part.addAttribute("id", `${p}`)
            operation.addChild(part)
        }
        project.addChild(operation)
        op=0
        for(const edge of edgeSet){
            op++
            operation = Giblab.getOperationEL(op, toolEdgeLineId, edge as number)
            const part = new XMLTag()
            part.setName("material")
            part.addAttribute("id", `${bandId[`${edge}`]}`)
            operation.addChild(part)
            for(const p of partEdgeId[`${edge}`]){
                const part = new XMLTag()
                part.setName("part")
                part.addAttribute("id", `${p}`)
                operation.addChild(part)
            }
        project.addChild(operation)
        }

        let s = `<?xml version="1.0" encoding="UTF-8"?>`
        return s + project.toString()
    }

    private static getPartXML(d: TDetail, id: number, txt:boolean, edgeOperations: any) {
        const part = new XMLTag()
        part.setName("part")
        part.addAttribute("id", `${id}`)
        part.addAttribute("name", `${d.name}`)
        part.addAttribute("l", `${d.length}`)
        part.addAttribute("w", `${d.width}`)
        part.addAttribute("count", `${d.count}`)
        part.addAttribute("txt", `${txt}`)
        if(d.edgeLength1 > 0) {
            part.addAttribute("elt", edgeOperations[`${d.edgeLength1}`])
            part.addAttribute("eltMat", `Кромка ${d.edgeLength1}мм`)
        }
        if(d.edgeLength2 > 0) {
            part.addAttribute("elb", edgeOperations[`${d.edgeLength2}`])
            part.addAttribute("elbMat", `Кромка ${d.edgeLength2}мм`)
        }
        if(d.edgeWidth1 > 0) {
            part.addAttribute("ell", edgeOperations[`${d.edgeWidth1}`])
            part.addAttribute("ellMat", `Кромка ${d.edgeWidth1}мм`)
        }
        if(d.edgeWidth2 > 0) {
            part.addAttribute("elr", edgeOperations[`${d.edgeWidth2}`])
            part.addAttribute("elrMat", `Кромка ${d.edgeWidth2}мм`)
        }
        const partEdgeSet = new Set()
        partEdgeSet.add(d.edgeLength1)
        partEdgeSet.add(d.edgeLength2)
        partEdgeSet.add(d.edgeWidth1)
        partEdgeSet.add(d.edgeWidth2)
        partEdgeSet.delete(0)
        return {part, partEdgeSet}
    }

    private static getToolCuttingTag(id: number){
        const toolCuttingTag = new XMLTag()
        toolCuttingTag.setName("good")
        toolCuttingTag.addAttribute("typeId", "tool.cutting")
        toolCuttingTag.addAttribute("swSawthick", "4.4")
        toolCuttingTag.addAttribute("swPackageHeight", "80")
        toolCuttingTag.addAttribute("swMaxturns", "5")
        toolCuttingTag.addAttribute("swComplexBand", "false")
        toolCuttingTag.addAttribute("swTrimIncludeSaw", "false")
        toolCuttingTag.addAttribute("swSort", "1")
        toolCuttingTag.addAttribute("swSortInBand", "1")
        toolCuttingTag.addAttribute("swMinSizeBand", "0")
        toolCuttingTag.addAttribute("swMaxSizeBand", "0")
        toolCuttingTag.addAttribute("swMinPruning", "15")
        toolCuttingTag.addAttribute("swMaxLengthBand", "0")
        toolCuttingTag.addAttribute("elWidthPreJoint", "0")
        toolCuttingTag.addAttribute("id", `${id}`)
        return toolCuttingTag
    }

    private static getToolEdgelineTag(id: number) {
        const toolEdgelineTag = new XMLTag()
        toolEdgelineTag.setName("good")
        toolEdgelineTag.addAttribute("typeId", "tool.edgeline")
        toolEdgelineTag.addAttribute("id", `${id}`)
        toolEdgelineTag.addAttribute("elRestSide", "0")
        toolEdgelineTag.addAttribute("elMinSize", "0")
        return toolEdgelineTag
    }

    private static getSheetTag(id: number, mat: TMaterial){
        const sheetTag = new XMLTag()
        sheetTag.setName("good")
        sheetTag.addAttribute("typeId", "sheet")
        sheetTag.addAttribute("id", `${id}`)
        sheetTag.addAttribute("t", "16")
        sheetTag.addAttribute("name", mat.name)
        sheetTag.addAttribute("l", `${mat.length}`)
        sheetTag.addAttribute("w", `${mat.width}`)
        const part = new XMLTag()
        part.setName("part")
        part.addAttribute("id", "1")
        part.addAttribute("count", "10000")
        part.addAttribute("l", `${mat.length}`)
        part.addAttribute("w", `${mat.width}`)
        sheetTag.addChild(part)
        return sheetTag
        }
    
    private static getBandTag(id:number, edge: number){
        const bandTag = new XMLTag()
        bandTag.setName("good")
        bandTag.addAttribute("typeId", "band")
        bandTag.addAttribute("id", `${id}`)
        bandTag.addAttribute("t", `${edge}`)
        bandTag.addAttribute("w", "21")
        bandTag.addAttribute("name", `Кромка ${edge}мм`)
        return bandTag
        }

    private static getOperationCS(id: number, toolCutId: number, mat:TMaterial){
        const oper = new XMLTag()
        oper.setName( "operation")
        oper.addAttribute( "typeId", "CS")
        oper.addAttribute( "id", `${id}`)
        oper.addAttribute( "tool1", `${toolCutId}`)
        oper.addAttribute( "cTrimL", "20")
        oper.addAttribute( "cTrimW", "20")
        oper.addAttribute( "printable", "true")
        oper.addAttribute( "startNewPage", "true")
        oper.addAttribute( "cCostByItem", "false")
        oper.addAttribute( "cCostByItemRound", "11")
        oper.addAttribute( "w", `${mat.width}`)
        oper.addAttribute( "l", `${mat.length}`)
        oper.addAttribute( "cCombiningParts", "true")
        oper.addAttribute( "csTexture", `${mat.texture}`)
        return oper
    }

    private static getOperationEL(id: number, toolEdgeId: number, edge: number){
        const oper = new XMLTag()
        oper.setName("operation")
        oper.addAttribute("typeId", "EL")
        oper.addAttribute("elWastePRC", "0.15")
        oper.addAttribute("w", "21")
        oper.addAttribute("t", `${edge}`)
        oper.addAttribute("elRoundLength", "1")
        oper.addAttribute("printable", "true")
        oper.addAttribute("startNewPage", "true")
        oper.addAttribute("id", `${id}`)
        oper.addAttribute("tool1", `${toolEdgeId}`)
        return oper
        }
}