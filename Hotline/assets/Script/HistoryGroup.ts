// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class HistoryGroup extends cc.Component {
    
    @property(cc.Button)
    historyButton: cc.Button = null;

    @property(cc.Node)
    historyList: cc.Node = null;


    @property(cc.Node)
    historyViewHolder: cc.Node = null;

    @property(cc.Node)
    historyListHolder: cc.Node = null;

    protected onLoad(): void {
        this.historyButton.node.on('click', this.OnHistory, this);
    }
    OnHistory(){
        this.historyList.active = !this.historyList.active;
    }
}
