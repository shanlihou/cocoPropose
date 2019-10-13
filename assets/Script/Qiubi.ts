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

    @property(cc.Node)
    touchNode: cc.Node = null;

    @property(cc.Prefab)
    arrowPrefab: cc.Prefab = null;

    // LIFE-CYCLE CALLBACKS:
    private startVec:cc.Vec2 = cc.v2();
    private _father:cc.Node = null;

    // onLoad () {}
    private init(father) {
        this._father = father;
    }

    start () {
        console.log('im in start')
        this.touchNode.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.touchNode.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.touchNode.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    private onTouchStart(event) {
        console.log('ontouch start:', event.getLocation())
        this.startVec = event.getLocation();
    }

    private onTouchMove(event) {
        let newVec = event.getLocation().sub(this.startVec);
        let angle = newVec.signAngle(cc.v2(1, 0)) / Math.PI * 180;
        this.node.angle = -(angle + 210);
        
    }

    private onTouchEnd(event) {
        let newVec:cc.Vec2 = event.getLocation().sub(this.startVec);
        let angle = newVec.signAngle(cc.v2(1, 0)) / Math.PI * 180;
        this.node.angle = -(angle + 210);

        let arrow = this.addArrow(angle);
        this._father.addChild(arrow);

        newVec.normalizeSelf()
        arrow.setPosition(newVec.mul(-50));
    }

    private addArrow(angle) {
        let arrow = cc.instantiate(this.arrowPrefab);
        arrow.width = 50;
        arrow.height = 50;
        arrow.angle = -(angle - 45);
        return arrow;
    }

    // update (dt) {}
}
