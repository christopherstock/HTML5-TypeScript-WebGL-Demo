
    /*****************************************************************************
    *   Represents a vertex in 3D space.
    *
    *   @author     Christopher Stock
    *   @version    0.0.2
    *****************************************************************************/
    class LibVertex
    {
        /** Coordinate X in 3D space. */
        public                      x               :number                     = null;
        /** Coordinate Y in 3D space. */
        public                      y               :number                     = null;
        /** Coordinate Z in 3D space. */
        public                      z               :number                     = null;

        /** Texture-Coordinate U. */
        public                      u               :number                     = null;
        /** Texture-Coordinate V. */
        public                      v               :number                     = null;

        /*****************************************************************************
        *   Creates a new vertex in 3D space.
        *
        *   @param  x   Coordinate X.
        *   @param  y   Coordinate Y.
        *   @param  z   Coordinate Z.
        *   @param  u   Texture-Coordinate U.
        *   @param  v   Texture-Coordinate V.
        *****************************************************************************/
        constructor( x:number, y:number, z:number, u:number, v:number )
        {
            this.x = x;
            this.y = y;
            this.z = z;

            this.u = u;
            this.v = v;
        }

        /*****************************************************************************
        *   Normalizes a vector.
        *
        *   @param  v   The vector to normalize.
        *   @return     The normalized vector.
        *****************************************************************************/
        public static normalizeVector( v:LibVertex ):LibVertex
        {
            var ret    = new LibVertex( 0, 0, 0, 0, 0 );
            var length = Math.sqrt( v.x * v.x + v.y * v.y + v.z * v.z );

            // make sure we don't divide by 0.
            if (length > 0.00001)
            {
                ret.x = v.x / length;
                ret.y = v.y / length;
                ret.z = v.z / length;
            }

            return ret;
        }

        /*****************************************************************************
        *   Subtracts 2 vertices.
        *
        *   @param  v1  Vertex 1.
        *   @param  v2  Vertex 2.
        *   @return     The substraction of vertex 1 - vertex 2.
        *****************************************************************************/
        public static subtractVectors( v1:LibVertex, v2:LibVertex ):LibVertex
        {
            var ret = new LibVertex( 0, 0, 0, 0, 0 );

            ret.x = v1.x - v2.x;
            ret.y = v1.y - v2.y;
            ret.z = v1.z - v2.z;

            return ret;
        }

        /*****************************************************************************
        *   Computes the cross product of 2 vertices.
        *
        *   @param  v1  Vertex 1.
        *   @param  v2  Vertex 2.
        *   @return     A vertex containing the cross product from vertex 1 and vertex 2.
        *****************************************************************************/
        public static crossVector( v1:LibVertex, v2:LibVertex ):LibVertex
        {
            var ret  = new LibVertex( 0, 0, 0, 0, 0 );

            ret.x = v1.y * v2.z - v1.z * v2.y;
            ret.y = v1.z * v2.x - v1.x * v2.z;
            ret.z = v1.x * v2.y - v1.y * v2.x;

            return ret;
        }
    }
