import {jsPDF} from 'jspdf'

import TextShape from "./TextShape";
import TableCellShape from './TableCellShape';
import TableShape from './TableShape';
import { State } from '../reducers';


export function printToPDF(state: State, printState: any){
    const doc = new jsPDF(printState.orientation, 'px', 'a4');
    doc.setFont('Arial');
    doc.setFontSize(20);
    const scale = 2
    const pixelScale = 3
    const fontSize = printState.fontSize?printState.fontSize : 14
    var canv=document.createElement('canvas')
    const pixels=11.81 / pixelScale
    var canvWidth = 297*pixels*scale
    var canvHeight = 210*pixels*scale
    canv.setAttribute("width", `${canvWidth}`)
    canv.setAttribute("height", `${canvHeight}`)
    canv.style.width=`${canvWidth/scale}px`
    canv.style.height=`${canvHeight/scale}px`
    var ctx=canv.getContext('2d')
    ctx?.scale(scale,scale)
    var font;
    
    const headerList = [
                        [{text:'',frame:false},{text:'Накладная на передачу деталей в раскрой',frame:false,align:'left'}],
                        [{text:'Дата:',frame:false,align:'right'},{text:state.information.date,frame:false,align:'left'}],
                        [{text:'План:',frame:false,align:'right'},{text:state.information.plan,frame:false,align:'left'}],
                        [{text:'Заказ:',frame:false,align:'right'},{text:state.information.order,frame:false,align:'left'}],
                        [{text:'Материал:',frame:false,align:'right'},{text:'ДСП белый 110',frame:false,align:'left'}],
                        [{text:'Плит:',frame:false,align:'right'},{text:'38',frame:false,align:'left'}],
                        [{text:'Кромка:',frame:false,align:'right'},{text:'',frame:false,align:'left'}],
                      ]
    const detailList = [
      [{text:'№'},{text:'Деталь'},{text:'Длина'},{text:'Ширина'},{text:'Кол'},{text:'Паз'},{text:'Прим.'},{text:'Модуль'}],
      [{text:'1',align:"right"},{text:'СТОЙКА'},{text:'919',underlines:[1]},{text:'288',underlines:[2,1]},{text:'30'},{text:''},{text:''},{text:'20В-2, 29В-2, 36В-4, 37В-2, 38В-4',align:"left"}]
    ]
    const headTable = new TableShape(headerList)
    const detailTable = new TableShape(detailList)
    headTable.setPosition(10,10)
    detailTable.setPosition(10,200)
    ctx?.clearRect(0,0,canvWidth,canvHeight);
    headTable.draw(ctx,fontSize)
    detailTable.draw(ctx,fontSize)
    var imgData = canv.toDataURL('image/png'); 
    doc.addImage(imgData, 'PNG', 10, 10, canvWidth / pixelScale, canvHeight / pixelScale);
    //ctx.scale(1/scale,1/scale)

        //imgData = canv.toDataURL('image/png'); 
        //let dataUrlWithDpi = changeDpiDataUrl(imgData, 300)
        //doc.addPage()
        //doc.addImage(imgData, 'PNG', 10, 10);

   window.open(doc.output('bloburl'),'printFrame')
   //window.open(doc.output('bloburl'))
   //document.getElementById('printFrame').src=doc.output('bloburl')
    //doc.save("d:/a4.pdf");
}





var textFile: any = null
var makeTextFile = function (text: string) {
    var data = new Blob([text], {type: 'application/json'});
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }
    textFile = window.URL.createObjectURL(data);
    return textFile;
  };

