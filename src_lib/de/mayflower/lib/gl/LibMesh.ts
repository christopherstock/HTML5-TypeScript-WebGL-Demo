
    /*****************************************************************************
    *   Represents a mesh in 3D space.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class LibMesh
    {
        /** All faces this mesh consists of. */
        public                              faces               :Array<LibFace>         = null;
        /** The texture to use for all faces of this mesh. */
        public                              texture             :HTMLImageElement       = null;

        /*****************************************************************************
        *   Creates a new mesh in 3D space.
        *
        *   @param  faces   All faces this mesh consists of.
        *   @param  texture The texture to use for this mesh.
        *****************************************************************************/
        constructor( faces:Array<LibFace>, texture:HTMLImageElement )
        {
            this.faces   = faces;
            this.texture = texture;
        }
    }
