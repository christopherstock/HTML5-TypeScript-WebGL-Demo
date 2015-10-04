
    /*****************************************************************************
    *   The key system manages all pressed keys.
    *   Contains constants for keycodes of primal keys.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class LibKeySystem
    {
        /** The keycode that represents the 'ARROW LEFT' key. */
        public      static  KEY_LEFT            :number                             = 37;
        /** The keycode that represents the 'ARROW UP' key. */
        public      static  KEY_UP              :number                             = 38;
        /** The keycode that represents the 'ARROW RIGHT' key. */
        public      static  KEY_RIGHT           :number                             = 39;
        /** The keycode that represents the 'ARROW DOWN' key. */
        public      static  KEY_DOWN            :number                             = 40;

        /** The keycode that represents the 'ENTER' key. */
        public      static  KEY_ENTER           :number                             = 13;
        /** The keycode that represents the 'ESCAPE' key. */
        public      static  KEY_ESCAPE          :number                             = 27;
        /** The keycode that represents the 'SPACE' key. */
        public      static  KEY_SPACE           :number                             = 32;

        /** The keycode that represents the 'PAGE UP' key. */
        public      static  KEY_PAGE_UP         :number                             = 33;
        /** The keycode that represents the 'PAGE DOWN' key. */
        public      static  KEY_PAGE_DOWN       :number                             = 34;

        /** The keycode that represents the 'a' key. */
        public      static  KEY_A               :number                             = 65;
        /** The keycode that represents the 's' key. */
        public      static  KEY_S               :number                             = 83;
        /** The keycode that represents the 'd' key. */
        public      static  KEY_D               :number                             = 68;
        /** The keycode that represents the 'w' key. */
        public      static  KEY_W               :number                             = 87;
        /** The keycode that represents the 'q' key. */
        public      static  KEY_Q               :number                             = 81;
        /** The keycode that represents the 'e' key. */
        public      static  KEY_E               :number                             = 69;

        /** The keycode that represents the central key on the numeric keypad when NumLock is disabled. */
        public      static  KEY_CENTER_NUMPAD   :number                             = 12;

        /** The keycode that represents the key '2' on the numeric keypad when NumLock is enabled. */
        public      static  KEY_NUMPAD_2        :number                             = 98;
        /** The keycode that represents the key '3' on the numeric keypad when NumLock is enabled. */
        public      static  KEY_NUMPAD_3        :number                             = 99;
        /** The keycode that represents the key '4' on the numeric keypad when NumLock is enabled. */
        public      static  KEY_NUMPAD_4        :number                             = 100;
        /** The keycode that represents the key '5' on the numeric keypad when NumLock is enabled. */
        public      static  KEY_NUMPAD_5        :number                             = 101;
        /** The keycode that represents the key '6' on the numeric keypad when NumLock is enabled. */
        public      static  KEY_NUMPAD_6        :number                             = 102;
        /** The keycode that represents the key '8' on the numeric keypad when NumLock is enabled. */
        public      static  KEY_NUMPAD_8        :number                             = 104;
        /** The keycode that represents the key '9' on the numeric keypad when NumLock is enabled. */
        public      static  KEY_NUMPAD_9        :number                             = 105;

        /** All current key information. */
        private             allKeys             :Array<boolean>                     = null;

        /** The debug context. */
        private             debug               :LibDebug                           = null;

        /*****************************************************************************
        *   Creates a new key object.
        *
        *   @param  debug   A debug context.
        *****************************************************************************/
        public constructor( debug:LibDebug )
        {
            this.debug     = debug;
            this.allKeys   = [];

            var instance:LibKeySystem = this;
            var onKeyDown:any = function( evt:KeyboardEvent )
            {
                instance.handleKeyDown( evt );
            };

            var onKeyUp:any = function( evt:KeyboardEvent )
            {
                instance.handleKeyUp( evt );
            };

            //set event listener for keyboard devices - all but IE
            window.addEventListener( "keydown",     onKeyDown, false );
            window.addEventListener( "keyup",       onKeyUp,   false );

            //set event listener for keyboard devices - IE
            window.addEventListener( "onkeydown",   onKeyDown, false );
            window.addEventListener( "onkeyup",     onKeyUp,   false );
        }

        /*****************************************************************************
        *   This method is always invoked by the system if a key is pressed.
        *
        *   @param evt  The system's propagated key event.
        *****************************************************************************/
        public handleKeyDown( evt:KeyboardEvent )
        {
            var keyCode = evt.which;
            this.allKeys[ keyCode ] = true;

            this.debug.log( "key pressed ["  + keyCode + "]" );
        }

        /*****************************************************************************
        *   This method is always invoked by the system if a key is released.
        *
        *   @param evt  The system's propagated key event.
        *****************************************************************************/
        public handleKeyUp( evt:KeyboardEvent )
        {
            var keyCode = evt.which;
            this.allKeys[ keyCode ] = false;

            this.debug.log( "key released ["  + keyCode + "]" );
        }

        /*****************************************************************************
        *   Checks if the key with the given keyCode is currently pressed.
        *
        *   @param  keyCode The keyCode of the key to return pressed state.
        *   @return         <code>true</code> if this key is currently pressed.
        *                   Otherwise <code>false</code>.
        *****************************************************************************/
        public isPressed( keyCode:number ):boolean
        {
            return this.allKeys[ keyCode ];
        }
    }
