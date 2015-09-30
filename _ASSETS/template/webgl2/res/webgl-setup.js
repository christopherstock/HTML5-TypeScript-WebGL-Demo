
    /***************************************************************************
    *   Fills the buffer with the values that define a letter 'F'.
    *
    *   @param gl
    ***************************************************************************/
    function setGeometry(gl)
    {
        var positions = new Float32Array(
        [
            // left column front
            0,   0,  0,
            0, 150,  0,
            30,   0,  0,
            0, 150,  0,
            30, 150,  0,
            30,   0,  0,

            // top rung front
            30,   0,  0,
            30,  30,  0,
            100,   0,  0,
            30,  30,  0,
            100,  30,  0,
            100,   0,  0,

            // middle rung front
            30,  60,  0,
            30,  90,  0,
            67,  60,  0,
            30,  90,  0,
            67,  90,  0,
            67,  60,  0,

            // left column back
            0,   0,  30,
            30,   0,  30,
            0, 150,  30,
            0, 150,  30,
            30,   0,  30,
            30, 150,  30,

            // top rung back
            30,   0,  30,
            100,   0,  30,
            30,  30,  30,
            30,  30,  30,
            100,   0,  30,
            100,  30,  30,

            // middle rung back
            30,  60,  30,
            67,  60,  30,
            30,  90,  30,
            30,  90,  30,
            67,  60,  30,
            67,  90,  30,

            // top
            0,   0,   0,
            100,   0,   0,
            100,   0,  30,
            0,   0,   0,
            100,   0,  30,
            0,   0,  30,

            // top rung front
            100,   0,   0,
            100,  30,   0,
            100,  30,  30,
            100,   0,   0,
            100,  30,  30,
            100,   0,  30,

            // under top rung
            30,   30,   0,
            30,   30,  30,
            100,  30,  30,
            30,   30,   0,
            100,  30,  30,
            100,  30,   0,

            // between top rung and middle
            30,   30,   0,
            30,   60,  30,
            30,   30,  30,
            30,   30,   0,
            30,   60,   0,
            30,   60,  30,

            // top of middle rung
            30,   60,   0,
            67,   60,  30,
            30,   60,  30,
            30,   60,   0,
            67,   60,   0,
            67,   60,  30,

            // front of middle rung
            67,   60,   0,
            67,   90,  30,
            67,   60,  30,
            67,   60,   0,
            67,   90,   0,
            67,   90,  30,

            // bottom of middle rung.
            30,   90,   0,
            30,   90,  30,
            67,   90,  30,
            30,   90,   0,
            67,   90,  30,
            67,   90,   0,

            // front of bottom
            30,   90,   0,
            30,  150,  30,
            30,   90,  30,
            30,   90,   0,
            30,  150,   0,
            30,  150,  30,

            // bottom
            0,   150,   0,
            0,   150,  30,
            30,  150,  30,
            0,   150,   0,
            30,  150,  30,
            30,  150,   0,

            // left side
            0,   0,   0,
            0,   0,  30,
            0, 150,  30,
            0,   0,   0,
            0, 150,  30,
            0, 150,   0
        ]);

        // Center the F around the origin and Flip it around. We do this because
        // we're in 3D now with and +Y is up where as before when we started with 2D
        // we had +Y as down.

        // We could do by changing all the values above but I'm lazy.
        // We could also do it with a matrix at draw time but you should
        // never do stuff at draw time if you can do it at init time.
        var matrix = makeTranslation(-50, -75, -15);
        matrix = matrixMultiply(matrix, makeXRotation(Math.PI));

        for (var ii = 0; ii < positions.length; ii += 3)
        {
            var vector = matrixVectorMultiply([positions[ii + 0], positions[ii + 1], positions[ii + 2], 1], matrix);
            positions[ii + 0] = vector[0];
            positions[ii + 1] = vector[1];
            positions[ii + 2] = vector[2];
        }

        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    }

    /***************************************************************************
    *   Fills the buffer with texture coordinates the F.
    *
    *   @param gl
    ***************************************************************************/
    function setTexcoords(gl)
    {
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(
            [
                // left column front
                0, 0,
                0, 1,
                1, 0,
                0, 1,
                1, 1,
                1, 0,

                // top rung front
                0, 0,
                0, 1,
                1, 0,
                0, 1,
                1, 1,
                1, 0,

                // middle rung front
                0, 0,
                0, 1,
                1, 0,
                0, 1,
                1, 1,
                1, 0,

                // left column back
                0, 0,
                1, 0,
                0, 1,
                0, 1,
                1, 0,
                1, 1,

                // top rung back
                0, 0,
                1, 0,
                0, 1,
                0, 1,
                1, 0,
                1, 1,

                // middle rung back
                0, 0,
                1, 0,
                0, 1,
                0, 1,
                1, 0,
                1, 1,

                // top
                0, 0,
                1, 0,
                1, 1,
                0, 0,
                1, 1,
                0, 1,

                // top rung front
                0, 0,
                1, 0,
                1, 1,
                0, 0,
                1, 1,
                0, 1,

                // under top rung
                0, 0,
                0, 1,
                1, 1,
                0, 0,
                1, 1,
                1, 0,

                // between top rung and middle
                0, 0,
                1, 1,
                0, 1,
                0, 0,
                1, 0,
                1, 1,

                // top of middle rung
                0, 0,
                1, 1,
                0, 1,
                0, 0,
                1, 0,
                1, 1,

                // front of middle rung
                0, 0,
                1, 1,
                0, 1,
                0, 0,
                1, 0,
                1, 1,

                // bottom of middle rung.
                0, 0,
                0, 1,
                1, 1,
                0, 0,
                1, 1,
                1, 0,

                // front of bottom
                0, 0,
                1, 1,
                0, 1,
                0, 0,
                1, 0,
                1, 1,

                // bottom
                0, 0,
                0, 1,
                1, 1,
                0, 0,
                1, 1,
                1, 0,

                // left side
                0, 0,
                0, 1,
                1, 1,
                0, 0,
                1, 1,
                1, 0
            ]),
            gl.STATIC_DRAW
        );
    }
