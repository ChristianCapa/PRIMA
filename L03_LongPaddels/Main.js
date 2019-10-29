"use strict";
var L03_LongPaddels;
(function (L03_LongPaddels) {
    var f = FudgeCore;
    window.addEventListener("load", handleLoad);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    let ball = new f.Node("Ball");
    let paddleLeft = new f.Node("PaddleLeft");
    let paddleRight = new f.Node("PaddleRight");
    let pressedKeys = {};
    function handleLoad(_event) {
        const canvas = document.querySelector("canvas");
        f.RenderManager.initialize();
        f.Debug.log(canvas);
        let pong = createPong();
        paddleLeft.cmpTransform.local.translateX(-17);
        paddleLeft.getComponent(f.ComponentMesh).pivot.scaleY(6);
        paddleRight.cmpTransform.local.translateX(17);
        paddleRight.getComponent(f.ComponentMesh).pivot.scaleY(6);
        //cameraa and viewport
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(35);
        L03_LongPaddels.viewport = new f.Viewport();
        L03_LongPaddels.viewport.initialize("Viewport", pong, cmpCamera, canvas);
        f.Debug.log(L03_LongPaddels.viewport);
        f.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        f.Loop.start();
    }
    function update(_event) {
        f.Debug.log(pressedKeys);
        if (pressedKeys[f.KEYBOARD_CODE.W] == true) {
            paddleLeft.cmpTransform.local.translateY(0.3);
        }
        if (pressedKeys[f.KEYBOARD_CODE.S] == true) {
            paddleLeft.cmpTransform.local.translateY(-0.3);
        }
        if (pressedKeys[f.KEYBOARD_CODE.ARROW_UP] == true) {
            paddleRight.cmpTransform.local.translateY(0.3);
        }
        if (pressedKeys[f.KEYBOARD_CODE.ARROW_DOWN] == true) {
            paddleRight.cmpTransform.local.translateY(-0.3);
        }
        f.RenderManager.update();
        L03_LongPaddels.viewport.draw();
    }
    function createPong() {
        let pong = new f.Node("Pong");
        //mesh
        let mesh = new f.MeshQuad();
        let cmpMesh = new f.ComponentMesh(mesh);
        let cmpMeshPaddleLeft = new f.ComponentMesh(mesh);
        let cmpMeshPaddleRight = new f.ComponentMesh(mesh);
        //material
        let mtrSolidWhite = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 1, 1, 1)));
        let cmpMaterialBall = new f.ComponentMaterial(mtrSolidWhite);
        let cmpMaterialPaddleLeft = new f.ComponentMaterial(mtrSolidWhite);
        let cmpMaterialPaddleRight = new f.ComponentMaterial(mtrSolidWhite);
        //player1
        paddleLeft.addComponent(cmpMaterialPaddleLeft);
        paddleLeft.addComponent(cmpMeshPaddleLeft);
        paddleLeft.addComponent(new f.ComponentTransform());
        //player2
        paddleRight.addComponent(cmpMaterialPaddleRight);
        paddleRight.addComponent(cmpMeshPaddleRight);
        paddleRight.addComponent(new f.ComponentTransform());
        //ball
        ball.addComponent(cmpMesh);
        ball.addComponent(cmpMaterialBall);
        ball.addComponent(new f.ComponentTransform());
        //append objects to pong
        pong.appendChild(ball);
        pong.appendChild(paddleLeft);
        pong.appendChild(paddleRight);
        return pong;
    }
    function handleKeyDown(_event) {
        pressedKeys[_event.code] = true;
    }
    function handleKeyUp(_event) {
        pressedKeys[_event.code] = false;
    }
    //switch (event.code) {
    //    case f.KEYBOARD_CODE.W:
    //        paddleLeft.cmpTransform.local.translateY(1);
    //        break;
    //    case f.KEYBOARD_CODE.S:
    //        paddleLeft.cmpTransform.local.translateY(-1);
    //        break;
    //    case f.KEYBOARD_CODE.ARROW_UP:
    //        paddleRight.cmpTransform.local.translateY(1);
    //        break;
    //    case f.KEYBOARD_CODE.ARROW_DOWN:
    //        paddleRight.cmpTransform.local.translateY(-1);
    //        break;
})(L03_LongPaddels || (L03_LongPaddels = {}));
//# sourceMappingURL=Main.js.map