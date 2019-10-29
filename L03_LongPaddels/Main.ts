namespace L03_LongPaddels {

    interface PressedKey {
        [code: string]: boolean;
    }

    import f = FudgeCore;
    export let viewport: f.Viewport;

    window.addEventListener("load", handleLoad);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    let ball: f.Node = new f.Node("Ball");
    let paddleLeft: f.Node = new f.Node("PaddleLeft");
    let paddleRight: f.Node = new f.Node("PaddleRight");

    let pressedKeys: PressedKey = {};


    function handleLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        f.RenderManager.initialize();
        f.Debug.log(canvas);

        let pong: f.Node = createPong();

        paddleLeft.cmpTransform.local.translateX(-17);
        (<f.ComponentMesh>paddleLeft.getComponent(f.ComponentMesh)).pivot.scaleY(6);
        paddleRight.cmpTransform.local.translateX(17);
        (<f.ComponentMesh>paddleRight.getComponent(f.ComponentMesh)).pivot.scaleY(6);

        //cameraa and viewport
        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(35);
        viewport = new f.Viewport();
        viewport.initialize("Viewport", pong, cmpCamera, canvas);
        f.Debug.log(viewport);

        f.Loop.addEventListener(f.EVENT.LOOP_FRAME, update);
        f.Loop.start();
    }

    function update(_event: Event): void {
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
        viewport.draw();
    }
 
    function createPong(): f.Node {

        let pong: f.Node = new f.Node("Pong");

        //mesh
        let mesh: f.MeshQuad = new f.MeshQuad();
        let cmpMesh: f.ComponentMesh = new f.ComponentMesh(mesh);
        let cmpMeshPaddleLeft: f.ComponentMesh = new f.ComponentMesh(mesh);
        let cmpMeshPaddleRight: f.ComponentMesh = new f.ComponentMesh(mesh);

        //material
        let mtrSolidWhite: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 1, 1, 1)));
        let cmpMaterialBall: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidWhite);
        let cmpMaterialPaddleLeft: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidWhite);
        let cmpMaterialPaddleRight: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidWhite);

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
    
    function handleKeyDown(_event: KeyboardEvent): void {
        pressedKeys[_event.code] = true;
        }

    function handleKeyUp(_event: KeyboardEvent): void {
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





}