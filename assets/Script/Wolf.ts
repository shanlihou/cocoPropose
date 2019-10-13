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

const MESSAGE1 = [
    '我欠你132顿海底捞',
    ''
]

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Prefab)
    qiubiPrefab: cc.Prefab = null;

    @property(cc.Prefab)
    narratorPrefab: cc.Prefab = null;

    @property(cc.SpriteAtlas)
    heads: cc.SpriteAtlas = null;
    
    @property(cc.SpriteFrame)
    sf2: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    nightFrame: cc.SpriteFrame = null;
    
    @property(cc.SpriteFrame)
    dayFrame: cc.SpriteFrame = null;

    @property(cc.Prefab)
    bubblePrefab: cc.Prefab = null;

    private _vX;
    private _vY;
    private _heads:Array<cc.Node> = [];
    private _bubbles: Array<cc.Node> = [];

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this._vX = cc.view.getVisibleSize().width;
        this._vY = cc.view.getVisibleSize().height;
        this.setBack(false);

        let sfs = this.heads.getSpriteFrames();
        let spaceBetween = 40;
        let that = this;
        for (let i = 0; i < sfs.length; i++) {
            let sf = sfs[i];
            if (i == 8) {
                sf = this.sf2;
            }
            let headNode = this.createHead(sf);
            this.node.addChild(headNode);
            headNode.height = this._vY / 6 - spaceBetween;
            headNode.width = headNode.height;

            let row = Math.round((i + 1) / 2);
            headNode.y = (this._vY / 6) * row - (this._vY + headNode.height + spaceBetween) / 2;

            let col = i % 2;
            if (col == 0) {
                headNode.x = -(this._vX - headNode.width) / 2;
            }
            else {
                headNode.x = (this._vX - headNode.width) / 2;
            }

            this._heads.push(headNode);
            console.log(i, col, row, headNode)
            headNode.on(cc.Node.EventType.TOUCH_START, ()=>{
                that.onClick(i);
            });
        }

        // this.addNarrator('天黑请闭眼', ()=>{
        //     that.addNarrator('丘比特请连人', ()=>{
        //     })
        // })
                let qiubi = cc.instantiate(this.qiubiPrefab)
                let qiubiSc = qiubi.getComponent("Qiubi");
                qiubiSc.init(this.node);
                qiubi.x = 0;
                qiubi.y = 0;
                that.node.addChild(qiubi);
    }

    private setBack(isDay) {
        let back = cc.find('background', this.node);
        let backSprite = back.addComponent(cc.Sprite);
        backSprite.spriteFrame = isDay ? this.dayFrame : this.nightFrame;
        back.width = this._vX;
        back.height = this._vY;
    }

    private onClick(index) {
        console.log('on click', index)
    }

    private addBubble(index, isMe, text) {
        let bubble = cc.instantiate(this.bubblePrefab);
        let ctrl = bubble.getComponent("bubble");
        if (!isMe)
            ctrl.setOther();

        ctrl.setFrame(false);
        ctrl.setText(text);
        bubble.opacity = 0;
        this.node.addChild(bubble);

        let head = this._heads[index];
        bubble.y = head.y;
        if (index % 2 == 0){
            bubble.x = head.x + (head.width * head.scaleX + bubble.width * bubble.scaleX) / 2 + 20;
        }
        else {
            bubble.x = head.x - (head.width * head.scaleX + bubble.width * bubble.scaleX) / 2 - 20;
        }
        bubble.runAction(cc.fadeIn(1.0));
    }

    private createHead(frame) {
        let newNode = new cc.Node();
        let sp = newNode.addComponent(cc.Sprite);
        sp.spriteFrame = frame;
        return newNode;
    }

    private addNarrator(text, func) {
        let narrator = cc.instantiate(this.narratorPrefab);
        let ns = narrator.getComponent("Narrator");
        ns.init(text, this._vX, this._vY, 2.0, func);
        this.node.addChild(narrator);
    }

    // update (dt) {}
}
