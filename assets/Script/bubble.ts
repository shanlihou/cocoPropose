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
export default class Bubble extends cc.Component {

    @property(cc.SpriteFrame)
    otherFrame: cc.SpriteFrame = null;
    
    private _maxWidth = 100;
    private _isMe = true;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    public setText(text: string) {
        let labelNode = cc.find("bubbleLabel", this.node);
        labelNode.color = new cc.Color(0, 0, 0);
        let label: cc.Label = labelNode.getComponent(cc.Label);
        label.overflow = cc.Label.Overflow.NONE;
        label.string = text;
        label._updateRenderData(true);
        if (labelNode.width > this._maxWidth) {
            label.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
            labelNode.width = this._maxWidth;
            label._updateRenderData(true);
        }
        this.node.width = labelNode.width + 10;
        this.node.height = labelNode.height + 10;
        this.node.on('click', this.onClickMe, this);
    }

    public onClickMe() {
        console.log('on click me')
    }

    public setOther() {
        this._isMe = false;
        let sprite: cc.Sprite = this.node.getComponent(cc.Sprite);
        sprite.spriteFrame = this.otherFrame;
    }

    start () {
        //this.setText("hello qqq abadsddfsdfsdfasdfasdfaaaaaaaaaaaaaaaaaaaaa");
    }

    // update (dt) {}
}
