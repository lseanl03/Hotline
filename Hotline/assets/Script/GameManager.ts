// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import BetButtonGroup from "./BetButtonGroup";
import CenterSlot from "./CenterSlot";
import HistoryHighSlot from "./HistoryHighSlot";
import HistoryNormalSlot from "./HistoryNormalSlot";
import Risk from "./Risk";
import Slot, { SlotType } from "./Slot";
import UIManager from "./UIManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {
    
    public static Instance: GameManager = null;

    public currentBetLevel : number = 10000;
    public minBetLevel : number = 10000;
    public maxBetLevel : number = 1000000;
    public currentMoney : number = 1000000;

    //prefab

    @property(cc.Prefab)
    historyNormalSlotPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    historyHighSlotPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    blueSlotPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    pinkSlotPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    fireSlotPrefab: cc.Prefab = null;

    fireChirldrenCount : number = 79;

    beforeNormalTargetID : number = 0;
    currentNormalTargetID : number = 0;

    beforeHighTargetID : number = 0;
    currentHighTargetID : number = 0;

    currentBetSlotType : SlotType = SlotType.None;
    currentCost : number = 0;

    onLoad(){
        GameManager.Instance = this;
    }

    start(){
        this.Init();
        this.SetCurrentNormalTargetID();
        this.SetCurrentHighTargetID();

        CenterSlot.Instance.HighRickState(false);
    }

    Init(){
        this.SpawnSlotToRisk(CenterSlot.Instance.normalRisk.node);
        this.SpawnSlotToRisk(CenterSlot.Instance.highRisk.node);

        
    }
    
    SpawnSlotToRisk(risk: cc.Node){

        var count = 50;

        for(let i = 0; i < count; i++){  

            this.SpawnSlot(this.blueSlotPrefab, risk);

            if(risk.childrenCount == this.fireChirldrenCount) this.SpawnSlot(this.fireSlotPrefab, risk);

            this.SpawnSlot(this.pinkSlotPrefab, risk);

            if(risk.childrenCount == this.fireChirldrenCount) this.SpawnSlot(this.fireSlotPrefab, risk);

        }
    }

    SpawnSlot(slotPrefab : cc.Prefab, holder: cc.Node){
        let slot = cc.instantiate(slotPrefab);
        slot.parent = holder;
        slot.getComponent(Slot).SetID(holder.childrenCount);
    }


    
    SetCurrentNormalTargetID(){
        if(CenterSlot.Instance.normalRisk.node.active){
            this.currentNormalTargetID = Math.floor((Math.random() * 10) + (this.fireChirldrenCount - 5));
            var normalNode = CenterSlot.Instance.normalRisk.node;
            var currentSlot = normalNode.children[this.currentNormalTargetID - 1];
            var currentSlotComponent = currentSlot.getComponent(Slot);
            cc.log("Normal Target Type: " + SlotType[currentSlotComponent.slotType] + "| ID: " + this.currentNormalTargetID);
        }
    }
    
    SetCurrentHighTargetID(){
        if(CenterSlot.Instance.highRisk.node.active){
            this.currentHighTargetID = Math.floor((Math.random() * 10) + (this.fireChirldrenCount - 5));
            var highNode = CenterSlot.Instance.highRisk.node;
            var currentSlot = highNode.children[this.currentHighTargetID - 1];
            var currentSlotComponent = currentSlot.getComponent(Slot);
            cc.log("High Target Type: " + SlotType[currentSlotComponent.slotType] + "| ID: " + this.currentHighTargetID);
        }
    }
    
    SetHightlightSlotTarget(state: boolean){
        this.SetHightlight(this.beforeNormalTargetID, state, CenterSlot.Instance.normalRisk);
        this.SetHightlight(this.beforeHighTargetID, state, CenterSlot.Instance.highRisk);
    }

    SetHightlight(currentTargetID : number, state: boolean, rick : Risk){
        if(rick.node.active && currentTargetID > 0){
            var node = rick.node;
            var currentSlot = node.children[currentTargetID - 1];
            var currentSlotComponent = currentSlot.getComponent(Slot);
            currentSlotComponent.SetHighlightState(state);
        }
    }
    
    SetBeforeNormalTargetID(){
        if(!CenterSlot.Instance.normalRisk.node.active) return;
        this.beforeNormalTargetID = this.currentNormalTargetID;
    }
    SetBeforeHighTargetID(){
        if(!CenterSlot.Instance.highRisk.node.active) return;
        this.beforeHighTargetID = this.currentHighTargetID;
    }

    GetCurrentTarget(rick : Risk){
        if(rick == CenterSlot.Instance.normalRisk){
            return rick.node.children[this.currentNormalTargetID - 1];
        }
        else if(rick == CenterSlot.Instance.highRisk){
            return rick.node.children[this.currentHighTargetID - 1];
        }
    }

    GetCurrentSlotType(rick : Risk){
        var currentSlot = this.GetCurrentTarget(rick);
        var currentSlotComponent = currentSlot.getComponent(Slot);
        return currentSlotComponent.slotType;
    }

    GetCurrentSlotColor(rick : Risk){
        var currentSlot = this.GetCurrentTarget(rick);
        var currentSlotComponent = currentSlot.getComponent(Slot);
        return currentSlotComponent.colorSlot;
    }

    public UpdateMoney(value: number){
        this.currentMoney += value;
        UIManager.Instance.SetCurrentMoneyLabel(this.currentMoney);
        UIManager.Instance.SetReceiveMoneyLabel(value);
    }

    public BetMoney(value : number){
        if(value > this.currentMoney) return;
        this.currentMoney -= value;
        UIManager.Instance.SetCurrentMoneyLabel(this.currentMoney);

        UIManager.Instance.SetConsumeMoneyLabel(value);
    }

    UpdateBetLevel(value : number){

        if(!CenterSlot.Instance.isStopped) return;

        this.currentBetLevel += value;

        if(this.currentBetLevel <= this.minBetLevel) this.currentBetLevel = this.minBetLevel;
        else if(this.currentBetLevel >= this.maxBetLevel) this.currentBetLevel = this.maxBetLevel
        else if(this.currentBetLevel >= this.currentMoney) this.currentBetLevel = this.currentMoney;

        UIManager.Instance.SetCurrentBetLevelLabel(this.currentBetLevel);
    }
    MoneyEnough(){
        return this.currentMoney >= this.currentBetLevel;
    }
    CheckReward(){

        if(CenterSlot.Instance.highRisk.node.active){
            if(this.currentBetSlotType == this.GetCurrentSlotType(CenterSlot.Instance.normalRisk)
            && this.currentBetSlotType == this.GetCurrentSlotType(CenterSlot.Instance.highRisk)){
        this.UpdateMoney(this.currentBetLevel * this.currentCost);
    }
}
        else{
            if(this.currentBetSlotType == this.GetCurrentSlotType(CenterSlot.Instance.normalRisk)){
                this.UpdateMoney(this.currentBetLevel * this.currentCost);
            }
        }
    }
    CheckMoney(){
        if(this.currentBetLevel > this.currentMoney) this.UpdateBetLevel(this.maxBetLevel);
    }


    public GetHistory(rick : Risk){

        
        var lastNodeViewIndex = UIManager.Instance.historyGroup.historyViewHolder.childrenCount - 1;
        var lastNodeListIndex = UIManager.Instance.historyGroup.historyListHolder.childrenCount - 1;

        
        if(rick == CenterSlot.Instance.normalRisk){
            var historyOnView = cc.instantiate(this.historyNormalSlotPrefab);

            historyOnView.setParent(UIManager.Instance.historyGroup.historyViewHolder);
            historyOnView.setSiblingIndex(0);
            historyOnView.getComponent(HistoryNormalSlot).GetInfo(this.GetCurrentSlotColor(rick));
            historyOnView.getComponent(HistoryNormalSlot).Anim();
    
            if(UIManager.Instance.historyGroup.historyViewHolder.childrenCount >= 15){
                UIManager.Instance.historyGroup.historyViewHolder.children[lastNodeViewIndex].destroy();
            }
            
            var historyOnList = cc.instantiate(this.historyNormalSlotPrefab);
            historyOnList.setParent(UIManager.Instance.historyGroup.historyListHolder);
            historyOnList.setSiblingIndex(0);
            historyOnList.getComponent(HistoryNormalSlot).GetInfo(this.GetCurrentSlotColor(rick));
           
            if(UIManager.Instance.historyGroup.historyListHolder.childrenCount >= 15){
                UIManager.Instance.historyGroup.historyListHolder.children[lastNodeListIndex].destroy();
            }
        }
        else if(rick == CenterSlot.Instance.highRisk){

            var normalColor = this.GetCurrentSlotColor(CenterSlot.Instance.normalRisk);
            var highColor = this.GetCurrentSlotColor(CenterSlot.Instance.highRisk);

            var historyOnView = cc.instantiate(this.historyHighSlotPrefab);
            historyOnView.setParent(UIManager.Instance.historyGroup.historyViewHolder);
            historyOnView.setSiblingIndex(0);
            historyOnView.getComponent(HistoryHighSlot).GetInfo(normalColor, highColor);
            historyOnView.getComponent(HistoryHighSlot).Anim();
    
            if(UIManager.Instance.historyGroup.historyViewHolder.childrenCount >= 15){
                UIManager.Instance.historyGroup.historyViewHolder.children[lastNodeViewIndex].destroy();
            }
            
            var historyOnList = cc.instantiate(this.historyHighSlotPrefab);
            historyOnList.setParent(UIManager.Instance.historyGroup.historyListHolder);
            historyOnList.setSiblingIndex(0);
            historyOnList.getComponent(HistoryHighSlot).GetInfo(normalColor, highColor);

            if(UIManager.Instance.historyGroup.historyListHolder.childrenCount >= 15){
                UIManager.Instance.historyGroup.historyListHolder.children[lastNodeListIndex].destroy();
            }
        }
    }

}
