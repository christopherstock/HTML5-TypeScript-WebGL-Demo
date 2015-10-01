
    /*****************************************************************************
    *   Defines the filenames and IDs of all 3ds model files being used in this app.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class Mfg3ds
    {
        /** The 3ds file for the model 'office chair'. */
        public      static      OFFICE_CHAIR            :string                     = MfgSettings.PATH_3DS + "officeChair.ase";
        /** The 3ds file for the model 'office desk'. */
        public      static      OFFICE_DESK             :string                     = MfgSettings.PATH_3DS + "officeDesk.ase";

        /** This array contains all filenames of all 3ds model files that shall be loaded. */
        public      static      FILE_NAMES              :Array<string>              =
        [
            Mfg3ds.OFFICE_CHAIR,
            Mfg3ds.OFFICE_DESK,
        ];
    }
