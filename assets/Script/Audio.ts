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

    @property(cc.AudioClip)
    audio: cc.AudioClip = null;
    private bgMusicChannel = null;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    onLoad () {
        cc.game.addPersistRootNode(this.node);
    }

    private playBgMusic() {
        this.bgMusicChannel = cc.audioEngine.play(this.audio, true, 0.5)
    }
 
    private stopBgMusic() {        
        if (this.bgMusicChannel !== undefined) {
            cc.audioEngine.stop(this.bgMusicChannel);            
            this.bgMusicChannel = undefined;
        }
    }
    // update (dt) {}
}
