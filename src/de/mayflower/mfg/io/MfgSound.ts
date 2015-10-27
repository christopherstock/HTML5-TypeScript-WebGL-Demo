
    /*****************************************************************************
    *   Defines the filenames and IDs of all sound resources being used in this app.
    *
    *   @author     Christopher Stock
    *   @version    0.0.2
    *****************************************************************************/
    class MfgSound
    {
        /** The sound for the 'background - Perfect Dark - Investigation X'. */
        public      static      SOUND_BG_PD_INVESTIGATION_X         :string                 = MfgSettings.PATH_SOUND + "bg1.mp3";
        /** The sound for the 'effect - bling'. */
        public      static      SOUND_FX_BLING                      :string                 = MfgSettings.PATH_SOUND + "fx1.mp3";

        /** This array contains all filenames of all sounds that shall be loaded. */
        public      static      FILE_NAMES                          :Array<string>          =
        [
            MfgSound.SOUND_BG_PD_INVESTIGATION_X,
            MfgSound.SOUND_FX_BLING
        ];
    }
