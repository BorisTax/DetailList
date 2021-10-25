import {jsPDF} from 'jspdf'

import TableShape from './TableShape';
import { State } from '../reducers';
import { TDetail } from './types';
import { DetailListWorker } from './classes';


export function printToPDF(state: State, printState: any){
    //const material = state.activeDetailListMaterial
    const curMaterials: string[] = Object.keys(state.detailList)
    const material: string = state.activeDetailListMaterial||curMaterials[0]
    const orientation = printState.orientation?'p':'l'
    const doc = new jsPDF(orientation, 'px', 'a4');
    //doc.setFont('Arial');
    //doc.setFontSize(20);
    const scale = 3
    const pixelScale = 4
    const fontSize = printState.fontSize?printState.fontSize : 14
    var canv = document.createElement('canvas')
    //document.getElementById('canv')?.appendChild(canv)
    const pixels = 11.81 / pixelScale
    const pageHeight = orientation === 'p'?297:210
    const pageWidth = orientation === 'p'?210:297
    var canvWidth = pageWidth*pixels*scale
    var canvHeight = pageHeight*pixels*scale
    canv.setAttribute("width", `${canvWidth}`)
    canv.setAttribute("height", `${canvHeight}`)
    canv.style.width = `${canvWidth/scale}px`
    canv.style.height = `${canvHeight/scale}px`
    const maxCanvHeight =  canvHeight / scale - (canvHeight / scale ) % 50 
    //const maxCanvWidth =  canvWidth / scale - (canvWidth / scale ) % 50 
    var ctx=canv.getContext('2d')
    ctx?.scale(scale,scale)
    const headerList = [
                        [{text:[''],frame:false},{text:['Накладная на передачу деталей в раскрой'],frame:false,align:'left'}],
                        [{text:['Дата:'],frame:false,align:'right'},{text:[state.information.date],frame:false,align:'left'}],
                        [{text:['План:'],frame:false,align:'right'},{text:[state.information.plan],frame:false,align:'left'}],
                        [{text:['Заказ:'],frame:false,align:'right'},{text:[state.information.order],frame:false,align:'left'}],
                        [{text:['Материал:'],frame:false,align:'right'},{text:[material],frame:false,align:'left'}],
                        [{text:['Плит:'],frame:false,align:'right'},{text:[state.materialData.plateCount[material]],frame:false,align:'left'}],
                      ]
    const edgeWidth: any = {}
    Object.keys(state.materialData.totalEdgeLength[material]).sort().map((key, index)=> edgeWidth[key]=index+1)
    
    for(const edge in state.materialData.totalEdgeLength[material]){
      headerList.push([{text:[`Кромка ${edge}мм:`],frame:false,align:'right'},{text:[`${state.materialData.totalEdgeLength[material][+edge]}м`],frame:false,align:'left'}])
    }
    const detCount = state.detailList[material]?.reduce((a:number,d:TDetail)=>a+d.count,0)||0
    headerList.push([{text:[`Деталей:`],frame:false,align:'right'},{text:[`${detCount}`],frame:false,align:'left'}])
    const detailList: any[] = []
    const heads = DetailListWorker.getHeaders(state.showEdgeColumn).map(h=>({text:[h]}))
    detailList.push(heads)
    state.detailList[material]?.forEach((d: TDetail, index: number)=>{
      const row: any[] = []
      const lengthUnderlines: number[] = []
      const widthUnderlines: number[] = []
      if(d.edgeLength1) lengthUnderlines.push(edgeWidth[d.edgeLength1])
      if(d.edgeLength2) lengthUnderlines.push(edgeWidth[d.edgeLength2])
      if(d.edgeWidth1) widthUnderlines.push(edgeWidth[d.edgeWidth1])
      if(d.edgeWidth2) widthUnderlines.push(edgeWidth[d.edgeWidth2])
      row.push({text:[`${index + 1}`]})
      row.push({text:[d.name],align:"left"})
      row.push({text:[`${d.length}`],underlines:lengthUnderlines})
      row.push({text:[`${d.width}`],underlines:widthUnderlines})
      row.push({text:[`${d.count}`]})
      if(state.showEdgeColumn) row.push({text:[d.edgeColumn]})
      row.push({text:[d.paz]})
      row.push({text:[d.comment]})
      let modules: string[] = []
      if ((d.modules?.size||0) > 1) d.modules?.forEach((value, key) => modules.push(`${key}-${value}`)); else modules[0] = d.modules?.keys().next().value;
      row.push({text:[modules.join(', ')],align:"left"})
      detailList.push(row)
    })
    // const detailList = [
    //   [{text:['№']},{text:['Деталь']},{text:['Длина']},{text:['Ширина']},{text:['Кол']},{text:['Паз']},{text:['Прим.']},{text:['Модуль']}],
    //   [{text:['1'],align:"right"},{text:['СТОЙКА']},{text:['919'],underlines:[1]},{text:['288'],underlines:[2,1]},{text:['30']},{text:['']},{text:['']},{text:['20В-2, 29В-2, 36В-4', '37В-2, 38В-4'],align:"left"}]
    // ]
    const headTable = new TableShape(headerList)
    const detailTable = new TableShape(detailList)
    const topMargin = 30
    const leftMargin = 20
    headTable.setPosition(leftMargin, topMargin)
    const { totalHeight } = headTable.getTableDimensions(ctx, fontSize)
    detailTable.setPosition(leftMargin, totalHeight + topMargin + 10)
    //if(ctx)ctx.fillStyle = "white"
    ctx?.clearRect(0,0,canvWidth,canvHeight);
    headTable.draw(ctx,fontSize)
    detailTable.draw(ctx,fontSize, {pageHeight:maxCanvHeight, topMargin, onEndPage:(newPage:boolean = true)=>{
      var imgData = canv.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 0, 0, canvWidth / pixelScale-30, canvHeight / pixelScale-30);
      if(newPage)doc.addPage()
    }})

   window.open(doc.output('bloburl'),'printFrame')
   //window.open(doc.output('bloburl'))
   //document.getElementById('printFrame').src=doc.output('bloburl')
    //doc.save("d:/a4.pdf");
}




  