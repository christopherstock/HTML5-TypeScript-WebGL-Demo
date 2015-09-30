
    /*****************************************************************************
    *   Manages the game logic.
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
        /** The game loop mechanism. */
        private         static          mainThread          :LibMainThread                  = null;
        /** The WebGL 3D context. */
        private         static          game3D              :MfgGame3D                      = null;
        /** The level data. */
        public          static          level               :MfgLevelData                   = null;

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
                MfgGame.initWhenImagesAreComplete,
                MfgDebug.imageLoader
            );
        }

        /*****************************************************************************
        *   This method is invoked when all images are loaded
        *   and will initialize the remaining stuff.
        *****************************************************************************/
        private static initWhenImagesAreComplete()
        {
            //init sprites
            MfgSprite.init();

            //load all sounds
            MfgGame.soundSystem = new LibSoundSystem(
                MfgSound.FILE_NAMES
            );
            if ( !MfgDebugSettings.DEBUG_DISABLE_SOUNDS ) MfgGame.soundSystem.playSound( MfgSound.SOUND_BG_PD_INVESTIGATION_X );




/*
            //load all 3d models ??
            var client = new XMLHttpRequest();
            client.open( 'GET', MfgSettings.PATH_3DS_MODELS + '/aChairOffice1.ase' );
            client.onreadystatechange = function()
            {
                alert( client.responseText );
            };
            client.send();
*/



            //init level data
            MfgGame.level = new MfgLevelData();

            //init the 3D webGL surface
            MfgGame.game3D = new MfgGame3D
            (
                MfgGame.canvas3D.getGlContext(),
                MfgGame.level.getAllMeshes3D(),
                MfgGame.level.getAllMeshes2DForeground()
            );

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
