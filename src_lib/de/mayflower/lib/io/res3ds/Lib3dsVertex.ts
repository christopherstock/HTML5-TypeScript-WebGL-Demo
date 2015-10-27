
    /********************************************************************************
    *   Represents a specified face in a 3ds max file.
    *
    *   @author     Christopher Stock
    *   @version    0.0.2
    ********************************************************************************/
    class Lib3dsVertex
    {
        /** Vertex x coordinate. */
        public          x                   :number             = 0.0;
        /** Vertex y coordinate. */
        public          y                   :number             = 0.0;
        /** Vertex z coordinate. */
        public          z                   :number             = 0.0;
        /** Vertex texture coordinate U. */
        public          u                   :number             = 0.0;
        /** Vertex texture coordinate V. */
        public          v                   :number             = 0.0;

        /***********************************************************************************
        *   Creates a new vertex being parsed from a 3ds max file.
        *
        *   @param  x   Position coordinate X.
        *   @param  y   Position coordinate Y.
        *   @param  z   Position coordinate Z.
        ***********************************************************************************/
        constructor( x:number, y:number, z:number )
        {
            this.x = x;
            this.y = y;
            this.z = z;
        }

        /***********************************************************************************
        *   Returns a copy of the specified vertex.
        *
        *   @param  v   The max-vertex to create a copy from.
        *   @return     A copy of the specified max-vertex.
        ***********************************************************************************/
        public static copy( v:Lib3dsVertex ):Lib3dsVertex
        {
            return new Lib3dsVertex( v.x, v.y, v.z );
        }
    }
