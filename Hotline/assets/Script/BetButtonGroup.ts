// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import BetButton from "./BetButton";
import CenterSlot from "./CenterSlot";
import GameManager from "./GameManager";
import { SlotType } from "./Slot";

const {ccclass, property} = cc._decorator;

@ccclass
export default class BetButtonGroup extends cc.Component {

    @property(BetButton)
    pinkBet : BetButton = null;
    @property(BetButton)
    blueBet : BetButton = null;
    @property(BetButton)
    fireBet : BetButton = null;

    @property (cc.Button)
    subMinBetButton : cc.Button = null;
    @property (cc.Button)
    subBetButton : cc.Button =  null;    
    @property (cc.Button)
    sumBetButton : cc.Button = null;
    @property (cc.Button)
    sumMaxBetButton : cc.Button = null;

    @property (cc.Label)
    currentBetLevelLabel : cc.Label = null;

    onLoad(){
        
        this.pinkBet.node.on('click', this.OnPinkBet, this);
        this.blueBet.node.on('click', this.OnBlueBet, this);
        this.fireBet.node.on('click', this.OnFireBet, this);

        this.subBetButton.node.on('click', this.onSubButtonClick, this);
        this.sumBetButton.node.on('click', this.onSumButtonClick, this);
        
        this.subMinBetButton.node.on('click', this.onSubMinButtonClick, this);
        this.sumMaxBetButton.node.on('click', this.onSumMaxButtonClick, this);
    }
    protected start(): void {
        this.Init();
    }

    Init(){
        this.SetCurrentBetLevelLabel(GameManager.Instance.currentBetLevel);
    }

    onSubButtonClick(){
        GameManager.Instance.UpdateBetLevel(-10000);
    }
    onSumButtonClick(){
        GameManager.Instance.UpdateBetLevel(10000);
    }

    onSubMinButtonClick(){
        GameManager.Instance.UpdateBetLevel(-GameManager.Instance.maxBetLevel);
    }
    onSumMaxButtonClick(){
        GameManager.Instance.UpdateBetLevel(GameManager.Instance.maxBetLevel);
    }

    OnPinkBet(){
        this.SetBet(SlotType.Pink, this.pinkBet.cost);
    }
    OnBlueBet(){
        this.SetBet(SlotType.Blue, this.blueBet.cost);
    }
    OnFireBet(){
        this.SetBet(SlotType.Fire, this.fireBet.cost);
    }

    SetBet(slotType : SlotType, cost : number){
        GameManager.Instance.currentBetSlotType = slotType;
        GameManager.Instance.currentCost = cost;
        CenterSlot.Instance.Pull();
    }
    public SetCurrentBetLevelLabel(currentBetLevel : number){
        this.currentBetLevelLabel.string = "" + currentBetLevel;
    }
    public UpdateCostBet(normalCost : number, fireCost : number){
        this.blueBet.SetCost(normalCost);
        this.pinkBet.SetCost(normalCost);
        this.fireBet.SetCost(fireCost);
    }
}
