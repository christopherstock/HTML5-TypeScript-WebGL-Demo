
    /************************************************************************************
    *   The main class contains the application's points of entry and termination.
    *
    *   TODO ASAP   Outsource shader files if external files can be used.
    *   TODO ASAP   Refactor MfgGame3DSetup and prune initial transformation or translation?
    *   TODO HIGH   Flexible drawing system with a dynamic drawing vector.
    *   TODO ASAP   Prune faceDrawingIndex in class MfgGL3D.
    *   TODO ASAP   PRUNE initial transformations/translations in setup!!
    *   TODO ASAP   Merge setup functions in MfgGame3DSetup and write position and text-coord values in one loop?
    *   TODO ASAP   Adjust all axis according to 3dsMax? - reset player startup. Check and flatten perspective matrix operations.
    *   TODO ASAP   Fading HUD images.
    *   TODO INIT   Draw ortho fonts?
    *   TODO INIT   Create FPS counter.
    *   TODO INIT   Y modifier while walking.
    *   TODO LOW    Increase performance?
    *   TODO WEAK   Y modifier for holded wearpon.
    *
    *   DONE        Dismissed: Give JS-/TS-modules one more try.
    *
    *   @author     Christopher Stock
    *   @version    0.0.2
    *****************************************************************************/
    class Mfg
    {
        /*****************************************************************************
        *   This method is invoked when the application starts.
        *****************************************************************************/
        public static main():void
        {
            //acclaim debug console
            MfgDebug.acclaim.log( MfgSettings.TITLE );

            //init game engine
            MfgInit.init();
        }
    }

    /*****************************************************************************
    *   This is the application's point of entry.
    *****************************************************************************/
    window.onload = function()
    {
        //invoke main method
        Mfg.main();
    };

    /*****************************************************************************
    *   This is the application's point of termination.
    *****************************************************************************/
    window.onunload = function()
    {
    };
