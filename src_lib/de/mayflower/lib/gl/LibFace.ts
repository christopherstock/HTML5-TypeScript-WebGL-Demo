
    /*****************************************************************************
    *   Represents a triangle face in 3D space.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class LibFace
    {
        /** Triangle point A in 3D space. */
        public                              a       :LibVertex                  = null;
        /** Triangle point B in 3D space. */
        public                              b       :LibVertex                  = null;
        /** Triangle point C in 3D space. */
        public                              c       :LibVertex                  = null;

        /*****************************************************************************
        *   Creates a new triangle face in 3D space.
        *
        *   @param  a   The triangle point A.
        *   @param  b   The triangle point B.
        *   @param  c   The triangle point C.
        *****************************************************************************/
        constructor( a:LibVertex, b:LibVertex, c:LibVertex )
        {
            this.a = a;
            this.b = b;
            this.c = c;
        }
    }
