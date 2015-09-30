
    /**************************************************************************************
    *   Contains the project history with all current and completed version information.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    **************************************************************************************/
    class MfgVersion
    {
        /** The project's version v.0.0.1. */
        private     static      V_0_0_1                 :LibVersion         = new LibVersion( "0.0.1", "[IN_PROGRESS]", "[IN_PROGRESS]",                "" );

        /** The project's current version. */
        public      static      CURRENT_VERSION         :LibVersion         = MfgVersion.V_0_0_1;
    }
