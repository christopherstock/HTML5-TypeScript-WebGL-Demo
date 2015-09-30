
    /*****************************************************************************
    *   Represents the image system that handles all images being used by the app.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class MfgImage
    {
        /** The image for the 'texture test' image. */
        public      static      TEXTURE_TEST            :string                     = MfgSettings.PATH_IMAGE + "texture/ETest.jpg";
        /** The image for the 'texture bricks' image. */
        public      static      TEXTURE_BRICKS          :string                     = MfgSettings.PATH_IMAGE + "texture/EBricks.jpg";
        /** The image for the 'texture marble' image. */
        public      static      TEXTURE_MARBLE          :string                     = MfgSettings.PATH_IMAGE + "texture/EMarble.jpg";
        /** The image for the 'texture metal' image. */
        public      static      TEXTURE_METAL           :string                     = MfgSettings.PATH_IMAGE + "texture/EMetal.jpg";
        /** The image for the 'texture stones' image. */
        public      static      TEXTURE_STONES          :string                     = MfgSettings.PATH_IMAGE + "texture/EStones.jpg";

        /** The image for the 'auto shotgun' image. */
        public      static      ORTHO_AUTO_SHOTGUN      :string                     = MfgSettings.PATH_IMAGE + "ortho/EAutoShotgun.png";
        /** The image for the 'background landscape' image. */
        public      static      ORTHO_BG_LANDSCAPE      :string                     = MfgSettings.PATH_IMAGE + "ortho/EBgLandscape.png";

        /** The image for the 'Mayflower logo' sprite. */
        public      static      ITEM_MF_LOGO            :string                     = MfgSettings.PATH_IMAGE + "item/mf-logo.png";

        /** This array contains all filenames of all images that shall be loaded. */
        public      static      FILE_NAMES              :Array<string>              =
        [
            MfgImage.TEXTURE_TEST,
            MfgImage.TEXTURE_BRICKS,
            MfgImage.TEXTURE_MARBLE,
            MfgImage.TEXTURE_METAL,
            MfgImage.TEXTURE_STONES,

            MfgImage.ORTHO_AUTO_SHOTGUN,
            MfgImage.ORTHO_BG_LANDSCAPE,

            MfgImage.ITEM_MF_LOGO
        ];
    }
