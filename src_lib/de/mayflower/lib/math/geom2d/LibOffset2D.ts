
    /*****************************************************************************
    *   An offset in 2D space.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class LibOffset2D
    {
        /** Offset's horizontal amount. */
        public              x           :number                     = 0;

        /** Offset's vertical amount. */
        public              y           :number                     = 0;

        /*****************************************************************************
        *   Constructs a new offset.
        *
        *   @param  x   Horizontal offset amount.
        *   @param  y   Vertical   offset amount.
        *****************************************************************************/
        public constructor( x:number, y:number )
        {
            this.x = x;
            this.y = y;
        }
    }
