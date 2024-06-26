// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ButtonBase extends cc.Component {

    protected onLoad(): void {
        this.node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this);
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLeave, this);
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        this.node.on(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this);

    }

    protected ChangeStateNode(){
    }
    protected Active(){}
    protected Deactive(){}

    protected onMouseEnter(event: cc.Event.EventMouse): void {
        cc.tween(this.node)
        .to(0.1, {scale: 1.05})
        .start();
    }

    protected onMouseLeave(event: cc.Event.EventMouse): void {
        cc.tween(this.node)
        .to(0.1, {scale: 1})
        .start();
    }

    protected onMouseDown(event: cc.Event.EventMouse): void {
        cc.tween(this.node)
        .to(0.1, {scale: 0.95})
        .start();
    }
    protected onMouseUp(event: cc.Event.EventMouse): void {
        cc.tween(this.node)
        .to(0.1, {scale: 1})
        .start();
    }
}
