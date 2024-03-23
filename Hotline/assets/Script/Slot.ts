// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
export enum SlotType {
    None = 0,
    Blue = 1,
    Pink = 2,
    Fire = 3,
}
@ccclass
export default class Slot extends cc.Component {
    id : number = 0;

    @property({type: cc.Enum(SlotType)})
    slotType: SlotType = SlotType.None;

    @property(cc.Color)
    colorSlot : cc.Color = cc.Color.WHITE;
    
    @property(cc.Sprite)
    hightlightSprite: cc.Sprite = null;

    @property(cc.Label)
    idLabel: cc.Label = null;

    protected onLoad(): void {
        //this.idLabel.node.active = false;
    }
    SetID(id: number){
        this.id = id;
        this.idLabel.string = id.toString();
    }
    SetHighlightState(state: boolean){
        this.hightlightSprite.node.active = state;
        cc.tween(this.hightlightSprite.node)
        .repeat(3, cc.tween()
        .to(0.2, {opacity: 100})
        .to(0.2, {opacity: 255})
        )
        .start();
    }
}
