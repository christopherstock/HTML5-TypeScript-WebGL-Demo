
    /*****************************************************************************
    *   Loads and manages all desired images.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class LibImageSystem
    {
        /** All filenames. */
        private                 fileNames           :Array<string>              = [];

        /** Counts the number of successful loaded images. */
        private                 loadedCount         :number                     = 0;

        /** This array contains all loaded {@link HTMLImageElement} objects, indexed by filename. */
        private                 loadedImages        :Array<HTMLImageElement>    = [];

        /** The callback function that is being invoked when all images are loaded. */
        private                 onAllImagesLoaded   :any                        = null;

        /** The debug context. */
        private                 debug               :LibDebug                   = null;

        /*****************************************************************************
        *   Creates a new instance of the image system.
        *
        *   @param  fileNames           All image-filenames to load.
        *   @param  callbackFunction    The function to invoke after all images have been loaded.
        *   @param  debug               The debug context.
        *****************************************************************************/
        constructor( fileNames:Array<string>, callbackFunction:any, debug:LibDebug )
        {
            this.fileNames         = fileNames;
            this.onAllImagesLoaded = callbackFunction;
            this.debug             = debug;
        }

        /*****************************************************************************
        *   Loads all images that shall be loaded for the image system.
        *****************************************************************************/
        public loadImages()
        {
            //browse all filenames
            for ( var i = 0; i < this.fileNames.length; ++i )
            {
                this.loadedImages[ this.fileNames[ i ] ] = this.loadImage( this.fileNames[ i ] );
            }
        }

        /*****************************************************************************
        *   Loads one single image with the specified filename.
        *
        *   @param  filename    The filename of this image to load.
        *   @return             The unloaded image object.
        *****************************************************************************/
        private loadImage( filename:string ):HTMLImageElement
        {
            var instance:LibImageSystem = this;

            var img    = new Image();
            img.src    = filename;
            img.onload = function()
            {
                instance.onImageLoaded();
            };

            return img;
        }

        /*****************************************************************************
        *   This function is invoked each time <b>one</b> image has been fully loaded.
        *****************************************************************************/
        private onImageLoaded()
        {
            ++this.loadedCount;
            this.debug.log( "loaded image [" + this.loadedCount + "] / [" + this.fileNames.length + "]" );

            if ( this.loadedCount == this.fileNames.length )
            {
                this.debug.log( "All images have been loaded" );

                //return to initialization
                this.onAllImagesLoaded();
            }
        }

        /*****************************************************************************
        *   Delivers the image with the specified filename.
        *
        *   @param  id  The filename of the image to return.
        *   @return     The image object with the specified filename.
        *****************************************************************************/
        public getImage( id:string ):HTMLImageElement
        {
            return this.loadedImages[ id ];
        }
    }
