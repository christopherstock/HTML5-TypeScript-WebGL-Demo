
    /********************************************************************************
    *   Represents the final parsed triangle this is ready to be used in the lib GL system.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ********************************************************************************/
    class Lib3dsTriangle
    {
        /** Triangle's anchor point. */
        public          anchor              :LibVertex                  = null;
        /** Triangle's texture. */
        public          textureName         :string                     = null;
        /** Triangle's color. */
        public          col                 :string                     = null;
        /** Triangle's vertex A. */
        public          a                   :LibVertex                  = null;
        /** Triangle's vertex B. */
        public          b                   :LibVertex                  = null;
        /** Triangle's vertex C. */
        public          c                   :LibVertex                  = null;
       /** Triangle's normal. */
        public          faceNormal          :LibVertex                  = null;

        /********************************************************************************
        *   Creates one trinale that can be used in the GL lib.
        *
        *   @param  anchor      The anchor point.
        *   @param  textureName The name of the texture for this triangle.
        *   @param  col         The color for this triangle.
        *   @param  a           Vertex A.
        *   @param  b           Vertex B.
        *   @param  c           Vertex C.
        *   @param  faceNormal  The face normal.
        ********************************************************************************/
        public LibMaxTriangle
        (
            anchor      :LibVertex,
            textureName :string,
            col         :string,
            a           :LibVertex,
            b           :LibVertex,
            c           :LibVertex,
            faceNormal  :LibVertex
        )
        {
            this.anchor         = anchor;
            this.textureName    = textureName;
            this.col            = col;
            this.a              = a;
            this.b              = b;
            this.c              = c;
            this.faceNormal     = faceNormal;
        }
    }
