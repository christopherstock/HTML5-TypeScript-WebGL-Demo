
    /********************************************************************************
    *   Represents one texture vertex from a 3ds max file.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ********************************************************************************/
    class Lib3dsTextureVertex
    {
        /** The face's U coordinate. */
        public          u:number                = 0.0;
        /** The face's V coordinate. */
        public          v:number                = 0.0;

        /********************************************************************************
        *   Creates a texture vertex parsed from a 3ds max file.
        *
        *   @param  u   Texture coordinate U.
        *   @param  v   Texture coordinate V.
        ********************************************************************************/
        constructor( u:number, v:number )
        {
            this.u = u;
            this.v = v;
        }
    }
