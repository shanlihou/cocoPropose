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

    @property(cc.Label)
    label: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    public init(text, swidth, sheight, delay, func) {
        this.label.string = text;
        this.node.width = swidth;
        this.node.height = sheight;

        this.node.opacity = 0;
        let that = this;
        this.node.runAction(cc.sequence(cc.fadeIn(1), cc.callFunc(()=>{
            that.scheduleOnce(()=>{
                func.call();
                
                that.scheduleOnce(()=>{
                    that.node.destroy();
                }, 1)
            }, delay);
        })));
    }

    // update (dt) {}
}
