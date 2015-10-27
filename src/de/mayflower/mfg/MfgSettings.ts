
    /*****************************************************************************
    *   Specifies all adjustments and balancings for the application.
    *
    *   @author     Christopher Stock
    *   @version    0.0.2
    *****************************************************************************/
    class MfgSettings
    {
        /** Determines the app's operation mode. */
        public      static      MODE                                        :number             = MfgDebugSettings.MODE_DEBUG;

        /** The application's internal name. */
        public      static      TITLE                                       :string             = "HTML5 TypeScript WebGL Primer, (c) 2015 Mayflower GmbH, v. [" + MfgVersion.CURRENT_VERSION.getVersionDescriptor() + "]";

        /** The desired canvas3D width. */
        public      static      CANVAS_WIDTH                                :number             = 700;
        /** The desired canvas3D height. */
        public      static      CANVAS_HEIGHT                               :number             = 400;

        /** The delay in ms between each thread tick. */
        public      static      THREAD_DELAY                                :number             = 20;

        /** The camera's field of view in degrees. */
        public      static      CAMERA_FIELD_OF_VIEW                        :number             = 60;
        /** The minimum distance for the camera. */
        public      static      CAMERA_NEAR                                 :number             = 1.0;
        /** The maximum distance for the camera. */
        public      static      CAMERA_FAR                                  :number             = 4000.0;

        /** The player's speed in world coordinate per tick. */
        public      static      PLAYER_SPEED_MOVE                           :number             = 10;
        /** The player's turning speed in degrees per tick. */
        public      static      PLAYER_SPEED_TURN                           :number             = 5.0;
        /** The player's looking up/down speed in degrees per tick. */
        public      static      PLAYER_SPEED_LOOK_UP_DOWN                   :number             = 2.5;
        /** The player's maximum looking up/down in degrees. */
        public      static      PLAYER_MAX_LOOK_UP_DOWN                     :number             = 60.0;
        /** The player's speed for centering the up/down view aim in degrees per tick. */
        public      static      PLAYER_SPEED_CENTER_VIEW_AIM                :number             = 5.0;

        /** The relative path from index.html where all images the app makes use of reside. */
        public      static      PATH_IMAGE                                  :string             = "res/image/";
        /** The relative path from index.html where all sounds the app makes use of reside. */
        public      static      PATH_SOUND                                  :string             = "res/sound/";
        /** The relative path from index.html where all 3d model files the app makes use of reside. */
        public      static      PATH_3DS                                    :string             = "res/3ds/";

        /** The vector for the camera position. */
        public      static      CAMERA_POSITION                             :LibVertex          = new LibVertex( 0, 0, 1, 0, 0 );
        /** The vector for the camera looking direction. */
        public      static      CAMERA_UP                                   :LibVertex          = new LibVertex( 0, 1, 0, 0, 0 );
        /** The vector for the camera target. */
        public      static      CAMERA_TARGET                               :LibVertex          = new LibVertex( 0, 0, 0, 0, 0 );
    }
