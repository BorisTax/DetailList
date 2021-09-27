import TextShape from './TextShape';
import TableCellShape from './TableCellShape';
export default class TableShape{
    constructor(table){
        this.table = table
        this.tableRows = []
        this.rowCount = table.length
        this.colCount = table[0].length
        this.topLeft = {x:0, y:0}
        for(const row of table){
            const tableRow = []
            for(const col of row){
                tableRow.push(new TableCellShape(col.text, col.underline))
            }
            this.tableRows.push(tableRow)
        }
    }

    draw(ctx, fontSize) {
        const {maxColWidth, maxRowHeight} = this.getMaxCellDimensions(ctx, fontSize)
        let y = 0
        this.tableRows.forEach((row, rowIndex)=>{
            let x = 0
            const height = maxRowHeight[rowIndex]
            row.forEach((col, colIndex)=>{
                const width = maxColWidth[colIndex]
                col.setPosition(this.topLeft.x + x,this.topLeft.y + y)
                col.setDimensions(width, height)
                col.draw(ctx, fontSize)
                x += width
            })
            y += height
        })
    }

    getMaxCellDimensions(ctx, fontSize){
        let maxColWidth = Array(this.colCount).fill(0)
        let maxRowHeight = Array(this.rowCount).fill(0)
        this.tableRows.forEach((row, rowIndex)=>{
            row.forEach((col, colIndex)=>{
                const {width, height} = col.getOwnDimensions(ctx, fontSize)
                if(maxColWidth[colIndex] < width) maxColWidth[colIndex] = width
                if(maxRowHeight[rowIndex] < height) maxRowHeight[rowIndex] = height
            })
        })
        return {maxColWidth, maxRowHeight}
    }
    getDimensions(ctx,font){

    }

    setPosition(x, y){
        this.topLeft = {x, y}
    }

}