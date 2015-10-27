
    /*****************************************************************************
    *   Specifies the initialization part of the game logic.
    *
    *   @author     Christopher Stock
    *   @version    0.0.2
    *****************************************************************************/
    class MfgInit
    {
        /** The canvas3D context being used by the game. */
        public          static          canvas3D            :LibCanvas3D                    = null;
        /** The key system being used. */
        public          static          keySystem           :LibKeySystem                   = null;
        /** The image loading system. */
        public          static          imageSystem         :LibImageSystem                 = null;
        /** The sound loading system. */
        public          static          soundSystem         :LibSoundSystem                 = null;
        /** The 3ds resource loading system. */
        public          static          res3dsContents      :LibTextFileSystem              = null;
        /** The game loop mechanism. */
        private         static          mainThread          :LibMainThread                  = null;
        /** The WebGL 3D context. */
        public          static          gl3D                :MfgGL3D                        = null;

        /*****************************************************************************
        *   Inits this app from scratch.
        *****************************************************************************/
        public static init()
        {
            //set document title
            document.title = MfgSettings.TITLE;

            //init canvas3D and append it's tag to the HTML page body
            MfgInit.canvas3D = new LibCanvas3D
            (
                MfgSettings.CANVAS_WIDTH,
                MfgSettings.CANVAS_HEIGHT,
                MfgDebug.canvas3D
            );
            document.body.appendChild( MfgInit.canvas3D.getCanvasTag() );

            //attach listeners for keys and pointer
            MfgInit.keySystem = new LibKeySystem( MfgDebug.key );

            //load all images
            MfgInit.imageSystem = new LibImageSystem
            (
                MfgImage.FILE_NAMES,
                MfgInit.initWhenImagesAreLoaded,
                MfgDebug.imageLoader
            );
            MfgInit.imageSystem.loadImages();
        }

        /*****************************************************************************
        *   This method is invoked when all images are loaded
        *   and will continue the program.
        *****************************************************************************/
        private static initWhenImagesAreLoaded()
        {
            //init sprites
            MfgSprite.init();

            //skip loading sounds if desired
            if ( MfgDebugSettings.DEBUG_DISABLE_SOUNDS )
            {
                MfgInit.initWhenSoundsAreLoaded();
                return;
            }

            //load all sounds
            MfgInit.soundSystem = new LibSoundSystem(
                MfgSound.FILE_NAMES,
                MfgInit.initWhenSoundsAreLoaded,
                MfgDebug.soundLoader
            );
            MfgInit.soundSystem.loadSounds();
        }

        /*****************************************************************************
        *   This method is invoked when all sounds are loaded
        *   and will continue the program.
        *****************************************************************************/
        private static initWhenSoundsAreLoaded()
        {
            //load 3ds model files
            MfgInit.res3dsContents = new LibTextFileSystem(
                Mfg3ds.FILE_NAMES,
                MfgInit.initWhen3dsModelsAreLoaded,
                MfgDebug.textLoader
            );
            MfgInit.res3dsContents.loadTextFiles();
        }

        /*****************************************************************************
        *   This method is invoked when all 3ds models are loaded
        *   and will continue the program.
        *****************************************************************************/
        private static initWhen3dsModelsAreLoaded()
        {
            //init level data
            MfgGame.level = new MfgLevelData();





            //parse a 3d model (office chair) and add to level meshes
            var parserD3ds:Lib3ds = new Lib3ds( MfgInit.res3dsContents.getContent( Mfg3ds.MAYFLOWER_LOGO ), MfgDebug.res3ds );
          //MfgDebug.bugfix.log( " >> parsed office chair faces: [" + parserD3ds.getFaces().length + "] faces" );
          //MfgGame.level.allMeshes.push( parserD3ds.toLibMesh( MfgInit.imageSystem.getImage( MfgImage.TEXTURE_TEST ) ) );
            MfgGame.level.allMeshes.push( parserD3ds.toLibMesh( null ) );




            //init the player isntance
            MfgGame.player = new MfgPlayer();

            //init the 3D webGL surface
            MfgInit.gl3D = new MfgGL3D
            (
                MfgInit.canvas3D.getGlContext(),
                MfgGame.level.getAllMeshes3D(),
                MfgGame.level.getAllMeshes2DForeground()
            );

            //play the bg sound NOW!
            if ( !MfgDebugSettings.DEBUG_DISABLE_SOUNDS )
            {
                MfgInit.soundSystem.playSound( MfgSound.SOUND_BG_PD_INVESTIGATION_X );
            }

            //start main thread
            MfgInit.mainThread = new LibMainThread( MfgGame.tick, MfgSettings.THREAD_DELAY );
            MfgInit.mainThread.start();
        }
    }
