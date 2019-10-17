const {ccclass, property} = cc._decorator;

const MESSAGES1 = [
    {isMe: true, text: '听说有狼人杀局'},
    {isMe: false, text: '你没听错'},
    {isMe: false, text: '支付__顿海底捞即可参加'}
]

const MESSAGES2 = [
    {isMe: false, text: '现在我欠你132顿海底捞了'},
    {isMe: true, text: '那你什么时候还清'},
    {isMe: false, text: '下下个辈子'},
    {isMe: true, text: '╮ (￣ 3￣) ╭'},
    {isMe: false, text: '组局啦，还差一坑，回复y进入英伦纯K'}
]

enum EnterType {
    normal = 0,
    ocean,
    wolf
}

@ccclass
export default class Helloworld extends cc.Component {
    
    @property(cc.Prefab)
    bubblePrefab: cc.Prefab = null;
    private curHeight = 0;
    private heightBorder = 10;
    private _edit: cc.EditBox;
    private _commonHeight = 30;
    private _vX;
    private _vY;
    private _enterType = EnterType.normal;

    start () {
        this._vX = cc.view.getVisibleSize().width;
        this._vY = cc.view.getVisibleSize().height;
        let back = cc.find("Back/background");
        back.width = this._vX;
        back.height = this._vY;
        back.setPosition(cc.v2());

        this.initUI();
        this.autoMessages(MESSAGES1, this.oceanEnd);
    }

    public onSendClick() {
        if (this._edit.string == "") {
            return;
        }

        switch (this._enterType) {
            case EnterType.ocean:
                this.onOceanInput();
                break;
            case EnterType.wolf:
                this.onWolfInput();
                break;
        }
        this.addBubble(true, this._edit.string);
    }

    private initUI() {
        let UI = cc.find("UI");
        console.log(UI);
        let edit = cc.find("editbox", UI);
        let button = cc.find("button", UI);
        let buttonWidth = 50;
        console.log(edit);
        edit.width = this._vX - buttonWidth;
        edit.height = this._commonHeight;
        edit.setPosition(cc.v2(-buttonWidth / 2, -this._vY / 2 + this._commonHeight / 2));
        this._edit = edit.getComponent(cc.EditBox);
        this._edit.enabled = false;

        button.width = buttonWidth;
        button.height = this._commonHeight;
        button.setPosition(cc.v2(this._vX / 2 - button.width /2, -this._vY / 2 + this._commonHeight / 2));
    }

    public addBubble(isMe, text) {
        let bubble = cc.instantiate(this.bubblePrefab);
        if (!isMe)
            bubble.getComponent("bubble").setOther();

        bubble.getComponent("bubble").setText(text);
        bubble.opacity = 0;
        this.node.addChild(bubble);
        if (!isMe) {
            bubble.x = (0 - this._vX / 2) + bubble.width / 2 + 10;
        } 
        else {
            bubble.x = this._vX / 2 - bubble.width / 2 - 10;
        }

        bubble.y = (this._vY / 2) - bubble.height / 2 - this.curHeight - this.heightBorder;
        this.curHeight += this.heightBorder + bubble.height;
        console.log(bubble.width, bubble.height, bubble.x, bubble.y, this.curHeight);
        bubble.runAction(cc.fadeIn(1.0));

        this.moveCamera();
    }

    private moveCamera() {
        let mainCamera = cc.find("Main Camera", this.node);
        console.log(this.curHeight, mainCamera.y, this._vY - this._commonHeight);
        if (this.curHeight + mainCamera.y > this._vY - this._commonHeight) {
            mainCamera.y = (this._vY - this._commonHeight - this.curHeight - this.heightBorder)
        }
    }

    private autoMessages(MESSAGES, endFunc) {
        let msgId = 0;
        let that = this;
        let fetchMessage = (dt)=> {
            console.log('fetch msg')
            if (msgId >= MESSAGES.length) {
                that.unschedule(fetchMessage);
                endFunc.call(that);
                return;
            }

            let msgObj = MESSAGES[msgId];
            that.addBubble(msgObj.isMe, msgObj.text);
            msgId += 1;
        }

        fetchMessage(0);

        this.schedule(fetchMessage, 2);
    }

    private oceanEnd() {
        this._edit.enabled = true;
        this._enterType = EnterType.ocean;
    }

    private onOceanInput() {
        let that = this;
        if (this._edit.string == "132") {
            this._edit.enabled = false;
            this._enterType = EnterType.normal;
            this.scheduleOnce((dt)=>{

                that.autoMessages(MESSAGES2, that.wolfEnd);
            }, 1)
        }
        else {
            this.scheduleOnce((dt)=>{
                that.addBubble(false, "回答错误，让小算盘转起来")
            }, 1)
        }
    }

    private onWolfInput() {
        let that = this;
        if (this._edit.string == "y") {
            this._edit.enabled = false;
            this._enterType = EnterType.normal;
            this.scheduleOnce((dt)=>{
                cc.director.preloadScene("Wolf", function () {
                    cc.director.loadScene("Wolf");
                }.bind(this));
            }, 1)
        }
        else {
            this.scheduleOnce((dt)=>{
                that.addBubble(false, "回答错误，还差一坑，快回复y")
            }, 1)
        }
    }

    private wolfEnd() {
        this._edit.enabled = true;
        this._enterType = EnterType.wolf;
    }
}
