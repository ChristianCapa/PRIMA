"use strict";
var L02_FirstFudge;
(function (L02_FirstFudge) {
    var f = FudgeCore;
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        const canvas = document.querySelector("canvas");
        f.RenderManager.initialize();
        f.Debug.log(canvas);
        //nodes
        let parentNode = new f.Node("ParentNode");
        let node = new f.Node("Ball");
        let nodePlayer1 = new f.Node("Player1");
        let nodePlayer2 = new f.Node("Player2");
        //mesh
        let mesh = new f.MeshQuad();
        let cmpMesh = new f.ComponentMesh(mesh);
        let cmpMeshPlayer1 = new f.ComponentMesh(mesh);
        let cmpMeshPlayer2 = new f.ComponentMesh(mesh);
        //material
        let mtrSolidWhite = new f.Material("SolidWhite", f.ShaderUniColor, new f.CoatColored(new f.Color(1, 1, 1, 1)));
        let cmpMaterial = new f.ComponentMaterial(mtrSolidWhite);
        let cmpMaterialPlayer1 = new f.ComponentMaterial(mtrSolidWhite);
        let cmpMaterialPlayer2 = new f.ComponentMaterial(mtrSolidWhite);
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
        let cmpCamera = new f.ComponentCamera();
        cmpCamera.pivot.translateZ(35);
        L02_FirstFudge.viewport = new f.Viewport();
        L02_FirstFudge.viewport.initialize("Viewport", parentNode, cmpCamera, canvas);
        f.Debug.log(L02_FirstFudge.viewport);
        L02_FirstFudge.viewport.draw();
    }
})(L02_FirstFudge || (L02_FirstFudge = {}));
//# sourceMappingURL=Main.js.map