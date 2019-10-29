namespace L02_FirstFudge {
    import f = FudgeCore;

    window.addEventListener("load", handleLoad);

    //document.addEventListener("keyup", playerMove);
    // function playerMove(_event: Event):void
    // {
    //     if (_event == "ArrowUp") playerSpriteX += 10
    //     else if (_event.code === "ArrowDown") playerSpriteX -= 10
    //     document.getElementById('test').innerHTML = 'playerSpriteX = ' + playerSpriteX;
    // }


    export let viewport: f.Viewport;

    function handleLoad(_event: Event): void {
        const canvas: HTMLCanvasElement = document.querySelector("canvas");
        f.RenderManager.initialize();
        f.Debug.log(canvas);

        //nodes
        let parentNode: f.Node = new f.Node("ParentNode")
        let node: f.Node = new f.Node("Ball");
        let nodePlayer1: f.Node = new f.Node("Player1");
        let nodePlayer2: f.Node = new f.Node("Player2");

        //mesh
        let mesh: f.MeshQuad = new f.MeshQuad();
        let cmpMesh: f.ComponentMesh = new f.ComponentMesh(mesh);
        let cmpMeshPlayer1: f.ComponentMesh = new f.ComponentMesh(mesh);
        let cmpMeshPlayer2: f.ComponentMesh = new f.ComponentMesh(mesh);

        //material
        let mtrSolidWhite: f.Material = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 1, 1, 1)));
        let cmpMaterial: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidWhite);
        let cmpMaterialPlayer1: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidWhite);
        let cmpMaterialPlayer2: f.ComponentMaterial = new f.ComponentMaterial(mtrSolidWhite);

        //cmpP1
        cmpMeshPlayer1.pivot.translateX(-16);
        cmpMeshPlayer1.pivot.scaleY(8);

        //cmpP2
        cmpMeshPlayer2.pivot.translateX(16);
        cmpMeshPlayer2.pivot.scaleY(8);

        //ball
        node.addComponent(cmpMesh);
        node.addComponent(cmpMaterial);

        //player1
        nodePlayer1.addComponent(cmpMaterialPlayer1);
        nodePlayer2.addComponent(cmpMaterialPlayer2);

        //player2
        nodePlayer1.addComponent(cmpMeshPlayer1);
        nodePlayer2.addComponent(cmpMeshPlayer2);

        //append children to parent
        parentNode.appendChild(node);
        parentNode.appendChild(nodePlayer1);
        parentNode.appendChild(nodePlayer2);

        //camera
        let cmpCamera: f.ComponentCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(35);

        viewport = new f.Viewport();
        viewport.initialize("Viewport", parentNode, cmpCamera, canvas);
        f.Debug.log(viewport);

        viewport.draw();
    }    
}