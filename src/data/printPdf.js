import {jsPDF} from 'jspdf'
import {changeDpiDataUrl} from 'changedpi';

import TextShape from "./TextShape";
import TableCellShape from './TableCellShape';
import TableShape from './TableShape';


export function printToPDF(){
    const doc = new jsPDF('l', 'px', 'a4');
    doc.setFont('Arial');
    doc.setFontSize(20);
    var canv=document.createElement('canvas')
    const pixels=11.81/3
    const scale=1
    var canvWidth=297*pixels*scale
    var canvHeight=210*pixels*scale
    const ratio=canvWidth/canvHeight
    canv.setAttribute("width",canvWidth)
    canv.setAttribute("height",canvHeight)
    // canv.style.width=`${canvWidth}px`
    // canv.style.height=`${canvHeight}px`
    var ctx=canv.getContext('2d')

    var font;
    const list = [[{text:'917',underline:[1,2]},{text:'315',underline:[1]}]]
    const testTable = new TableShape(list)
    testTable.setPosition(100,100)
    ctx.clearRect(0,0,canvWidth,canvHeight);
    testTable.draw(ctx,20)

    var imgData = canv.toDataURL('image/png'); 
    doc.addImage(imgData, 'PNG', 10, 10);
    //ctx.scale(1/scale,1/scale)

        imgData = canv.toDataURL('image/png'); 
        let dataUrlWithDpi = changeDpiDataUrl(imgData, 300)
        doc.addPage()
        doc.addImage(dataUrlWithDpi, 'PNG', 10, 10);

   window.open(doc.output('bloburl'))
    //doc.save("d:/a4.pdf");
}





var textFile = null
var makeTextFile = function (text) {
    var data = new Blob([text], {type: 'application/json'});
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }
    textFile = window.URL.createObjectURL(data);
    return textFile;
  };

