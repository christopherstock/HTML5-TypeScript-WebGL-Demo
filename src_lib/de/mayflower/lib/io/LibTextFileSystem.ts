
    /*****************************************************************************
    *   Loads and manages all desired text file contents.
    *
    *   @author     Christopher Stock
    *   @version    0.0.2
    *****************************************************************************/
    class LibTextFileSystem
    {
        /** All filenames. */
        private                 fileNames               :Array<string>              = [];

        /** Counts the number of successful loaded textfiles. */
        private                 loadedCount             :number                     = 0;

        /** This array contains all loaded text file contents, indexed by filename. */
        private                 loadedContents          :Array<string>              = [];

        /** The callback function that is being invoked when all textfiles are loaded. */
        private                 onAllTextFilesLoaded    :any                        = null;

        /** The debug context. */
        private                 debug                   :LibDebug                   = null;

        /*****************************************************************************
        *   Creates a new instance of the text file system.
        *
        *   @param  fileNames           All textfile-filenames to load.
        *   @param  callbackFunction    The function to invoke after all textfiles have been loaded.
        *   @param  debug               The debug context.
        *****************************************************************************/
        constructor( fileNames:Array<string>, callbackFunction:any, debug:LibDebug )
        {
            this.fileNames              = fileNames;
            this.onAllTextFilesLoaded   = callbackFunction;
            this.debug                  = debug;
        }

        /*****************************************************************************
        *   Loads all textfiles that shall be loaded for the textfile system.
        *****************************************************************************/
        public loadTextFiles()
        {
            //browse all filenames
            for ( var i = 0; i < this.fileNames.length; ++i )
            {
                this.loadTextFile( this.fileNames[ i ] );
            }
        }

        /*****************************************************************************
        *   Loads one single textfile with the specified filename.
        *
        *   @param  filename    The filename of this textfile to load.
        *****************************************************************************/
        private loadTextFile( filename:string ):void
        {
            //check browser support for external file requests
            var client = null;
            if ( "ActiveXObject" in window )
            {
                //internet explorer
                client = new ActiveXObject( "Microsoft.XMLHTTP" );
            }
            else
            {
                //firefox, safari and chrome
                client = new XMLHttpRequest();
            }

            var instance:LibTextFileSystem = this;

            client.open( 'GET', filename );
            client.onreadystatechange = function()
            {
                var CLIENT_READY_STATE_DATA_LOADED_COMPLETE:number = 4;
                if ( client.readyState == CLIENT_READY_STATE_DATA_LOADED_COMPLETE )
                {
                    instance.debug.log( "Data loaded for file [" + filename + "]" );
                    instance.loadedContents[ filename ] = client.responseText;

                    console.log( "Saving content for filename [" + filename + "] content is here!" );

                    instance.onTextFileLoaded();
                }
            };
            client.send();
        }

        /*****************************************************************************
        *   This function is invoked each time <b>one</b> textfile has been fully loaded.
        *****************************************************************************/
        private onTextFileLoaded()
        {
            ++this.loadedCount;
            this.debug.log( "loaded textfile [" + this.loadedCount + "] / [" + this.fileNames.length + "]" );

            if ( this.loadedCount == this.fileNames.length )
            {
                this.debug.log( "All textfiles have been loaded" );

                //return to initialization
                this.onAllTextFilesLoaded();
            }
        }

        /*****************************************************************************
        *   Delivers the content with the specified filename.
        *
        *   @param  id  The filename of the content to return.
        *   @return     The content with the specified filename as a string.
        *****************************************************************************/
        public getContent( id:string ):string
        {
            return this.loadedContents[ id ];
        }
    }
