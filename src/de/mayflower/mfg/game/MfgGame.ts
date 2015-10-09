
    /*****************************************************************************
    *   Specifies the paramount part of the game logic.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class MfgGame
    {
        /** The level data. */
        public          static          level               :MfgLevelData                   = null;
        /** The player instance. */
        public          static          player              :MfgPlayer                      = null;

        /*****************************************************************************
        *   Calculates the game logic for one tick.
        *****************************************************************************/
        public static tick()
        {
            //render game
            MfgGame.render();

            //paint game
            MfgGame.draw();
        }

        /*****************************************************************************
        *   Renders the game scene.
        *****************************************************************************/
        public static render()
        {
            MfgGame.player.handleKeys();
            MfgGame.player.updateLooking();

            MfgInit.gl3D.render();
        }

        /*****************************************************************************
        *   Draws the game scene.
        *****************************************************************************/
        public static draw()
        {
            MfgInit.gl3D.draw();
        }
    }
