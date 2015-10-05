
    /*****************************************************************************
    *   Specifies the paramount part of the game logic.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class MfgGame
    {
        /** The canvas3D being used by the game. */
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
        private         static          game3D              :MfgGame3D                      = null;
        /** The level data. */
        public          static          level               :MfgLevelData                   = null;
        /** The player instance. */
        public          static          player              :MfgPlayer                      = null;

        /*****************************************************************************
        *   Inits this app from scratch.
        *****************************************************************************/
        public static init()
        {
            //set document title
            document.title = MfgSettings.TITLE;

            //init canvas3D and append it's tag to the HTML page body
            MfgGame.canvas3D = new LibCanvas3D
            (
                MfgSettings.CANVAS_WIDTH,
                MfgSettings.CANVAS_HEIGHT,
                MfgDebug.canvas3D
            );
            document.body.appendChild( MfgGame.canvas3D.getCanvasTag() );

            //attach listeners for keys and pointer
            MfgGame.keySystem = new LibKeySystem( MfgDebug.key );

            //load all images
            MfgGame.imageSystem = new LibImageSystem
            (
                MfgImage.FILE_NAMES,
                MfgGame.initWhenImagesAreLoaded,
                MfgDebug.imageLoader
            );
            MfgGame.imageSystem.loadImages();
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
                MfgGame.initWhenSoundsAreLoaded();
                return;
            }

            //load all sounds
            MfgGame.soundSystem = new LibSoundSystem(
                MfgSound.FILE_NAMES,
                MfgGame.initWhenSoundsAreLoaded,
                MfgDebug.soundLoader
            );
            MfgGame.soundSystem.loadSounds();
        }

        /*****************************************************************************
        *   This method is invoked when all sounds are loaded
        *   and will continue the program.
        *****************************************************************************/
        private static initWhenSoundsAreLoaded()
        {
            //load 3ds model files
            MfgGame.res3dsContents = new LibTextFileSystem(
                Mfg3ds.FILE_NAMES,
                MfgGame.initWhen3dsModelsAreLoaded,
                MfgDebug.textLoader
            );
            MfgGame.res3dsContents.loadTextFiles();
        }

        /*****************************************************************************
        *   This method is invoked when all 3ds models are loaded
        *   and will continue the program.
        *****************************************************************************/
        private static initWhen3dsModelsAreLoaded()
        {
            //parse a 3d model
            var parserD3ds = new Lib3dsParser( MfgGame.res3dsContents.getContent( Mfg3ds.OFFICE_CHAIR ), MfgDebug.res3ds );



            //init level data
            MfgGame.level = new MfgLevelData();

            //init the player isntance
            MfgGame.player = new MfgPlayer();

            //init the 3D webGL surface
            MfgGame.game3D = new MfgGame3D
            (
                MfgGame.canvas3D.getGlContext(),
                MfgGame.level.getAllMeshes3D(),
                MfgGame.level.getAllMeshes2DForeground()
            );

            //play the bg sound NOW!
            if ( !MfgDebugSettings.DEBUG_DISABLE_SOUNDS )
            {
                MfgGame.soundSystem.playSound( MfgSound.SOUND_BG_PD_INVESTIGATION_X );
            }

            //start main thread
            MfgGame.mainThread = new LibMainThread( MfgGame.tick, MfgSettings.THREAD_DELAY );
            MfgGame.mainThread.start();
        }

        /*****************************************************************************
        *   Calculates the game logic for one tick.
        *****************************************************************************/
        private static tick()
        {
            //render game
            MfgGame.game3D.render();

            //paint game
            MfgGame.game3D.draw();
        }
    }
