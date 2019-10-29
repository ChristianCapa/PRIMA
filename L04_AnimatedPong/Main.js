"use strict";
var L04_PongAnimated;
(function (L04_PongAnimated) {
    var fudge = FudgeCore;
    let keysPressed = {};
    let pong = new fudge.Node("Pong");
    let direction;
    let randomX;
    let randomY;
    let canvasLength = 9;
    let canvasHeight = 7;
    window.addEventListener("load", handleLoad);
    let ball = new fudge.Node("Ball");
    let paddleLeft = new fudge.Node("PaddleLeft");
    let paddleRight = new fudge.Node("PaddleRight");
    function handleLoad(_event) {
        const canvas = document.querySelector("canvas");
        fudge.RenderManager.initialize();
        fudge.Debug.log(canvas);
        let pong = createPong();
        //camera
        let cmpCamera = new fudge.ComponentCamera();
        cmpCamera.pivot.translate(new fudge.Vector3(0, 0, 20));
        cmpCamera.pivot.lookAt(new fudge.Vector3(0, 0, 0));
        //positioning
        paddleRight.cmpTransform.local.translateX(9);
        paddleLeft.cmpTransform.local.translateX(-9);
        //scaling
        //paddleRight.cmpTransform.local.scaleY(5); --> verzerrt Koordinatensystem
        paddleRight.getComponent(fudge.ComponentMesh).pivot.scaleY(5);
        paddleLeft.getComponent(fudge.ComponentMesh).pivot.scaleY(5); //like "as"
        //ball
        randomX = getSign() * Math.random();
        randomY = getSign() * Math.random();
        direction = new fudge.Vector3(randomX, randomY, 0);
        //viewport
        L04_PongAnimated.viewport = new fudge.Viewport();
        L04_PongAnimated.viewport.initialize("Viewport", pong, cmpCamera, canvas);
        fudge.Debug.log(L04_PongAnimated.viewport);
        document.addEventListener("keydown", handleKeydown);
        document.addEventListener("keyup", handleKeyup);
        L04_PongAnimated.viewport.draw();
        // setInterval(handler, milliseconds);
        // requestAnimationFrame(handler);
        fudge.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
        fudge.Loop.start();
    }
    function update(_event) {
        //fudge.Debug.log(keysPressed);
        if (keysPressed[fudge.KEYBOARD_CODE.W] == true) {
            paddleLeft.cmpTransform.local.translateY(0.3);
        }
        if (keysPressed[fudge.KEYBOARD_CODE.S] == true) {
            paddleLeft.cmpTransform.local.translateY(-0.3);
        }
        if (keysPressed[fudge.KEYBOARD_CODE.ARROW_UP] == true) {
            paddleRight.cmpTransform.local.translateY(0.3);
        }
        if (keysPressed[fudge.KEYBOARD_CODE.ARROW_DOWN] == true) {
            paddleRight.cmpTransform.local.translateY(-0.3);
        }
        ball.cmpTransform.local.translate(direction);
        if (ball.cmpTransform.local.translation.x > canvasLength || ball.cmpTransform.local.translation.x < -canvasLength) {
            randomX = -randomX;
            direction = new fudge.Vector3(randomX, randomY, 0);
        }
        if (ball.cmpTransform.local.translation.y > canvasHeight || ball.cmpTransform.local.translation.y < -canvasHeight) {
            randomY = -randomY;
            direction = new fudge.Vector3(randomX, randomY, 0);
        }
        fudge.RenderManager.update();
        L04_PongAnimated.viewport.draw();
    }
    function getSign() {
        return Math.random() < 0.5 ? -1 : 1;
    }
    function createPong() {
        let meshQuad = new fudge.MeshQuad();
        let mtrSolidWhite = new fudge.Material("SolidWhite", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 1, 1, 1)));
        let leftWall = createWall("leftWall", meshQuad, mtrSolidWhite);
        let rightWall = createWall("rightWall", meshQuad, mtrSolidWhite);
        let topWall = createWall("topWall", meshQuad, mtrSolidWhite);
        let bottomWall = createWall("bottomWall", meshQuad, mtrSolidWhite);
        leftWall.cmpTransform.local.translateX(canvasLength / 2 - canvasLength / 2);
        rightWall.cmpTransform.local.translateX(canvasLength / 2 + canvasLength / 2);
        topWall.cmpTransform.local.translateX(canvasHeight / 2 + canvasHeight / 2);
        bottomWall.cmpTransform.local.translateX(canvasHeight / 2 - canvasHeight / 2);
        leftWall.cmpTransform.local.translateX(canvasLength / 2 - canvasLength / 2);
        rightWall.cmpTransform.local.translateX(canvasLength / 2 + canvasLength / 2);
        topWall.cmpTransform.local.translateX(canvasHeight / 2 + canvasHeight / 2);
        bottomWall.cmpTransform.local.translateX(canvasHeight / 2 - canvasHeight / 2);
        //ball
        let cmpMeshBall = new fudge.ComponentMesh(meshQuad);
        let cmpMaterialBall = new fudge.ComponentMaterial(mtrSolidWhite);
        ball.addComponent(cmpMeshBall);
        ball.addComponent(cmpMaterialBall);
        ball.addComponent(new fudge.ComponentTransform());
        //paddleLeft
        let cmpMeshPadddleLeft = new fudge.ComponentMesh(meshQuad);
        let cmpMaterialPaddleLeft = new fudge.ComponentMaterial(mtrSolidWhite);
        paddleLeft.addComponent(cmpMeshPadddleLeft);
        paddleLeft.addComponent(cmpMaterialPaddleLeft);
        paddleLeft.addComponent(new fudge.ComponentTransform());
        //paddleRight
        let cmpMeshPaddleRight = new fudge.ComponentMesh(meshQuad);
        let cmpMaterialPaddleRight = new fudge.ComponentMaterial(mtrSolidWhite);
        paddleRight.addComponent(cmpMeshPaddleRight);
        paddleRight.addComponent(cmpMaterialPaddleRight);
        paddleRight.addComponent(new fudge.ComponentTransform());
        //append children
        pong.appendChild(ball);
        pong.appendChild(paddleLeft);
        pong.appendChild(paddleRight);
        return pong;
    }
    function handleKeyup(_event) {
        keysPressed[_event.code] = false;
    }
    function handleKeydown(_event) {
        keysPressed[_event.code] = true;
    }
    function detectHit(_position, _mtxBox) {
        let posBox = _mtxBox.translation;
        let sclBox = _mtxBox.scaling;
        let topLeft = posBox.add(new );
        let bottomRight;
    }
    function createWall(name, mesh, material) {
        let wall = new fudge.Node(name);
        let cmpMaterial = new fudge.ComponentMaterial(material);
        let cmpMesh = new fudge.ComponentMesh(mesh);
        wall.addComponent(cmpMaterial);
        wall.addComponent(cmpMesh);
        wall.addComponent(new fudge.ComponentTransform);
        pong.appendChild(wall);
        return wall;
    }
})(L04_PongAnimated || (L04_PongAnimated = {}));
//# sourceMappingURL=Main.js.map