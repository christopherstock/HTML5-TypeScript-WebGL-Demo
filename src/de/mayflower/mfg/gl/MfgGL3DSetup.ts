
    /*****************************************************************************
    *   Initialized all geometry and texture-coordingates that should be drawn.
    *
    *   @author     Christopher Stock
    *   @version    0.0.2
    *****************************************************************************/
    class MfgGame3DSetup
    {
        /*****************************************************************************
        *   Fills the buffer with the values that define the shape.
        *****************************************************************************/
        public static setPositions( gl:WebGLRenderingContext, program:WebGLProgram, meshes:Array<LibMesh> )
        {
            var buffer = gl.createBuffer();
            gl.bindBuffer( WebGLRenderingContext.ARRAY_BUFFER, buffer );

            var positionLocation:number = gl.getAttribLocation( program, "a_position" );
            gl.enableVertexAttribArray( positionLocation );
            gl.vertexAttribPointer( positionLocation, 3, WebGLRenderingContext.FLOAT, false, 0, 0 );

            var co:Array<number> = [];
            for ( var i = 0; i < meshes.length; ++i )
            {
                var mesh:LibMesh = meshes[ i ];

                for ( var j = 0; j < mesh.faces.length; ++j )
                {
                    co.push( mesh.faces[ j ].a.x );
                    co.push( mesh.faces[ j ].a.y );
                    co.push( mesh.faces[ j ].a.z );

                    co.push( mesh.faces[ j ].b.x );
                    co.push( mesh.faces[ j ].b.y );
                    co.push( mesh.faces[ j ].b.z );

                    co.push( mesh.faces[ j ].c.x );
                    co.push( mesh.faces[ j ].c.y );
                    co.push( mesh.faces[ j ].c.z );
                }
            }

            var performInitialTransformations:boolean = true;
            if ( performInitialTransformations )
            {
                co = MfgGame3DSetup.performInitialPositionTransformations(co);
            }

            var coF32:Float32Array = new Float32Array( co );
            gl.bufferData( WebGLRenderingContext.ARRAY_BUFFER, coF32, WebGLRenderingContext.STATIC_DRAW );
        }

        /*****************************************************************************
        *   Fills the buffer with texture coordinates.
        *****************************************************************************/
        public static setTexcoords( gl:WebGLRenderingContext, program:WebGLProgram, meshes:Array<LibMesh> )
        {
            var buffer = gl.createBuffer();
            gl.bindBuffer( WebGLRenderingContext.ARRAY_BUFFER, buffer );

            var texcoordLocation:number = gl.getAttribLocation( program, "a_texcoord" );
            gl.enableVertexAttribArray( texcoordLocation );
            gl.vertexAttribPointer( texcoordLocation, 2, WebGLRenderingContext.FLOAT, false, 0, 0 );

            var co:Array<number> = [];
            for ( var i = 0; i < meshes.length; ++i )
            {
                var mesh:LibMesh = meshes[ i ];

                for ( var j = 0; j < mesh.faces.length; ++j )
                {
                    co.push( mesh.faces[ j ].a.u );
                    co.push( mesh.faces[ j ].a.v );

                    co.push( mesh.faces[ j ].b.u );
                    co.push( mesh.faces[ j ].b.v );

                    co.push( mesh.faces[ j ].c.u );
                    co.push( mesh.faces[ j ].c.v );
                }
            }

            var texCoords:Float32Array = new Float32Array( co );
            gl.bufferData( WebGLRenderingContext.ARRAY_BUFFER, texCoords, WebGLRenderingContext.STATIC_DRAW );
        }

        /*****************************************************************************
        *   Performs all initial transformations on all position coordinates.
        *
        *   @param  co  All position coordinates to transform.
        *   @return     All transformed position coordinates.
        *****************************************************************************/
        public static performInitialPositionTransformations( co:Array<number> )
        {
            var co2:Array<number> = [];

            // Center the F around the origin and Flip it around. We do this because we're in 3D now
            // and +Y is up where as before when we started with 2D we had +Y as down.
            var matrix:Float32Array = LibMatrix.createTranslationMatrix( 0, 0, 1 );
            matrix = LibMatrix.multiplyMatrices( matrix, LibMatrix.createXRotationMatrix( 180.0 ) );

            for ( var i = 0; i < co.length; i += 3 )
            {
                var vector = LibMatrix.matrixVectorMultiply(
                    new Float32Array(
                        [
                            co[ i + 0 ],
                            co[ i + 1 ],
                            co[ i + 2 ],
                            1
                        ]
                    ),
                    matrix
                );
                co2[ i + 0 ] = vector[ 0 ];
                co2[ i + 1 ] = vector[ 1 ];
                co2[ i + 2 ] = vector[ 2 ];
            }

            return co2;
        }
    }
