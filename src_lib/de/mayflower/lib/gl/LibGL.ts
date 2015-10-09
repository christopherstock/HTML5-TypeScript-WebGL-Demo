
    /*****************************************************************************
    *   Manages initializing functions for the WebGL context.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class LibGL
    {
        /*****************************************************************************
        *   Creates a program with two specified shader-IDs.
        *
        *   @param gl               The WebGLRenderingContext to use.
        *   @param shaderScriptIds  Array of ids of the script tags for the shaders. The first is assumed to be the
        *                           vertex shader, the second the fragment shader.
        *   @return                 The created program.
        *****************************************************************************/
        public static createProgramFromScripts( gl:WebGLRenderingContext, shaderScriptIds )
        {
            var shaders = [];
            for (var ii = 0; ii < shaderScriptIds.length; ++ii)
            {
                shaders.push( LibGL.createShaderFromScript(gl, shaderScriptIds[ii] ) );
            }
            return LibGL.createProgram( gl, shaders );
        }

        /*****************************************************************************
        *   Creates a program, attaches shaders, binds attrib locations, links the
        *   program and calls useProgram.
        *
        *   @param  gl      The WebGLRenderingContext to use.
        *   @param  shaders The shaders to attach.
        *   @return         The created program.
        *****************************************************************************/
        public static createProgram( gl:WebGLRenderingContext, shaders )
        {
            var program = gl.createProgram();
            shaders.forEach
            (
                function( shader )
                {
                    gl.attachShader(program, shader);
                }
            );
            gl.linkProgram( program );

            // Check the link status
            var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
            if (!linked)
            {
                // something went wrong with the link
                var lastError = gl.getProgramInfoLog(program);
                console.log("Error in program linking:" + lastError);

                gl.deleteProgram(program);
                return null;
            }
            return program;
        }

        /*****************************************************************************
        *   Loads a shader from a script tag.
        *
        *   @param  gl          The WebGLRenderingContext to use.
        *   @param  scriptId    The id of the script tag.
        *   @return             The created shader.
        *****************************************************************************/
        private static createShaderFromScript( gl:WebGLRenderingContext, scriptId )
        {
            var shaderSource = "";
            var shaderType;
/*
            var shaderScript = document.getElementById(scriptId);
            if (!shaderScript) {
            throw ("*** Error: unknown script element" + scriptId);
            }
            shaderSource = shaderScript.text;
*/
            if ( scriptId === "3d-vertex-shader" )
            {
                shaderSource =
                (
                        "attribute vec4 a_position;                    \n"
                    +   "attribute vec2 a_texcoord;                    \n"
                    +   "                                              \n"
                    +   "uniform mat4 u_matrix;                        \n"
                    +   "                                              \n"
                    +   "varying vec2 v_texcoord;                      \n"
                    +   "                                              \n"
                    +   "void main() {                                 \n"
                    +   "  // Multiply the position by the matrix.     \n"
                    +   "  gl_Position = u_matrix * a_position;        \n"
                    +   "                                              \n"
                    +   "  // Pass the texcoord to the fragment shader.\n"
                    +   "  v_texcoord = a_texcoord;                    \n"
                    +   "}                                             \n"
                );
            }
            else if ( scriptId === "3d-fragment-shader" )
            {
                shaderSource =
                (
                        "precision mediump float;                           \n"
                    +   "                                                   \n"
                    +   "// Passed in from the vertex shader.               \n"
                    +   "varying vec2 v_texcoord;                           \n"
                    +   "                                                   \n"
                    +   "// The texture.                                    \n"
                    +   "uniform sampler2D u_texture;                       \n"
                    +   "                                                   \n"
                    +   "void main() {                                      \n"
                    +   "   gl_FragColor = texture2D(u_texture, v_texcoord);\n"
                    +   "}                                                  \n"
                );
            }

            if ( scriptId === "3d-vertex-shader" )
            {
                shaderType = gl.VERTEX_SHADER;
            }
            else if ( scriptId === "3d-fragment-shader" )
            {
                shaderType = gl.FRAGMENT_SHADER;
            }
            else if ( shaderType !== gl.VERTEX_SHADER && shaderType !== gl.FRAGMENT_SHADER )
            {
                throw ( "*** Error: unknown shader type" );
            }

            return LibGL.loadShader( gl, shaderSource, shaderType );
        }

        /*****************************************************************************
        *   Loads a shader.
        *
        *   @param  gl              The WebGLRenderingContext to use.
        *   @param  shaderSource    The shader source.
        *   @param  shaderType      The type of shader.
        *   @return                 The created shader.
        *****************************************************************************/
        private static loadShader( gl:WebGLRenderingContext, shaderSource:string, shaderType:number ):WebGLShader
        {
            // Create the shader object
            var shader = gl.createShader(shaderType);

            // Load the shader source
            gl.shaderSource(shader, shaderSource);

            // Compile the shader
            gl.compileShader(shader);

            // Check the compile status
            var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
            if (!compiled)
            {
                // Something went wrong during compilation; get the error
                var lastError = gl.getShaderInfoLog(shader);
                console.log("*** Error compiling shader '" + shader + "':" + lastError);
                gl.deleteShader(shader);
                return null;
            }

            return shader;
        }

        /*****************************************************************************
        *   Sets a texture for GL.
        *
        *   @param  gl              The WebGLRenderingContext to use.
        *   @param  image           The image to set as a texture.
        *   @param  createTexture   If the texture should be created (conceptional!).
        *****************************************************************************/
        public static setTexture( gl:WebGLRenderingContext, image:HTMLImageElement, createTexture:boolean )
        {
            if (createTexture)
            {
                //set image texture
                var texture:WebGLTexture = gl.createTexture();
                gl.bindTexture(WebGLRenderingContext.TEXTURE_2D, texture);
            }

            gl.texImage2D(
                WebGLRenderingContext.TEXTURE_2D,
                0,
                WebGLRenderingContext.RGBA,
                WebGLRenderingContext.RGBA,
                WebGLRenderingContext.UNSIGNED_BYTE,
                image
            );

            gl.generateMipmap(WebGLRenderingContext.TEXTURE_2D);
        }

        /*****************************************************************************
        *   Sets a solid color for GL.
        *
        *   @param  gl              The WebGLRenderingContext to use.
        *****************************************************************************/
        public static setSolidColor( gl:WebGLRenderingContext )
        {
            gl.texImage2D(
                WebGLRenderingContext.TEXTURE_2D,
                0,
                WebGLRenderingContext.RGBA,
                1,
                1,
                0,
                WebGLRenderingContext.RGBA,
                WebGLRenderingContext.UNSIGNED_BYTE,
                new Uint8Array( [ 0, 0, 255, 255 ] )
            );
        }
    }
