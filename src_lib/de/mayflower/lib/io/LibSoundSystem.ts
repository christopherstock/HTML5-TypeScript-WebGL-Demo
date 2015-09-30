
    /*****************************************************************************
    *   Loads and manages all desired sounds.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class LibSoundSystem
    {
        /** This array contains all loaded sounds. */
        private                     allSounds                           :Array<HTMLAudioElement>    = [];

        /*****************************************************************************
        *   Creates a new instance of the sound system.
        *
        *   @param  fileNames   All sound-filenames to load.
        *****************************************************************************/
        constructor( fileNames:Array<string> )
        {
            //load all sounds
            for ( var i:number = 0; i < fileNames.length; ++i )
            {
                try
                {
                    this.allSounds[ fileNames[ i ] ]     = new Audio();
                    this.allSounds[ fileNames[ i ] ].src = fileNames[ i ];
                }
                catch ( ex )
                {
                    console.log( "Exception raised on loading sound [" + fileNames[ i ] + "]" );
                }
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
