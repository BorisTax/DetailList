import TextShape from './TextShape';
export default class TableCellShape{
    constructor(text, underlines = [1, 2]){
        this.topLeft = {x:0, y:0}
        this.align = TextShape.CENTER;
        this.caption = [text]
        this.captionShape = new TextShape(this.caption, underlines)
        this.fontSize = 20
        this.padding = 5
    }
    draw(ctx) {
        let width
        let height
        if(!this.width) {
            ({width, height} = this.getOwnDimensions(ctx,this.fontSize))
        }else {
            width = this.width
            height = this.height
        }
        let point = {};
        switch(this.align){
            case TextShape.CENTER:
                point = {x:this.topLeft.x + width / 2,
                        y:this.topLeft.y + height / 2}
                break;
            case TextShape.LEFT:
                point = {x:this.topLeft.x,
                    y:this.topLeft.y + height / 2}    
                break;
            case TextShape.RIGHT:
                point = {x:this.bottomRight.x,
                    y:this.topLeft.y + height / 2}    
                break;
            default:
        }
        this.captionShape.setPoint(point);
        this.captionShape.setAnchor({horizontal : this.align, vertical : TextShape.CENTER});
        this.captionShape.draw(ctx,this.fontSize)
        ctx.lineWidth = 1
        ctx.strokeRect(this.topLeft.x, this.topLeft.y, width, height)
    }
    setPosition(x,y){
        this.topLeft = {x,y}
    }
    setAlign(align){
        this.align = align
    }
    setText(text){
        this.caption.setText(text);
    }
    setFont(fontSize){
        this.fontSize = fontSize
    }
    getOwnDimensions(ctx,fontSize = 20){
        ctx.font = `${fontSize}px serif`;
        let {width, height} = this.captionShape.getTextRect(ctx, fontSize)
        width += this.padding * 2
        height += this.padding * 2
        return {width, height};
    }
    setDimensions(width, height){
        this.width = width
        this.height = height
    }
    getDimensions(ctx){
        if(!this.width) return this.getOwnDimensions(ctx)
        return {width:this.width, height:this.height};
    }
}