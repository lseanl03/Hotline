// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ConsumeMoney extends cc.Component {

    @property(cc.Label)
    public label : cc.Label = null;

    protected onLoad(): void {
    }
    protected onEnable(): void {
        this.node.opacity = 255;
        this.node.scale = 1;
        this.node.position = cc.v3(0, 0, 0);

        cc.tween(this.node)
        .to(0.5, {opacity: 255, position: cc.v3(0, -70, 0)})
        .to(0.3, {opacity: 0})
        .call(() => {
            this.node.active = false;
        })
        .start();
    }
}
