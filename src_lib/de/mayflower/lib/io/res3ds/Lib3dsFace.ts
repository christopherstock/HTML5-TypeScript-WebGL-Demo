
    /********************************************************************************
    *   Represents a specified face in a 3ds max file.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ********************************************************************************/
    class Lib3dsFace
    {
        /** The face's normal. This is the point that crosses the face where all all angles have 90°. */
        public          faceNormal              :Lib3dsVertex               = null;
        /** The face's 1st vertex. */
        public          vertex1                 :Lib3dsVertex               = null;
        /** The face's 2nd vertex. */
        public          vertex2                 :Lib3dsVertex               = null;
        /** The face's 3rd vertex. */
        public          vertex3                 :Lib3dsVertex               = null;

        /********************************************************************************
        *   Represents a specified face in a 3ds max file.
        *
        *   @param  faceNormal  The face's normal.
        *   @param  vertex1     The face's 1st vertex.
        *   @param  vertex2     The face's 2nd vertex.
        *   @param  vertex3     The face's 3rd vertex.
        ********************************************************************************/
        constructor
        (
            faceNormal :Lib3dsVertex,
            vertex1    :Lib3dsVertex,
            vertex2    :Lib3dsVertex,
            vertex3    :Lib3dsVertex
        )
        {
            this.faceNormal = ( faceNormal == null ? null : Lib3dsVertex.copy( faceNormal ) );
            this.vertex1    =                               Lib3dsVertex.copy( vertex1    );
            this.vertex2    =                               Lib3dsVertex.copy( vertex2    );
            this.vertex3    =                               Lib3dsVertex.copy( vertex3    );
        }
    }
