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


    // onLoad () {}
    private _father:cc.Node = null;

    start () {
        console.log('im in arrow start')
        let that = this;
        this.scheduleOnce(()=>{
            that.node.destroy();
        }, 3)
    }
    onBeginContact(contact, self, other) {
        let indexI = other.node.indexI;
        if (indexI == 6 || indexI == 7) {
            this.node.destroy();
            let wolfcs = this._father.getComponent('Wolf');
            wolfcs.onArrow(indexI);
        }
    }

    setFather(father) {
        this._father = father;
    }


    // update (dt) {}
}
