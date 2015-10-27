
    /*****************************************************************************
    *   Manages the 3D logic for the WebGL context.
    *
    *   @author     Christopher Stock
    *   @version    0.0.2
    *****************************************************************************/
    class MfgGL3D
    {
        /** The OpenGL context. */
        private                 gl                              :WebGLRenderingContext      = null;
        /** The OpenGL program. */
        private                 program                         :WebGLProgram               = null;
        /** The matrix location position. */
        private                 matrixLocation                  :WebGLUniformLocation       = null;

        /** All ortho bg meshes. */
        private                 meshesOrthoBg                   :Array<LibMesh>             = null;
        /** All 3D meshes. */
        private                 meshes3D                        :Array<LibMesh>             = null;
        /** All ortho fgmeshes. */
        private                 meshesOrthoFg                   :Array<LibMesh>             = null;

        /** The current drawing index for all faces to draw. Prune this sooner or later..! */
        private                 faceDrawingIndex                :number                     = 0;
        /** Just a temporary test. */
        private                 testCreateAllTextures           :boolean                    = true;

        /*****************************************************************************
        *   Inits the 3D context and scene.
        *
        *   @param  gl              The GL context.
        *   @param  meshes          All 3D meshes to draw.
        *   @param  orthoMeshesFg   All orthographic meshes to draw in the fg.
        *****************************************************************************/
        constructor
        (
            gl:WebGLRenderingContext,
            meshes:Array<LibMesh>,
            orthoMeshesFg:Array<LibMesh>
        )
        {
            this.gl             = gl;
            this.meshes3D       = meshes;
            this.meshesOrthoFg  = orthoMeshesFg;

            //setup GLSL program and get uniform lookup matrix
            this.program        = LibGL.createProgramFromScripts( this.gl, [ "3d-vertex-shader", "3d-fragment-shader" ] );
            this.gl.useProgram( this.program );
            this.matrixLocation = this.gl.getUniformLocation( this.program, "u_matrix" );

            //set the viewport relation
            this.gl.viewport(   0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight                   );
            //enable depth testing
            this.gl.enable(     WebGLRenderingContext.DEPTH_TEST                                                );
            //enable depth calculation functionality
            this.gl.depthFunc(  WebGLRenderingContext.LEQUAL                                                    );
            //enable cull facing
            this.gl.enable(     WebGLRenderingContext.CULL_FACE                                                 );
            //clear the viewport after setting MF Orange as the clear color
            this.gl.clearColor( 0.1, 0.1, 0.1, 1.0                                                              );
        }

        /*****************************************************************************
        *   Renders the 3D scene.
        *****************************************************************************/
        public render()
        {
            this.updateBackgroundMeshes();
        }

        /*****************************************************************************
        *   Draws the 3D scene.
        *****************************************************************************/
        public draw()
        {
            //clear canvas3D and depth buffer
            this.gl.clear( WebGLRenderingContext.COLOR_BUFFER_BIT|WebGLRenderingContext.DEPTH_BUFFER_BIT );

            //reset drawing index and meshes to draw
            this.setAllMeshes();
            this.faceDrawingIndex = 0;

            //draw 2D
            this.draw2D( this.meshesOrthoBg );

            //draw 3D
            this.draw3D();

            //draw 2D
            this.draw2D( this.meshesOrthoFg );

            this.testCreateAllTextures = false;
        }

        /*****************************************************************************
        *   Updates the mesh pipeline to draw.
        *****************************************************************************/
        private setAllMeshes()
        {
            var allMeshes = [].concat( this.meshesOrthoBg ).concat( this.meshes3D ).concat( this.meshesOrthoFg );

            MfgGame3DSetup.setPositions( this.gl, this.program, allMeshes );
            MfgGame3DSetup.setTexcoords( this.gl, this.program, allMeshes );
        }


        /*****************************************************************************
        *   Translates the background so it is adjusted to the player's rotation Y.
        *****************************************************************************/
        private updateBackgroundMeshes()
        {
            //console.log( "> " + this.rot.y );
            //var ratio = ( 1.0 / this.rot.y );

            var widthU  = MfgSettings.CANVAS_WIDTH / MfgInit.imageSystem.getImage( MfgImage.ORTHO_BG_LANDSCAPE ).width;

            var offsetU = 1.0 * MfgGame.player.rot.y / 360;

            var minU = 0.0 - offsetU;
            var maxU = 0.0 + widthU - offsetU;

            this.meshesOrthoBg = MfgGame.level.getAllMeshes2DBackground(
                0,
                0,
                minU,
                maxU,
                0.0,
                1.0
            );
        }

        /*****************************************************************************
        *   Draw 3D faces onto the 3Dcanvas.
        *****************************************************************************/
        private draw3D()
        {
            var perspectiveMatrix:Float32Array = this.getPerspectiveMatrix();
            this.gl.uniformMatrix4fv( this.matrixLocation, false, perspectiveMatrix );
            this.gl.depthMask( true );

            //browse all meshes
            for ( var i:number = 0; i < this.meshes3D.length; ++i )
            {
                //set texture for this mesh
                if ( this.meshes3D[ i ].texture == null )
                {
                    LibGL.setSolidColor( this.gl );
                }
                else
                {
                    LibGL.setTexture( this.gl, this.meshes3D[ i ].texture, this.testCreateAllTextures );
                }

                //browse all faces
                for ( var j:number = 0; j < this.meshes3D[ i ].faces.length; ++j )
                {
                    //draw face
                    this.gl.drawArrays( WebGLRenderingContext.TRIANGLES, this.faceDrawingIndex * 3, 3 );
                    ++this.faceDrawingIndex;
                }
            }
        }

        /*****************************************************************************
        *   Draw orthogonal (2D) on the 3Dcanvas.
        *****************************************************************************/
        private draw2D( orthoMeshes:Array<LibMesh> )
        {
            // draw ortho !!
            var orthographicMatrix:Float32Array = this.getOrthographicMatrix();
            this.gl.uniformMatrix4fv( this.matrixLocation, false, orthographicMatrix );
            this.gl.depthMask( false );

            // enable blending in order to filter the alpha channel
            this.gl.enable( WebGLRenderingContext.BLEND );
            this.gl.blendFunc( WebGLRenderingContext.SRC_ALPHA, WebGLRenderingContext.ONE_MINUS_SRC_ALPHA );

            for ( var i:number = 0; i < orthoMeshes.length; ++i )
            {
                //set texture for this mesh
                LibGL.setTexture( this.gl, orthoMeshes[ i ].texture, this.testCreateAllTextures );

                //browse all faces
                for ( var j:number = 0; j < orthoMeshes[ i ].faces.length; ++j )
                {
                    //draw face
                    this.gl.drawArrays( WebGLRenderingContext.TRIANGLES, this.faceDrawingIndex * 3, 3 );
                    ++this.faceDrawingIndex;
                }
            }

            // disable blending in order to filter the alpha channel
            this.gl.disable( WebGLRenderingContext.BLEND );
        }

        /*****************************************************************************
        *   Get the freshly generated and updated matrix for the current player position.
        *****************************************************************************/
        private getPerspectiveMatrix():Float32Array
        {
            //compute all view matrices
            var projectionMatrix  :Float32Array = LibMatrix.createPerspectiveMatrix( MfgSettings.CAMERA_FIELD_OF_VIEW, this.gl.drawingBufferWidth / this.gl.drawingBufferHeight, MfgSettings.CAMERA_NEAR, MfgSettings.CAMERA_FAR );
            var cameraMatrix      :Float32Array = LibMatrix.createLookAtMatrix( MfgSettings.CAMERA_POSITION, MfgSettings.CAMERA_TARGET, MfgSettings.CAMERA_UP );
            var viewMatrix        :Float32Array = LibMatrix.inverseMatrix( cameraMatrix );

            //compute all translation and rotation matrices according to the player's positon and rotation
            var playerPos:LibVertex = MfgGame.player.pos;
            var playerRot:LibVertex = MfgGame.player.rot;

            var translationMatrix :Float32Array = LibMatrix.createTranslationMatrix( playerPos.x, playerPos.y, playerPos.z );
            var rotationXMatrix   :Float32Array = LibMatrix.createXRotationMatrix( playerRot.x          );
            var rotationYMatrix   :Float32Array = LibMatrix.createYRotationMatrix( 360.0 - playerRot.y  );
            var rotationZMatrix   :Float32Array = LibMatrix.createZRotationMatrix( playerRot.z          );

            //specify the applied matrix by starting with the view matrix
            var matrixToApply     :Float32Array = viewMatrix;

            //adjust translation and rotation matrices
            matrixToApply = LibMatrix.multiplyMatrices( matrixToApply, translationMatrix );
            matrixToApply = LibMatrix.multiplyMatrices( matrixToApply, rotationZMatrix   );
            matrixToApply = LibMatrix.multiplyMatrices( matrixToApply, rotationYMatrix   );
            matrixToApply = LibMatrix.multiplyMatrices( matrixToApply, rotationXMatrix   );

            //adjust projection matrix
            matrixToApply = LibMatrix.multiplyMatrices( matrixToApply, projectionMatrix  );

            return matrixToApply;
        }

        /*****************************************************************************
        *   Get the matrix for orthographic drawing operations.
        *****************************************************************************/
        private getOrthographicMatrix():Float32Array
        {
            return LibMatrix.createOrthographicMatrix( 0, MfgSettings.CANVAS_WIDTH, MfgSettings.CANVAS_HEIGHT, 0, MfgSettings.CAMERA_NEAR, MfgSettings.CAMERA_FAR );
        }
    }
