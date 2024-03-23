// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import BetButtonGroup from "./BetButtonGroup";
import CenterSlot from "./CenterSlot";
import GameManager from "./GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RiskMode extends cc.Component {

    @property
    isOn : boolean = false;

    @property(cc.Color)
    offColor : cc.Color = null;
    @property(cc.Color)
    onColor : cc.Color = null;

    @property(cc.Sprite)
    toggleBg : cc.Sprite = null;

    @property(cc.Sprite)
    toggleHandle : cc.Sprite = null;

    @property(BetButtonGroup)
    betButtonGroup : BetButtonGroup = null;

    protected onLoad(): void {
        this.toggleBg.node.on('click', this.OnToggle, this);
    }
    OnToggle(){
        
        if(!CenterSlot.Instance.isStopped) return;

        this.isOn = !this.isOn;
        this.HanldeMode(this.isOn);
    }
    ToggleHanldeEffect(posX : number){
        cc.tween(this.toggleHandle.node)
        .to(0.1,{ position: cc.v3(posX,this.toggleHandle.node.position.y, this.toggleHandle.node.position.z) })
        .start();
    }

    HanldeMode(state : boolean){
        if(state){
            this.ToggleHanldeEffect(13);
            this.betButtonGroup.UpdateCostBet(4.125, 1056);
            this.toggleBg.node.color = this.onColor;
        }
        else{
            this.ToggleHanldeEffect(-13);
            this.betButtonGroup.UpdateCostBet(2, 32);
            this.toggleBg.node.color = this.offColor;
        }
        CenterSlot.Instance.HighRickState(state);
    }
}
