// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class InfoGroup extends cc.Component {
    
    @property(cc.Button)
    tutorialButton: cc.Button = null;

    @property(cc.Button)
    closeTutorialButton: cc.Button = null;

    @property(cc.Node)
    tutorialPanel: cc.Node = null;

    @property(cc.Node)
    tutorialBg: cc.Node = null;

    protected onLoad(): void {
        this.tutorialButton.node.on('click', this.OnTutorial, this);
        this.closeTutorialButton.node.on('click', this.OnCloseTutorial, this);
    }

    OnTutorial(){
        this.tutorialBg.active = true;
        this.tutorialPanel.active = true;

        this.tutorialPanel.position = cc.v3(0, 200, 0);
        this.tutorialPanel.opacity = 0;
        
        cc.tween(this.tutorialPanel)
        .to(0.2, { position: cc.v3(0, 0, 0), opacity: 255})
        .start();
    }
    OnCloseTutorial(){

        cc.tween(this.tutorialPanel)
        .to(0.2, { position: cc.v3(0, -50, 0)})
        .to(0.2, { position: cc.v3(0, 200, 0), opacity: 0})
        .call(() => {
            this.tutorialPanel.active = false;
            this.tutorialBg.active = false;
        })
        .start();
    }

}
