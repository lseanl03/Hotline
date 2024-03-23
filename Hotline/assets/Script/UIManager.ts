// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import BetButtonGroup from "./BetButtonGroup";
import CenterSlot from "./CenterSlot";
import ConsumeMoney from "./ConsumeMoney";
import GameManager from "./GameManager";
import HistoryGroup from "./HistoryGroup";
import ReceiveMoney from "./ReceiveMoney";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UIManager extends cc.Component {

    public static Instance: UIManager = null;


    @property(HistoryGroup)
    historyGroup : HistoryGroup = null;

    @property (ConsumeMoney)
    consumeMoney : ConsumeMoney = null;
    @property (ReceiveMoney)
    receiveMoney : ReceiveMoney = null;
    @property (cc.Label)
    currentMoneyLabel : cc.Label = null;
    @property (cc.Label)
    currentBetLevelLabel : cc.Label = null;


    protected onLoad(): void {
        UIManager.Instance = this;
    }

    protected start(): void {
        this.Init();
    }

    Init(){
        this.SetCurrentBetLevelLabel(GameManager.Instance.currentBetLevel);
        this.SetCurrentMoneyLabel(GameManager.Instance.currentMoney);
    }
    
    public SetReceiveMoneyLabel(receiveMoney : number){
        this.ReceiveMoneyState(true);
        this.receiveMoney.label.string = "+" + receiveMoney + " VND";
    }
    public SetCurrentMoneyLabel(currentMoney : number){
        this.currentMoneyLabel.string = "" + currentMoney + " VND";
    }
    public SetCurrentBetLevelLabel(currentBetLevel : number){
        this.currentBetLevelLabel.string = "" + currentBetLevel;
    }
    public SetConsumeMoneyLabel(consumeMoney : number){
        this.ConsumeMoneyState(true);
        this.consumeMoney.label.string = "-" + consumeMoney + " VND";
    }
    public ConsumeMoneyState(state : boolean){
        this.consumeMoney.node.active = state;
    }
    public ReceiveMoneyState(state : boolean){
        this.receiveMoney.node.active = state;
    }

    CurrentMoneyEffect(){
        cc.tween(this.currentMoneyLabel.node)
        .to(0.25, { scale: 1.2})
        .to(0.2, { scale: 1})
        .start();
    }
}
