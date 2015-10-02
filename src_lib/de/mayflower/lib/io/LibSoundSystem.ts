
    /*****************************************************************************
    *   Loads and manages all desired sounds.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class LibSoundSystem
    {
        /** All filenames. */
        private                     fileNames                           :Array<string>              = [];
        /** The debug context. */
        private                     debug                               :LibDebug                   = null;
        /** This array contains all loaded sounds. */
        private                     allSounds                           :Array<HTMLAudioElement>    = [];
        /** Counts the number of successful loaded images. */
        private                     loadedCount                         :number                     = 0;

        /** The callback function that is being invoked when all sounds are loaded. */
        private                     onAllSoundsLoaded                   :any                        = null;

        /*****************************************************************************
        *   Creates a new instance of the sound system.
        *
        *   @param  fileNames           All sound-filenames to load.
        *   @param  callbackFunction    The function to invoke after all sounds have been loaded.
        *   @param  debug               The debug context.
        *****************************************************************************/
        constructor( fileNames:Array<string>, callbackFunction:any, debug:LibDebug )
        {
            this.fileNames         = fileNames;
            this.onAllSoundsLoaded = callbackFunction;
            this.debug             = debug;

            this.loadSounds();
        }

        /*****************************************************************************
        *   Loads all sounds that shall be loaded for the sound system.
        *****************************************************************************/
        private loadSounds()
        {
            var instance:LibSoundSystem = this;

            //load all sounds
            for ( var i:number = 0; i < this.fileNames.length; ++i )
            {
                try
                {
                    this.debug.log( "loading sound [" + this.fileNames[ i ] + "..." );

                    this.allSounds[ this.fileNames[ i ] ]              = new Audio();
                    this.allSounds[ this.fileNames[ i ] ].src          = this.fileNames[ i ];
                    this.allSounds[ this.fileNames[ i ] ].onloadeddata = function()
                    {
                        instance.onSoundLoaded();
                    };
                }
                catch ( ex )
                {
                    console.log( "Exception raised on loading sound [" + this.fileNames[ i ] + "]" );

                    instance.onSoundLoaded();
                }
            }
        }

        /*****************************************************************************
        *   This function is invoked each time <b>one</b> sound has been fully loaded.
        *****************************************************************************/
        private onSoundLoaded()
        {
            ++this.loadedCount;
            this.debug.log( "loaded sound [" + this.loadedCount + "] / [" + this.fileNames.length + "]" );

            if ( this.loadedCount == this.fileNames.length )
            {
                this.debug.log( "All sounds have been loaded" );

                //return to initialization
                this.onAllSoundsLoaded();
            }
        }

        /*****************************************************************************
        *   Creates and plays a COPY of the specified audio object.
        *
        *   @param  id  The ID of the audio object to play.
        *****************************************************************************/
        public playSound( id:string )
        {
            if ( this.allSounds[ id ] != null )
            {
                var clipClone:HTMLAudioElement = <HTMLAudioElement>this.allSounds[id].cloneNode(true);
                clipClone.play();
            }
        }
    }
