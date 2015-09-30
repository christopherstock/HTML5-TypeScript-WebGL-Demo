
    var canvas;
    var gl;
    var program;
    var positionLocation;
    var texcoordLocation;
    var matrixLocation;
    var texture;
    var modelXRotationRadians;
    var modelYRotationRadians;
    var fieldOfViewRadians;
    var transX = 0;
    var transY = 0;
    var transZ = 0;

    function rockNRoll()
    {
        // Get A WebGL context
        canvas = document.getElementById("canvas");
        gl = getWebGLContext(canvas);
        if (!gl) {
            return;
        }

        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);

        // setup GLSL program
        program = createProgramFromScripts(gl, ["3d-vertex-shader", "3d-fragment-shader"]);
        gl.useProgram(program);

        // look up where the vertex data needs to go.
        positionLocation = gl.getAttribLocation(program, "a_position");
        texcoordLocation = gl.getAttribLocation(program, "a_texcoord");

        // lookup uniforms
        matrixLocation = gl.getUniformLocation(program, "u_matrix");

        // Create a buffer.
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

        // Set Geometry.
        setGeometry(gl);

        // Create a buffer for texcoords.
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.enableVertexAttribArray(texcoordLocation);

        // We'll supply texcoords as floats.
        gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);

        // Set Texcoords.
        setTexcoords(gl);

        // Create a texture.
        texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        // Fill the texture with a 1x1 blue pixel.
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
          new Uint8Array([0, 0, 255, 255]));
        // Asynchronously load an image
        var image = new Image();
        image.src = "res/f-texture.png";
        image.addEventListener(
            'load',
            function()
            {
                // Now that the image has loaded make copy it to the texture.
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image);
                gl.generateMipmap(gl.TEXTURE_2D);
            }
        );

        fieldOfViewRadians    = degToRad(60);
        modelXRotationRadians = degToRad(0);
        modelYRotationRadians = degToRad(0);

        tick();
    }

    function drawScene()
    {
        var rotationSpeed = 0.1;

        // Animate the rotation
        modelXRotationRadians += 1.2 * rotationSpeed;
        modelYRotationRadians += 0.7 * rotationSpeed;

        // Clear the canvas AND the depth buffer.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Compute the projection matrix
        var aspect = canvas.clientWidth / canvas.clientHeight;
        var projectionMatrix = makePerspective(fieldOfViewRadians, aspect, 1, 2000);

        var cameraPosition = [0, 0, 200];
        var up = [0, 1, 0];
        var target = [0, 0, 0];

        // Compute the camera's matrix using look at.
        var cameraMatrix = makeLookAt(cameraPosition, target, up);

        // Make a view matrix from the camera matrix.
        var viewMatrix = makeInverse(cameraMatrix);

        var translationMatrix = makeTranslation(
            transX,
            transY,
            transZ
        );

        var xRotationMatrix   = makeXRotation(modelXRotationRadians);
        var yRotationMatrix   = makeYRotation(modelYRotationRadians);

        // Multiply the matrices.
        var matrix = yRotationMatrix;
        matrix = matrixMultiply(matrix, xRotationMatrix);
        matrix = matrixMultiply(matrix, translationMatrix);
        matrix = matrixMultiply(matrix, viewMatrix);
        matrix = matrixMultiply(matrix, projectionMatrix);

        // Set the matrix.
        gl.uniformMatrix4fv(matrixLocation, false, matrix);

        // Draw the geometry.
        gl.drawArrays(gl.TRIANGLES, 0, 16 * 6);
    }

    function tick()
    {
        //console.log( "tick() being invoked" );

        drawScene();

        window.setTimeout( tick, 25 );
    }
