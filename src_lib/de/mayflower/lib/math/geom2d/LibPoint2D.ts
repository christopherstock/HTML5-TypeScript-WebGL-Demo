
    /*****************************************************************************
    *   A point in 2D space.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class LibPoint2D
    {
        /** Coordinate X. */
        public              x               :number                     = 0;

        /** Coordinate Y. */
        public              y               :number                     = 0;

        /*****************************************************************************
        *   Constructs a new point.
        *
        *   @param  x   X coordinate for this point.
        *   @param  y   Y coordinate for this point.
        *****************************************************************************/
        public constructor( x:number, y:number )
        {
            this.x = x;
            this.y = y;
        }
    }
