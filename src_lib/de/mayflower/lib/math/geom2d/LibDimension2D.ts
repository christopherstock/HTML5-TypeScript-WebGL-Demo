
    /*****************************************************************************
    *   A dimension in 2D space.
    *
    *   @author     Christopher Stock
    *   @version    0.0.2
    *****************************************************************************/
    class LibDimension2D
    {
        /** Dimension's width. */
        public              width                  :number                     = 0;

        /** Dimension's height. */
        public              height                 :number                     = 0;

        /*****************************************************************************
        *   Constructs a new dimension.
        *
        *   @param  width       The width for this dimension.
        *   @param  height      The height for this dimension.
        *****************************************************************************/
        public constructor( width:number, height:number )
        {
            this.width  = width;
            this.height = height;
        }
    }
