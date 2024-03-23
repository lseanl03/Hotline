// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import GameManager from "./GameManager";
import Risk from "./Risk";
import Slot from "./Slot";
import UIManager from "./UIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class CenterSlot extends cc.Component {

    public static Instance: CenterSlot = null;

    standardLength : number = 1000;
    maxMoveLength : number = 2500;

    startSpeed : number = 1;
    endSpeed : number = 1;

    @property
    isStopped: boolean = true;

    @property(Risk)
    normalRisk: Risk = null;

    @property(Risk)
    highRisk: Risk = null;

    protected onLoad(): void {
        CenterSlot.Instance = this;
    }
    protected start(): void {
        this.Init();
    }
    Init(){
        this.normalRisk.node.position = cc.v3(-this.maxMoveLength, this.normalRisk.node.position.y, this.normalRisk.node.position.z);
        this.highRisk.node.position = cc.v3(this.maxMoveLength, this.highRisk.node.position.y, this.highRisk.node.position.z);

    }

    HighRickState = (state :boolean) => this.highRisk.node.active = state;

    Pull(){
        if(this.isStopped && GameManager.Instance.MoneyEnough()){

            this.OnStartPull();

            this.PullRick(this.normalRisk);
            this.PullRick(this.highRisk);
        }

    }

    PullRick(rick : Risk){

        if(!rick.node.active) return;

        var layout = rick.getComponent(cc.Layout);
        if(layout.horizontalDirection == cc.Layout.HorizontalDirection.LEFT_TO_RIGHT){
            this.PullActive(rick, layout, this.maxMoveLength);
        }
        else{
            this.PullActive(rick, layout, -this.maxMoveLength);
        }

    }

    PullActive(rick : Risk, layout : cc.Layout, moveLength : number){

        var targetPosX = GameManager.Instance.GetCurrentTarget(rick).position.x; 
        var dirMove = moveLength > 0 ? moveLength - this.standardLength : moveLength + this.standardLength;

        cc.tween(rick.node)
        .to(this.startSpeed,{ position: cc.v3(dirMove, rick.node.position.y, rick.node.position.z)}, {easing: 'linear'} )
        .call(() => {

            if(layout.horizontalDirection == cc.Layout.HorizontalDirection.LEFT_TO_RIGHT)
                layout.horizontalDirection = cc.Layout.HorizontalDirection.RIGHT_TO_LEFT;
            else layout.horizontalDirection = cc.Layout.HorizontalDirection.LEFT_TO_RIGHT;
        })
        .to(this.endSpeed,{ position: cc.v3(targetPosX, rick.node.position.y, rick.node.position.z)}, {easing: 'backOut'})
        .call(()=>{
            this.OnStopPull(rick);
        })
        .start();
    }

    OnStartPull(){
        this.isStopped = false;
        GameManager.Instance.BetMoney(GameManager.Instance.currentBetLevel);
        GameManager.Instance.SetHightlightSlotTarget(false);

    }
    OnStopPull(rick : Risk){
        if(rick == this.normalRisk && this.highRisk.node.active) return;

        this.isStopped = true;
        GameManager.Instance.CheckReward();
        GameManager.Instance.GetHistory(rick);

        GameManager.Instance.SetBeforeNormalTargetID();
        GameManager.Instance.SetBeforeHighTargetID();
        
        GameManager.Instance.SetCurrentNormalTargetID();
        GameManager.Instance.SetCurrentHighTargetID();

        GameManager.Instance.SetHightlightSlotTarget(true);

        GameManager.Instance.CheckMoney();
    }

}
