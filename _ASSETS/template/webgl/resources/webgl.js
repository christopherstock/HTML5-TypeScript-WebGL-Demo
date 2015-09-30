
    function updatePosition(index)
    {
        return function(event, ui)
        {
            translation[index] = ui.value;
            drawScene();
        }
    }

    function updateRotation(index)
    {
        return function(event, ui)
        {
            var angleInDegrees = ui.value;
            var angleInRadians = angleInDegrees * Math.PI / 180;
            rotation[index] = angleInRadians;
            drawScene();
        }
    }

    function updateScale(index)
    {
        return function(event, ui)
        {
            scale[index] = ui.value;
            drawScene();
        }
    }

    function rockNRoll()
    {
        // Get A WebGL context
        var canvas = document.getElementById("canvas");
        var gl = getWebGLContext(canvas);
        if (!gl) {
        return;
        }

        gl.enable(gl.CULL_FACE);
        gl.enable(gl.DEPTH_TEST);

        // setup GLSL program
        var program = createProgramFromScripts(gl, ["3d-vertex-shader", "3d-fragment-shader"]);
        gl.useProgram(program);

        // look up where the vertex data needs to go.
        var positionLocation = gl.getAttribLocation(program, "a_position");
        var colorLocation = gl.getAttribLocation(program, "a_color");

        // lookup uniforms
        var matrixLocation = gl.getUniformLocation(program, "u_matrix");

        // Create a buffer.
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

        // Set Geometry.
        setGeometry(gl);

        // Create a buffer for colors.
        var buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.enableVertexAttribArray(colorLocation);

        // We'll supply RGB as bytes.
        gl.vertexAttribPointer(colorLocation, 3, gl.UNSIGNED_BYTE, true, 0, 0);

        // Set Colors.
        setColors(gl);

        var translation = [45, 150, 0];
        var rotation = [degToRad(40), degToRad(25), degToRad(325)];
        var scale = [1, 1, 1];

        drawScene();

        // Draw the scene.
        function drawScene()
        {
            // Clear the canvas AND the depth buffer.
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            // Compute the matrices
            var projectionMatrix =
            make2DProjection(canvas.clientWidth, canvas.clientHeight, 400);
            var translationMatrix =
            makeTranslation(translation[0], translation[1], translation[2]);
            var rotationXMatrix = makeXRotation(rotation[0]);
            var rotationYMatrix = makeYRotation(rotation[1]);
            var rotationZMatrix = makeZRotation(rotation[2]);
            var scaleMatrix = makeScale(scale[0], scale[1], scale[2]);

            // Multiply the matrices.
            var matrix = matrixMultiply(scaleMatrix, rotationZMatrix);
            matrix = matrixMultiply(matrix, rotationYMatrix);
            matrix = matrixMultiply(matrix, rotationXMatrix);
            matrix = matrixMultiply(matrix, translationMatrix);
            matrix = matrixMultiply(matrix, projectionMatrix);

            // Set the matrix.
            gl.uniformMatrix4fv(matrixLocation, false, matrix);

            // Draw the geometry.
            gl.drawArrays(gl.TRIANGLES, 0, 16 * 6);
        }
    }
