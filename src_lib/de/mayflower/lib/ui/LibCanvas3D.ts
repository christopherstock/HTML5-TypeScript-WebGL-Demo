
    /*****************************************************************************
    *   Represents the 3D drawing surface.
    *
    *   @author     Christopher Stock
    *   @version    0.0.2
    *****************************************************************************/
    class LibCanvas3D
    {
        /** The HTML canvas tag that can be added to the website's body. */
        private             canvasTag           :HTMLCanvasElement              = null;

        /** The webGL rendering context. */
        private             glContext           :WebGLRenderingContext          = null;

        /** The referenced debug context. */
        private             debug               :LibDebug                       = null;

        /*****************************************************************************
        *   Inits the 3D canvas.
        *
        *   @param  width   The target width for this canvas to assign.
        *   @param  height  The target height for this canvas to assign.
        *   @param  debug   The debug context.
        *   @throws Error   If the WebGL context could not be created.
        *****************************************************************************/
        public constructor( width:number, height:number, debug:LibDebug )
        {
            //assign debug instance
            this.debug             = debug;

            //create an HTML canvas element and assign it's dimensions
            this.canvasTag         = <HTMLCanvasElement>document.createElement( 'canvas' );
            this.canvasTag.width   = width;
            this.canvasTag.height  = height;

            //create WebGL context
            this.glContext         = <WebGLRenderingContext>this.canvasTag.getContext( 'webgl' );
            //this is a workaround for Internet Explorer
            if ( this.glContext == null ) this.glContext = <WebGLRenderingContext>this.canvasTag.getContext( 'experimental-webgl' )
            //break if the WebGL context could not be retrieved
            if ( this.glContext == null ) throw new Error( "WebGL context could NOT be initialized!" );

            //output log message
            this.debug.log( "WebGL-Canvas initialized with dimensions [" + this.canvasTag.width + "][" + this.canvasTag.height + "]" );
        }

        /*****************************************************************************
        *   Returns the HTML Canvas Tag element.
        *
        *   @return     The HTML-canvas-tag.
        *****************************************************************************/
        public getCanvasTag():HTMLCanvasElement
        {
            return this.canvasTag;
        }

        /*****************************************************************************
        *   Returns the Web-GL-rendering context.
        *
        *   @return     The GL-rendering context.
        *****************************************************************************/
        public getGlContext():WebGLRenderingContext
        {
            return this.glContext;
        }

        /*****************************************************************************
        *   Returns the canvas width.
        *
        *   @return     The width of this canvas in px.
        *****************************************************************************/
        public getWidth():number
        {
            return this.canvasTag.width;
        }

        /*****************************************************************************
        *   Returns the canvas height.
        *
        *   @return     The height of this canvas in px.
        *****************************************************************************/
        public getHeight():number
        {
            return this.canvasTag.height;
        }
    }
