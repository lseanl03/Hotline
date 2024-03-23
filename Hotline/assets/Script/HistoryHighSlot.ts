// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import CenterSlot from "./CenterSlot";
import GameManager from "./GameManager";
import HistoryNormalSlot from "./HistoryNormalSlot";

const {ccclass, property} = cc._decorator;

@ccclass
export default class HistoryHighSlot extends cc.Component {
    
    @property(cc.Sprite)
    normalColorSprite: cc.Sprite = null;

    @property(cc.Sprite)
    highColorSprite: cc.Sprite = null;

    @property(cc.Node)
    normalOverlay: cc.Node = null;

    @property(cc.Node)
    highOverlay: cc.Node = null;

    public Anim(): void {
        this.normalColorSprite.node.scale = 0;
        this.highColorSprite.node.scale = 0;

        let normalColorTween = cc.tween(this.normalColorSprite.node)
        .to(0.5, {scale: 1})
        .start();

        let highColorTween = cc.tween(this.highColorSprite.node)
        .to(0.5, {scale: 1})
        .start();

        this.normalOverlay.scale = 0;
        let nTween = cc.tween(this.normalOverlay)
        .to(0.5, {scale: 1})
        .start();

        this.highOverlay.scale = 0;
        let hTween = cc.tween(this.highOverlay)
        .to(0.5, {scale: 1})
        .start();

        var heighTemp = this.node.height;
        var widthTemp = this.node.width;
        this.node.height = this.node.width = 0;

        let node = cc.tween(this.node)
        .to(0.5, {height: heighTemp, width: widthTemp, })
        .start();


    }
    public GetInfo(normalColor: cc.Color, highColor: cc.Color){
        this.normalColorSprite.node.color = normalColor;
        this.highColorSprite.node.color = highColor;

        // var normalColor = GameManager.Instance.GetCurrentSlotColor(CenterSlot.Instance.normalRisk);
        // var highColor = GameManager.Instance.GetCurrentSlotColor(CenterSlot.Instance.highRisk);

        // if(this.node.color != normalColor){
        //     this.normalOverlay.active = true;
        // }
        // if(this.node.color != highColor){
        //     this.highOverlay.active = true;
        // }
    }
}
