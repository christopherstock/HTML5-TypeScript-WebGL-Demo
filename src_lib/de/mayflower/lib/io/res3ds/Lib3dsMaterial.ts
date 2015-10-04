
    /********************************************************************************
    *   Represents additional information about the texture of a 3ds face.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ********************************************************************************/
    class Lib3dsMaterial
    {
        /** The name of the material. */
        public      name                :string             = null;
        /** The face's color. */
        public      color               :string             = null;
        /** The U offset of this face. */
        public      offsetU             :number             = 0.0;
        /** The V offset of this face. */
        public      offsetV             :number             = 0.0;
        /** The U tiling of this face. */
        public      tilingU             :number             = 0.0;
        /** The V tiling of this face. */
        public      tilingV             :number             = 0.0;

        /********************************************************************************
        *   Represents a specified material of a 3ds max file.
        *
        *   @param  name        The name of the material.
        *   @param  color       The color of this material.
        *   @param  offsetU     U Offset.
        *   @param  offsetV     V Offset.
        *   @param  tilingU     U Tiling.
        *   @param  tilingV     V Tiling.
        ********************************************************************************/
        constructor( name:string, color:string, offsetU:number, offsetV:number, tilingU:number, tilingV:number )
        {
            this.name       = name;
            this.color      = color;
            this.offsetU    = offsetU;
            this.offsetV    = offsetV;
            this.tilingU    = tilingU;
            this.tilingV    = tilingV;
        }
    }
