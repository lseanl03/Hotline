// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import CenterSlot from "./CenterSlot";
import GameManager from "./GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HistoryNormalSlot extends cc.Component {

    @property(cc.Sprite)
    colorSprite: cc.Sprite = null;

    @property(cc.Node)
    overlay: cc.Node = null;

    public Anim(): void {
        this.colorSprite.node.scale = 0;

        let colorTween = cc.tween(this.colorSprite.node)
        .to(0.5, {scale: 1})
        .start();

        this.overlay.scale = 0;
        let overlayTween = cc.tween(this.overlay)
        .to(0.5, {scale: 1})
        .start();

        var heighTemp = this.node.height;
        var widthTemp = this.node.width;
        this.node.height = this.node.width = 0;

        let node = cc.tween(this.node)
        .to(0.5, {height: heighTemp, width: widthTemp, })
        .start();


    }
    public GetInfo(color: cc.Color){
        this.colorSprite.node.color = color;

        // var currentColor = GameManager.Instance.GetCurrentSlotColor(CenterSlot.Instance.normalRisk);
        // if(this.node.color != currentColor){
        //     this.overlay.active = true;
        // }
    }
}
