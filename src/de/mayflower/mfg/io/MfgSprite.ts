
    /*****************************************************************************
    *   Specifies all sprites being used in this app.
    *   Sprites are images that contain several animation frames.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class MfgSprite
    {
        /** The mayflower logo sprite. */
        public      static      ITEM_MF_LOGO                :LibSprite                  = null;

        /** The player default sprite. */
        //public      static      PLAYER_DEFAULT              :LibSprite                  = null;
        /** The sprite for the standing player looking into the left direction. */
        //public      static      PLAYER_STAND_LEFT           :LibSprite                  = null;
        /** The sprite for the standing player looking into the right direction. */
        //public      static      PLAYER_STAND_RIGHT          :LibSprite                  = null;
        /** The sprite for the standing player walking into the left direction. */
        //public      static      PLAYER_WALK_LEFT            :LibSprite                  = null;
        /** The sprite for the standing player walking into the right direction. */
        //public      static      PLAYER_WALK_RIGHT           :LibSprite                  = null;

        /*****************************************************************************
        *   Inits all sprites being specified in this class.
        *****************************************************************************/
        public static init():void
        {
            MfgSprite.ITEM_MF_LOGO       = new LibSprite( MfgGame.imageSystem.getImage( MfgImage.ITEM_MF_LOGO       ), 3, 6, 18, 4  );
/*
            MfgSprite.PLAYER_DEFAULT     = new LibSprite( MfgGame.imageSystem.getImage( MfgImage.PLAYER_DEFAULT     ), 1, 1, 1,  1  );
            MfgSprite.PLAYER_STAND_LEFT  = new LibSprite( MfgGame.imageSystem.getImage( MfgImage.PLAYER_STAND_LEFT  ), 1, 1, 1,  1  );
            MfgSprite.PLAYER_STAND_RIGHT = new LibSprite( MfgGame.imageSystem.getImage( MfgImage.PLAYER_STAND_RIGHT ), 1, 1, 1,  1  );
            MfgSprite.PLAYER_WALK_LEFT   = new LibSprite( MfgGame.imageSystem.getImage( MfgImage.PLAYER_WALK_LEFT   ), 2, 1, 2,  4  );
            MfgSprite.PLAYER_WALK_RIGHT  = new LibSprite( MfgGame.imageSystem.getImage( MfgImage.PLAYER_WALK_RIGHT  ), 2, 1, 2,  4  );
*/
        }
    }
