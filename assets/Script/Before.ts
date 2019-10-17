// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Prefab)
    narratorPrefab: cc.Prefab = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    private _vX = 0;
    private _vY = 0;

    start () {
        let audioNode = cc.find('Audio');
        let audioCs = audioNode.getComponent('Audio');
        audioCs.playBgMusic();

        this._vX = cc.view.getVisibleSize().width;
        this._vY = cc.view.getVisibleSize().height;
        this.addNarrator('从前我的生活只有黑与白', ()=>{
            this.addNarrator('只有0和1', ()=>{
                this.addNarrator('直到她出现', ()=>{

                    cc.director.preloadScene("helloworld", function () {
                        cc.director.loadScene("helloworld");
                    }.bind(this));
                })
            })
        })
    }

    private addNarrator(text, func) {
        let narrator = cc.instantiate(this.narratorPrefab);
        let ns = narrator.getComponent("Narrator");
        ns.init(text, this._vX, this._vY, 2.0, func);
        this.node.addChild(narrator);
    }

    // update (dt) {}
}
