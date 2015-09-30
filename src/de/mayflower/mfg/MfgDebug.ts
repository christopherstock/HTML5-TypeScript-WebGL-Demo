
    /*****************************************************************************
    *   The debug system, specifying switchable debug groups
    *   that generate output to the screen console.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class MfgDebug
    {
        /** A primal debug group. */
        public      static  bugfix                      :LibDebug                       = new LibDebug( true    && MfgSettings.MODE == MfgDebugSettings.MODE_DEBUG );

        /** The debug group for acclaiming messages. */
        public      static  acclaim                     :LibDebug                       = new LibDebug( true    && MfgSettings.MODE == MfgDebugSettings.MODE_DEBUG );
        /** The debug group for the key system. */
        public      static  key                         :LibDebug                       = new LibDebug( true    && MfgSettings.MODE == MfgDebugSettings.MODE_DEBUG );

        /** The debug group for the image system. */
        public      static  imageLoader                 :LibDebug                       = new LibDebug( false   && MfgSettings.MODE == MfgDebugSettings.MODE_DEBUG );
        /** The debug group for the canvas3D system. */
        public      static  canvas3D                    :LibDebug                       = new LibDebug( false   && MfgSettings.MODE == MfgDebugSettings.MODE_DEBUG );
    }
