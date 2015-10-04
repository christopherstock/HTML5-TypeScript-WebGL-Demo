
    /*****************************************************************************
    *   Represents the player instance.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class MfgPlayer
    {
        /** Player's position. */
        public                  pos                             :LibVertex                  = null;
        /** Player's rotation. */
        public                  rot                             :LibVertex                  = null;
        /** Player's flag to center the view aim. */
        public                  centerViewAim                   :boolean                    = false;

        /*****************************************************************************
        *   Creates a new payer instance.
        *****************************************************************************/
        public constructor()
        {
            this.pos            = new LibVertex( 0.0, 0.0, 0.0, 0.0, 0.0 );
            this.rot            = new LibVertex( 0.0, 0.0, 0.0, 0.0, 0.0 );
            this.centerViewAim  = false;
        }

        /*****************************************************************************
        *   Handles the player's keys.
        *****************************************************************************/
        public handlePlayerKeys()
        {
            this.handlePlayerKeysForMoving();
            this.handlePlayerKeysForLooking();
        }

        /*****************************************************************************
        *   Handles the player's keys for moving.
        *****************************************************************************/
        private handlePlayerKeysForMoving()
        {
            if
            (
                    MfgGame.keySystem.isPressed( LibKeySystem.KEY_DOWN      )
                ||  MfgGame.keySystem.isPressed( LibKeySystem.KEY_S         )
                ||  MfgGame.keySystem.isPressed( LibKeySystem.KEY_NUMPAD_2  )
            )
            {
                this.pos.z -= LibMath2D.cosDeg( this.rot.y ) * MfgSettings.PLAYER_SPEED_MOVE;
                this.pos.x -= LibMath2D.sinDeg( this.rot.y ) * MfgSettings.PLAYER_SPEED_MOVE;
            }

            if
            (
                    MfgGame.keySystem.isPressed( LibKeySystem.KEY_UP        )
                ||  MfgGame.keySystem.isPressed( LibKeySystem.KEY_W         )
                ||  MfgGame.keySystem.isPressed( LibKeySystem.KEY_NUMPAD_8  )
            )
            {
                this.pos.z += LibMath2D.cosDeg( this.rot.y ) * MfgSettings.PLAYER_SPEED_MOVE;
                this.pos.x += LibMath2D.sinDeg( this.rot.y ) * MfgSettings.PLAYER_SPEED_MOVE;
            }

            if
            (
                    MfgGame.keySystem.isPressed( LibKeySystem.KEY_A )
            )
            {
                this.pos.z -= LibMath2D.sinDeg( this.rot.y ) * MfgSettings.PLAYER_SPEED_MOVE;
                this.pos.x += LibMath2D.cosDeg( this.rot.y ) * MfgSettings.PLAYER_SPEED_MOVE;
            }

            if
            (
                    MfgGame.keySystem.isPressed( LibKeySystem.KEY_D )
            )
            {
                this.pos.z += LibMath2D.sinDeg( this.rot.y ) * MfgSettings.PLAYER_SPEED_MOVE;
                this.pos.x -= LibMath2D.cosDeg( this.rot.y ) * MfgSettings.PLAYER_SPEED_MOVE;
            }
        }

        /*****************************************************************************
        *   Handles the player's keys for looking.
        *****************************************************************************/
        private handlePlayerKeysForLooking()
        {
            if
            (
                    MfgGame.keySystem.isPressed( LibKeySystem.KEY_LEFT      )
                ||  MfgGame.keySystem.isPressed( LibKeySystem.KEY_Q         )
                ||  MfgGame.keySystem.isPressed( LibKeySystem.KEY_NUMPAD_4  )
            )
            {
                //alter and clip rot y
                this.rot.y += MfgSettings.PLAYER_SPEED_TURN;
                this.rot.y = LibMath2D.normalizeAngle( this.rot.y );
            }

            if
            (
                    MfgGame.keySystem.isPressed( LibKeySystem.KEY_RIGHT     )
                ||  MfgGame.keySystem.isPressed( LibKeySystem.KEY_E         )
                ||  MfgGame.keySystem.isPressed( LibKeySystem.KEY_NUMPAD_6  )
            )
            {
                //alter and clip rot y
                this.rot.y -= MfgSettings.PLAYER_SPEED_TURN;
                this.rot.y = LibMath2D.normalizeAngle( this.rot.y );
            }

            if
            (
                    MfgGame.keySystem.isPressed( LibKeySystem.KEY_CENTER_NUMPAD )
                ||  MfgGame.keySystem.isPressed( LibKeySystem.KEY_NUMPAD_5      )
            )
            {
                //start view aim centering
                this.centerViewAim = true;
            }

            if
            (
                    MfgGame.keySystem.isPressed( LibKeySystem.KEY_PAGE_UP  )
                ||  MfgGame.keySystem.isPressed( LibKeySystem.KEY_NUMPAD_9 )
            )
            {
                //alter and clip rot x
                this.rot.x -= MfgSettings.PLAYER_SPEED_LOOK_UP_DOWN;
                if ( this.rot.x < -MfgSettings.PLAYER_MAX_LOOK_UP_DOWN ) this.rot.x = -MfgSettings.PLAYER_MAX_LOOK_UP_DOWN;

                //stop view aim centering
                this.centerViewAim = false;
            }

            if
            (
                    MfgGame.keySystem.isPressed( LibKeySystem.KEY_PAGE_DOWN )
                ||  MfgGame.keySystem.isPressed( LibKeySystem.KEY_NUMPAD_3  )
            )
            {
                //alter and clip rot x
                this.rot.x += MfgSettings.PLAYER_SPEED_LOOK_UP_DOWN;
                if ( this.rot.x > MfgSettings.PLAYER_MAX_LOOK_UP_DOWN ) this.rot.x = MfgSettings.PLAYER_MAX_LOOK_UP_DOWN;

                //stop view aim centering
                this.centerViewAim = false;
            }
        }

        /*****************************************************************************
        *   Updates the player looking aim if it shall be resetted.
        *****************************************************************************/
        public updatePlayerLooking():void
        {
            if ( this.centerViewAim )
            {
                if ( this.rot.x < 0.0 )
                {
                    this.rot.x += MfgSettings.PLAYER_SPEED_CENTER_VIEW_AIM;
                    if ( this.rot.x >= 0.0 )
                    {
                        this.rot.x         = 0.0;
                        this.centerViewAim = false;
                    }
                }
                else if ( this.rot.x > 0.0 )
                {
                    this.rot.x -= MfgSettings.PLAYER_SPEED_CENTER_VIEW_AIM;
                    if ( this.rot.x <= 0.0 )
                    {
                        this.rot.x         = 0.0;
                        this.centerViewAim = false;
                    }
                }
            }
        }
    }
