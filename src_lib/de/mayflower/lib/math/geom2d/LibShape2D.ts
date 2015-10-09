
    /*****************************************************************************
    *   This class represents a geometrical shape in 2D space
    *   and is the abstract superclass of all 2D bodies.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class LibShape2D
    {
        /** The left top coordinate of the bounding rectangle. */
        public              anchor          :LibPoint2D                 = null;

        /** The width and height of the bounding rectangle. */
        public              size            :LibDimension2D             = null;

        /*****************************************************************************
        *   Constructs a new shape in 2D space.
        *
        *   @param  left    Left coordinate of the bounding rectangle.
        *   @param  top     Top coordinate of the bounding rectangle.
        *   @param  width   Width of the bounding rectangle.
        *   @param  height  Height of the bounding rectangle.
        *****************************************************************************/
        public constructor( left:number, top:number, width:number, height:number )
        {
            this.anchor = new LibPoint2D(     left,  top    );
            this.size   = new LibDimension2D( width, height );
        }
    }
