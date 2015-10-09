
    /************************************************************************************
    *   The main class contains the application's points of entry and termination.
    *
    *   TODO ASAP   Importer/Parser for 3Dsmax ASE-Files.
    *   TODO HIGH   Give JS-modules one more try?? ...
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
    *   DONE        Separated intitialization logic from game logic.
    *   DONE        Pruneed loading processes from constructor of libs.
    *   DONE        Enabled numeric keys on the numeric keypad if num lock is on.
    *   DONE        Extracted class MfgPlayer and encapsulated player instance.
    *   DONE        Created LibString class for RegEx functionality.
    *   DONE        Solved RegEx functionality.
    *   DONE        Implemented invocation of callback function when all sounds have been loaded.
    *   DONE        Created system for loading external textfiles via AJAX/XmlHttpRequest.
    *   DONE        Buffer view aim centering.
    *   DONE        Pruned E-prefix from all resources file names.
    *   DONE        Created floor ledge.
    *   DONE        Splitted player movement and player looking functions.
    *   DONE        Created and implemented function for normalizing angles.
    *   DONE        Clipped looking up/down.
    *   DONE        Include key for centering look aim.
    *   DONE        Include keys for looking up and down and moving up and down.
    *   DONE        Enable looking up/down.
    *   DONE        Remove a- and i- prefix for constructor variables and instance fields.
    *   DONE        Refactored LibGL.
    *   DONE        Cleaned up class LibMatrix.
    *   DONE        Enriched documentation for all project classes.
    *   DONE        Created tiled textures (in block creation function).
    *   DONE        Explored and adjust all axis.
    *   DONE        Created a function for creating 'block' objects.
    *   DONE        Simplified usages of degree to radiant conversion and vice versa.
    *   DONE        Added typing for LibVertex functions.
    *   DONE        Moved vector functions from LibMatrix to LibVertex.
    *   DONE        Drawed 2D sprites in fg.
    *   DONE        Drawed ortho in fg and separate in bg.
    *   DONE        Added documentation for de.mayflower.lib.math.gemo3d.*
    *   DONE        Moveed rad-functions from LibMath3D to LibMath2D.
    *   DONE        Enriched documentation for all lib classes.
    *   DONE        Prune old settings and values in MfgSettings and MfgSettingsDebug and MfgDebug.
    *   DONE        Create mesh factory for cubes.
    *   DONE        Try different gl-identities for drawing background images.
    *   DONE        Created drawing orthogonal fg and bg images.
    *   DONE        Blend alpha channel for 2D drawing operations.
    *   DONE        Tried swapping 2D and 3D drawing (success!).
    *   DONE        Refactored pos and rot.
    *   DONE        Separated 3D objects.
    *   DONE        Solved supplying multiple textures.
    *   DONE        Achieved altering faces array at runtime.
    *   DONE        Created classes LibFace and impement everywhere.
    *   DONE        Solved changing vertices for glContext.
    *   DONE        Moved level data to separate class.
    *   DONE        Merged vertiex coords and texture coords in one class.
    *   DONE        Created class for vertices.
    *   DONE        Pruned unused mfg classes.
    *   DONE        Pruned all external libs.
    *   DONE        Moved Webgl-setup to MfgGame3DSetup.ts.
    *   DONE        Implemented WASD keys for movement.
    *   DONE        Camera is now controlable.
    *   DONE        Turned webgl.js into a square TypeScript class.
    *   DONE        Implemented test texture.
    *   DONE        Pruned obsolete images.
    *   DONE        Pruned ugly textre adjustment in 2nd tick.
    *   DONE        Implemented WebGL template into existent TypeScript project.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
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
