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

    @property(cc.SpriteAtlas)
    heads: cc.SpriteAtlas = null;

    private _vX;
    private _vY;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this._vX = cc.view.getVisibleSize().width;
        this._vY = cc.view.getVisibleSize().height;

        let sfs = this.heads.getSpriteFrames();
        let spaceBetween = 10;
        for (let i = 0; i < sfs.length; i++) {
            let sf = sfs[i];
            let headNode = this.createHead(sf);
            this.node.addChild(headNode);
            headNode.height = this._vY / 6 - spaceBetween;
            headNode.width = headNode.height;

            let row = Math.round(i / 2);
            headNode.y = headNode.height * row - this._vY / 2;

            let col = i % 2;
            if (col == 0) {
                headNode.x = -(this._vX - headNode.width) / 2;
            }
            else {
                headNode.x = (this._vX - headNode.width) / 2;
            }
        }
    }

    private createHead(frame) {
        let newNode = new cc.Node();
        let sp = newNode.addComponent(cc.Sprite);
        sp.spriteFrame = frame;
        return newNode;
    }

    // update (dt) {}
}
