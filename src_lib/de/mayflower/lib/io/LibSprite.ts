
    /*****************************************************************************
    *   Represents a 2D sprite - An image that consists of different frames
    *   and is used for displaying an animation.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class LibSprite
    {
        /** The image being used by this sprite, containing all frames. */
        private                 img                         :HTMLImageElement           = null;
        /** The number of horizontal frames in this sprite's image. */
        private                 framesX                     :number                     = 0;
        /** The number of vertical frames in this sprite's image. */
        private                 framesY                     :number                     = 0;
        /** The width of one frame in px. */
        public                  frameWidth                  :number                     = 0;
        /** The height of one frame in px. */
        public                  frameHeight                 :number                     = 0;
        /** The total number of frames in this sprite. */
        private                 frameCount                  :number                     = 0;
        /** The index of the current active frame in this sprite. */
        private                 currentFrame                :number                     = 0;
        /** The current tick between frame changes in this sprite. */
        private                 currentTick                 :number                     = 0;
        /** The delay time between frame change in ticks. */
        private                 ticksBetweenFrameChange     :number                     = 0;

        /*****************************************************************************
        *   Creates a new sprite with the specified properties.
        *
        *   @param  img                         The image that contains all the frames for this sprite.
        *   @param  framesX                     The number of horizontal frames in this image.
        *   @param  framesY                     The number of vertical frames in this image.
        *   @param  frameCount                  The total number of frames in this image.
        *   @param  ticksBetweenFrameChange     The number of game ticks to delay till this sprite
        *                                       changes to the next frame.
        *****************************************************************************/
        public constructor( img:HTMLImageElement, framesX:number, framesY:number, frameCount:number, ticksBetweenFrameChange:number )
        {
            this.img                     = img;
            this.framesX                 = framesX;
            this.framesY                 = framesY;
            this.frameCount              = frameCount;
            this.frameWidth              = img.width  / framesX;
            this.frameHeight             = img.height / framesY;
            this.ticksBetweenFrameChange = ticksBetweenFrameChange;
        }

        /*****************************************************************************
        *   Draws the current frame of this sprite onto the specified screen position.
        *
        *   @param  ctx     The 2d rendering context.
        *   @param  x       The x location to draw this sprite's current frame onto.
        *   @param  y       The y location to draw this sprite's current frame onto.
        *   @param  alpha   The alpha value to draw this image with.
        *****************************************************************************/
        public draw( ctx:CanvasRenderingContext2D, x:number, y:number, alpha:number )
        {
/*
            LibDrawing.drawImageScaledClipped
                (
                    ctx,
                    this.iImg,
                    x,
                    y,
                    this.frameWidth  * Math.floor( this.iCurrentFrame % this.iFramesX ),
                    this.frameHeight * Math.floor( this.iCurrentFrame / this.iFramesX ),
                    this.frameWidth,
                    this.frameHeight,
                    this.frameWidth,
                    this.frameHeight,
                    alpha
                );
*/
        }

        /*****************************************************************************
        *   Performs the next tick for this sprite.
        *****************************************************************************/
        public nextTick()
        {
            if ( ++this.currentTick > this.ticksBetweenFrameChange )
            {
                this.currentTick = 0;
                this.nextFrame();
            }
        }

        /*****************************************************************************
        *   Changes the current frame of this sprite to the next one
        *   or resets it's current frame back to the first frame
        *   if the last one has been reached.
        *****************************************************************************/
        private nextFrame()
        {
            ++this.currentFrame;
            if ( this.currentFrame >= this.frameCount )
            {
                this.currentFrame = 0;
            }
        }
    }
