

export default class TextShape{
    static CENTER=0;
    static LEFT=1;
    static RIGHT=2;
    static TOP=3;
    static BOTTOM=4;
    constructor(text=[''], underlines=[],point={x:0,y:0},anchor={vertical:TextShape.CENTER,horizontal:TextShape.CENTER}){
        this.p=point;
        this.text=text;
        this.anchor=anchor;
        this.lineBreak = 2
        this.underlines = underlines
    }
    draw(ctx, fontSize){
        let basePoint={...this.p}
        
        const {width,height, lineHeight}=this.getTextRect(ctx,fontSize);
        switch(this.anchor.horizontal){
            case TextShape.CENTER:
                basePoint.x=this.p.x-width/2
                break;
            case TextShape.LEFT:
                basePoint.x=this.p.x+5;
                break;
            case TextShape.RIGHT:
                basePoint.x=this.p.x-width;
                break;
            default:
        }
        switch(this.anchor.vertical){
            case TextShape.CENTER:
                basePoint.y=this.p.y+height/2
                break;
            case TextShape.TOP:
                basePoint.y=this.p.y+height
                break;
            case TextShape.BOTTOM:
                basePoint.y=this.p.y;
                break;
            default:
        }
        ctx.font=`${fontSize}px serif`;
        let {x,y} = basePoint
        ctx.lineWidth = 1
        for(const t of this.text){
            ctx.fillText(t, x, y);
            y -= (lineHeight + this.lineBreak)
        }
        for(const line of this.underlines){
            ctx.beginPath()
            ctx.lineWidth = line<=1?1:3
            ctx.moveTo(basePoint.x,basePoint.y+0.5)
            ctx.lineTo(basePoint.x + width, basePoint.y)
            ctx.stroke()
            basePoint.y += (line + 3)
        }
    }
    getTextRect(ctx,fontSize){
        ctx.font = `${fontSize}px serif`;
        let width = 0
        let height = 0
        let lineHeight = 0
        for(const t of this.text){
            const textMetrics = ctx.measureText(t)
            if(width < textMetrics.width) width = textMetrics.width
            lineHeight = textMetrics.actualBoundingBoxAscent + textMetrics.fontBoundingBoxDescent
            height += lineHeight
        }
        const underlineHeight = this.underlines.reduce((a,i)=>a+i+3,0)
        height += (this.text.length - 1) * this.lineBreak + underlineHeight
        return {width, height, lineHeight};
    }

    setText(text){
        this.text=text;
    }
    setFont(font){
        this.font=font;
    }
    setPoint(point){
        this.p=point;
    }
    setAnchor(anchor){
        this.anchor={...this.anchor,...anchor};
    }


}