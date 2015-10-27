
    /*****************************************************************************
    *   A rectangular in 2D space.
    *
    *   @author     Christopher Stock
    *   @version    0.0.2
    *****************************************************************************/
    class LibRect2D extends LibShape2D
    {
        /*****************************************************************************
        *   Constructs a new rectangular.
        *
        *   @param  left    Left coordinate for this rect.
        *   @param  top     Top coordinate for this rect.
        *   @param  width   Width for the new rect.
        *   @param  height  Height for the new rect.
        *****************************************************************************/
        public constructor( left:number, top:number, width:number, height:number )
        {
            super( left, top, width, height );
        }

        /*****************************************************************************
        *   Checks if this rect contains the given point.
        *
        *   @param  x  The X coordinate of the point to check.
        *   @param  y  The Y coordinate of the point to check.
        *   @return    <code>true</code> if the point lies inside the rectangle.
        *              Otherwise <code>false</code>.
        *****************************************************************************/
        public containsPoint( x:number, y:number ):boolean
        {
            return (
                    x  >= this.anchor.x
                &&  x  <  this.anchor.x    + this.size.width
                &&  y  >= this.anchor.y
                &&  y  <  this.anchor.y     + this.size.height
            );
        }

        /*****************************************************************************
        *   Checks if the given rect intersects this rect.
        *
        *   @param  rect    The rect to check for intersection.
        *   @return         <code>true</code> if the rects collide.
        *                   Otherwise <code>false</code>.
        *****************************************************************************/
        public collidesWithRect( rect:LibRect2D ):boolean
        {
            return !(
                    this.anchor.x                          >= rect.anchor.x + rect.size.width
                ||  this.anchor.x  + this.size.width      <= rect.anchor.x
                ||  this.anchor.y                          >= rect.anchor.y + rect.size.height
                ||  this.anchor.y  + this.size.height     <= rect.anchor.y
            );
        }

        /*****************************************************************************
        *   Checks if the given rect equals with this rect.
        *
        *   @param  rect    The rect to check for equality.
        *   @return         <code>true</code> if the rects equal.
        *                   Otherwise <code>false</code>.
        *****************************************************************************/
        public equalsWithRect( rect:LibRect2D ):boolean
        {
            return (
                    this.anchor.x       ==  rect.anchor.x
                &&  this.size.width     ==  rect.size.width
                &&  this.anchor.y       ==  rect.anchor.y
                &&  this.size.height    ==  rect.size.height
            );
        }
    }
