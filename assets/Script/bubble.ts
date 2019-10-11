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

    @property(cc.SpriteFrame)
    myFrame: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    cornerMe: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    cornerOther: cc.SpriteFrame = null;
    
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

        this.autoCorner();
    }

    private autoCorner() {
        let corner = cc.find('corner', this.node);
        corner.y = this.node.y - 5;
        let cornerWidth = corner.width * corner.scaleX;

        if (this._isMe){
            corner.x = (this.node.width + cornerWidth) / 2;
            corner.scaleX = -corner.scaleX;
        }
        else {
            corner.x = -this.node.width / 2 - cornerWidth / 2;
        }
    }

    public setFrame(isMe) {
        let sprite: cc.Sprite = this.node.getComponent(cc.Sprite);
        sprite.spriteFrame = isMe ? this.myFrame : this.otherFrame ;

        let corner = cc.find('corner', this.node);
        let cornerSprite = corner.getComponent(cc.Sprite);
        cornerSprite.spriteFrame = isMe ? this.cornerMe : this.cornerOther;
    }

    public onClickMe() {
        console.log('on click me')
    }

    public setOther() {
        this._isMe = false;
        let sprite: cc.Sprite = this.node.getComponent(cc.Sprite);
        sprite.spriteFrame = this.otherFrame;

        let corner = cc.find('corner', this.node);
        let cornerSprite = corner.getComponent(cc.Sprite);
        cornerSprite.spriteFrame = this._isMe ? this.cornerMe : this.cornerOther;
    }

    start () {
        //this.setText("hello qqq abadsddfsdfsdfasdfasdfaaaaaaaaaaaaaaaaaaaaa");
    }

    // update (dt) {}
}
