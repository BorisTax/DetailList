import { TDetail } from "./types";

export const tableToExcel = function() {
    var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
    , base64 = function(s: any) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function(s: any, c:any) { 	    	 
        return s.replace(/{(\w+)}/g, function(m:any, p:any) { return c[p]; }) 
    }
    , downloadURI = function(uri:any, name:any) {
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        link.click();
    }

    return function(table:any, name:any, fileName:any) {
        if (!table.nodeType) table = document.getElementById(table)
            var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
        var resuri = uri + base64(format(template, ctx))
        downloadURI(resuri, fileName);
    }
};  

export function createExportTable(detailList: TDetail[], info: any, data: any):any{
    const style = {fontSize:"11px"}
    const border = "1px solid"
    const styleBold={...style, fontWeigth:"bold"}
    const styleBoldRight={...styleBold, textAlign:"right"}
    const table = document.createElement('table')
    table.setAttribute("border","0")
    //table.style.fontSize = '11px'
    const tableBody = document.createElement('tbody')
    let row = document.createElement('tr')
    let cells = [document.createElement('td'),document.createElement('td')]
    
    cells[1].appendChild(document.createTextNode('Накладная на передачу деталей в раскрой'));
    cells[1].style.fontWeight = "bold"
    cells[1].setAttribute("colspan","9")
    cells.forEach(c=>row.appendChild(c))
    tableBody.appendChild(row)

    row = document.createElement('tr')
    cells = [document.createElement('td'),document.createElement('td')]
    cells[0].appendChild(document.createTextNode('Дата:'));
    cells[0].style.fontWeight = "bold"
    cells[0].style.textAlign = "right"
    cells[1].appendChild(document.createTextNode(`${info.date}`));
    cells[1].style.textAlign = "left"
    cells[1].setAttribute("colspan","2")
    cells.forEach(c=>row.appendChild(c))
    tableBody.appendChild(row)

    row = document.createElement('tr')
    cells = [document.createElement('td'),document.createElement('td')]
    cells[0].appendChild(document.createTextNode('План:'));
    cells[0].style.fontWeight = "bold"
    cells[0].style.textAlign = "right"
    cells[1].appendChild(document.createTextNode(`${info.plan}`));
    cells[1].style.textAlign = "left"
    cells[1].setAttribute("colspan","2")
    cells.forEach(c=>row.appendChild(c))
    tableBody.appendChild(row)

    row = document.createElement('tr')
    cells = [document.createElement('td'),document.createElement('td')]
    cells[0].appendChild(document.createTextNode('Заказ:'));
    cells[0].style.fontWeight = "bold"
    cells[0].style.textAlign = "right"
    cells[1].appendChild(document.createTextNode(`${info.order}`));
    cells[1].setAttribute("colspan","9")
    cells.forEach(c=>row.appendChild(c))
    tableBody.appendChild(row)

    row = document.createElement('tr')
    cells = [document.createElement('td'),document.createElement('td')]
    cells[0].appendChild(document.createTextNode('Материал:'));
    cells[0].style.fontWeight = "bold"
    cells[0].style.textAlign = "right"
    cells[1].appendChild(document.createTextNode(`${data.material}`));
    cells[1].setAttribute("colspan","9")
    cells.forEach(c=>row.appendChild(c))
    tableBody.appendChild(row)

    row = document.createElement('tr')
    cells = [document.createElement('td'),document.createElement('td')]
    cells[0].appendChild(document.createTextNode('Плит:'));
    cells[0].style.fontWeight = "bold"
    cells[0].style.textAlign = "right"
    cells[1].appendChild(document.createTextNode(`${data.materialCount}`));
    cells[1].style.textAlign = "left"
    cells[1].setAttribute("colspan","2")
    cells.forEach(c=>row.appendChild(c))
    tableBody.appendChild(row)

    const edgeCount = Object.keys(data.totalEdgeLength).length
    Object.keys(data.totalEdgeLength).forEach(edge=>{
        row = document.createElement('tr')
        cells = [document.createElement('td'),document.createElement('td')]
        const edgeCaption = edgeCount > 1?`Кромка ${edge}мм:`:`Кромка:`
        cells[0].appendChild(document.createTextNode(edgeCaption));
        cells[0].style.fontWeight = "bold"
        cells[0].style.textAlign = "right"
        cells[1].appendChild(document.createTextNode(`${data.totalEdgeLength[edge]}м`));
        cells[1].style.textAlign = "left"
        cells[1].setAttribute("colspan","2")
        cells.forEach(c=>row.appendChild(c))
        tableBody.appendChild(row)
        }
    )

   
    tableBody.appendChild(document.createElement('tr'))
    tableBody.appendChild(document.createElement('tr'))

    row = document.createElement('tr')
    row.style.fontWeight = "bold"
    row.style.textAlign = "center"
    cells = Array(data.heads.length).fill(0).map(()=>document.createElement('td'))
    data.heads.forEach((h: string, index: number)=>{
        cells[index].appendChild(document.createTextNode(h))
    })
    // cells[0].appendChild(document.createTextNode(data.heads[0]))
    // cells[1].appendChild(document.createTextNode(data.heads[1]))
    // cells[2].appendChild(document.createTextNode(data.heads[2]))
    // cells[3].appendChild(document.createTextNode(data.heads[3]))
    row.appendChild(document.createElement('td')) //пустая колонка
    cells.forEach(c=>row.appendChild(c))
    tableBody.appendChild(row)

    detailList.forEach((detail, index)=>{
        row = document.createElement('tr')
        row.style.textAlign = "center"
        cells = Array(data.heads.length-1).fill(0).map(()=>document.createElement('td'))
        let col=-1
        cells[++col].appendChild(document.createTextNode(detail.name))
        cells[++col].appendChild(document.createTextNode(`${detail.length}`))
        cells[col].style.textDecoration = (detail.edgeLength1||detail.edgeLength2)?'underline':'none'
        cells[col].style.textDecoration = (detail.edgeLength1&&detail.edgeLength2)?'underline double':cells[col].style.textDecoration
        cells[col].style.textDecoration = 'underline double'
        cells[++col].appendChild(document.createTextNode(`${detail.width}`))
        cells[col].style.textDecoration = (detail.edgeWidth1||detail.edgeWidth2)?'underline':'none'
        cells[col].style.textDecoration = (detail.edgeWidth1&&detail.edgeWidth2)?'underline double':cells[col].style.textDecoration
        cells[++col].appendChild(document.createTextNode(`${detail.count}`))
        if(data.heads.length===9) cells[++col].appendChild(document.createTextNode(detail.edgeColumn||''))
        cells[++col].appendChild(document.createTextNode(detail.paz))
        cells[++col].appendChild(document.createTextNode(detail.comment))
        const modules: string[] = []
        if ((detail.modules?.size||0) > 1) detail.modules?.forEach((value, key) => modules.push(`${key}-${value}`)); else modules[0] = detail.modules?.keys().next().value;
        cells[++col].appendChild(document.createTextNode(modules.join(', ')))

        row.appendChild(document.createElement('td'))
        const num = document.createElement('td')
        num.appendChild(document.createTextNode(`${index + 1}`))
        num.style.border = "1px solid"
        row.appendChild(num)
        cells.forEach(c=>{
            c.style.border = "1px solid"
            row.appendChild(c)
        })
        tableBody.appendChild(row)
    })

    table.appendChild(tableBody)
    table.setAttribute("id","exportTable")
    table.style.display="none"
    table.style.font = '11px sans-serif'
    document.body.appendChild(table)
    return table
}