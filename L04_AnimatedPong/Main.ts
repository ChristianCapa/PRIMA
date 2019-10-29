namespace L04_PongAnimated {

    interface KeyPress {
        [code: string]: boolean;
    }
    
    import fudge = FudgeCore;
    let keysPressed: KeyPress = {};

    let pong: fudge.Node = new fudge.Node("Pong");

    let direction: fudge.Vector3;
    let randomX: number;
    let randomY: number;

    let canvasLength: number = 9;
    let canvasHeight: number = 7;

    window.addEventListener("load", handleLoad);
    export let viewport: fudge.Viewport;

    let ball: fudge.Node = new fudge.Node("Ball");
    let paddleLeft: fudge.Node = new fudge.Node("PaddleLeft");
    let paddleRight: fudge.Node = new fudge.Node("PaddleRight");

    function handleLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        fudge.RenderManager.initialize();
        fudge.Debug.log(canvas);

        let pong: fudge.Node = createPong();

        //camera
        let cmpCamera: fudge.ComponentCamera = new fudge.ComponentCamera();
        cmpCamera.pivot.translate(new fudge.Vector3(0, 0, 20));
        cmpCamera.pivot.lookAt(new fudge.Vector3(0, 0, 0));

        //positioning
        paddleRight.cmpTransform.local.translateX(9);
        paddleLeft.cmpTransform.local.translateX(-9);

        //scaling
        //paddleRight.cmpTransform.local.scaleY(5); --> verzerrt Koordinatensystem
        (<fudge.ComponentMesh>paddleRight.getComponent(fudge.ComponentMesh)).pivot.scaleY(5);
        (<fudge.ComponentMesh>paddleLeft.getComponent(fudge.ComponentMesh)).pivot.scaleY(5); //like "as"

        //ball
        randomX = getSign() * Math.random();
        randomY = getSign() * Math.random();
        direction = new fudge.Vector3(randomX, randomY, 0);

        //viewport
        viewport = new fudge.Viewport();
        viewport.initialize("Viewport", pong, cmpCamera, canvas);
        fudge.Debug.log(viewport);

        document.addEventListener("keydown", handleKeydown);
        document.addEventListener("keyup", handleKeyup);

        viewport.draw();

        // setInterval(handler, milliseconds);
        // requestAnimationFrame(handler);
        fudge.Loop.addEventListener(fudge.EVENT.LOOP_FRAME, update);
        fudge.Loop.start();
    }

    function update(_event: Event): void {
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

        if (ball.cmpTransform.local.translation.x > canvasLength || ball.cmpTransform.local.translation.x < - canvasLength) {
            randomX = - randomX;
            direction = new fudge.Vector3(randomX, randomY, 0);
        }

        if (ball.cmpTransform.local.translation.y > canvasHeight || ball.cmpTransform.local.translation.y < - canvasHeight) {
            randomY = - randomY;
            direction = new fudge.Vector3(randomX, randomY, 0);
        }

        fudge.RenderManager.update();
        viewport.draw();
    }

    function getSign(): number {
        return Math.random() < 0.5 ? -1 : 1;
    }

    function createPong(): fudge.Node {

        let meshQuad: fudge.MeshQuad = new fudge.MeshQuad();
        let mtrSolidWhite: fudge.Material = new fudge.Material("SolidWhite", fudge.ShaderUniColor, new fudge.CoatColored(new fudge.Color(1, 1, 1, 1)));

        let leftWall: fudge.Node = createWall("leftWall", meshQuad, mtrSolidWhite);
        let rightWall: fudge.Node = createWall("rightWall", meshQuad, mtrSolidWhite);
        let topWall: fudge.Node = createWall("topWall", meshQuad, mtrSolidWhite);
        let bottomWall: fudge.Node = createWall("bottomWall", meshQuad, mtrSolidWhite);

        leftWall.cmpTransform.local.translateX(canvasLength / 2 - canvasLength / 2);
        rightWall.cmpTransform.local.translateX(canvasLength / 2 + canvasLength / 2);
        topWall.cmpTransform.local.translateX(canvasHeight / 2 + canvasHeight / 2);
        bottomWall.cmpTransform.local.translateX(canvasHeight / 2 - canvasHeight / 2);

        leftWall.cmpTransform.local.translateX(canvasLength / 2 - canvasLength / 2);
        rightWall.cmpTransform.local.translateX(canvasLength / 2 + canvasLength / 2);
        topWall.cmpTransform.local.translateX(canvasHeight / 2 + canvasHeight / 2);
        bottomWall.cmpTransform.local.translateX(canvasHeight / 2 - canvasHeight / 2);

        //ball
        let cmpMeshBall: fudge.ComponentMesh = new fudge.ComponentMesh(meshQuad);
        let cmpMaterialBall: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidWhite);

        ball.addComponent(cmpMeshBall);
        ball.addComponent(cmpMaterialBall);
        ball.addComponent(new fudge.ComponentTransform());

        //paddleLeft
        let cmpMeshPadddleLeft: fudge.ComponentMesh = new fudge.ComponentMesh(meshQuad);
        let cmpMaterialPaddleLeft: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidWhite);

        paddleLeft.addComponent(cmpMeshPadddleLeft);
        paddleLeft.addComponent(cmpMaterialPaddleLeft);
        paddleLeft.addComponent(new fudge.ComponentTransform());

        //paddleRight
        let cmpMeshPaddleRight: fudge.ComponentMesh = new fudge.ComponentMesh(meshQuad);
        let cmpMaterialPaddleRight: fudge.ComponentMaterial = new fudge.ComponentMaterial(mtrSolidWhite);

        paddleRight.addComponent(cmpMeshPaddleRight);
        paddleRight.addComponent(cmpMaterialPaddleRight);
        paddleRight.addComponent(new fudge.ComponentTransform());

        //append children
        pong.appendChild(ball);
        pong.appendChild(paddleLeft);
        pong.appendChild(paddleRight);

        return pong;
    }

    function handleKeyup(_event: KeyboardEvent): void {
        keysPressed[_event.code] = false;
    }

    function handleKeydown(_event: KeyboardEvent): void {
        keysPressed[_event.code] = true;
    }

    function detectHit(_position: fudge.Vector3, _mtxBox: fudge.Matrix4x4): boolean {
        let posBox: fudge.Vector3 = _mtxBox.translation;
        let sclBox: fudge.Vector3 = _mtxBox.scaling;
        let topLeft: fudge.Vector3 = posBox.add(new)
        let bottomRight: fudge.Vector3
    }

    function createWall(name: string, mesh: fudge.MeshQuad, material: fudge.Material): fudge.Node {
        let wall: fudge.Node = new fudge.Node(name);

        let cmpMaterial: fudge.ComponentMaterial = new fudge.ComponentMaterial(material);
        let cmpMesh: fudge.ComponentMesh = new fudge.ComponentMesh(mesh);

        wall.addComponent(cmpMaterial);
        wall.addComponent(cmpMesh);
        wall.addComponent(new fudge.ComponentTransform);

        pong.appendChild(wall);

        return wall;
    }

}

