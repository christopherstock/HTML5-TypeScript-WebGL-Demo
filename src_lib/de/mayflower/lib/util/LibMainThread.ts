
    /*****************************************************************************
    *   Represents a neverending main thread / game loop mechanism.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class LibMainThread
    {
        /** The singleton instance of this class. */
        private     static      staticHelper            :LibMainThread  = null;
        /** The callback method to invoke each tick. */
        private                 callback               :any            = null;
        /** The number of milliseconds to wait between thread ticks. */
        private                 threadDelay            :number         = null;

        /*****************************************************************************
        *   Creates a new main thread system.
        *
        *   @param  callback        The method to invoke each tick.
        *   @param  threadDelay     Number of milliseconds to wait between ticks.
        *****************************************************************************/
        public constructor( callback:any, threadDelay:number )
        {
            this.callback    = callback;
            this.threadDelay = threadDelay;
        }

        /*****************************************************************************
        *   Starts this main thread.
        *****************************************************************************/
        public start()
        {
            LibMainThread.staticHelper = this;

            this.tick();
        }

        /*****************************************************************************
        *   This method is invoked each tick.
        *   It performs the callback invocation and delay.
        *****************************************************************************/
        private tick()
        {
            LibMainThread.staticHelper.callback();

            //the static helper is mandatory here - this will not work!
            window.setTimeout( LibMainThread.staticHelper.tick, LibMainThread.staticHelper.threadDelay );
        }
    }
