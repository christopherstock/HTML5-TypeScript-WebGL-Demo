
    /*****************************************************************************
    *   Generates level data 3D models.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class MfgLevelDataFactory
    {
        /*****************************************************************************
        *   Generates a cube mesh.
        *
        *   @param  x       Position X.
        *   @param  y       Position Y.
        *   @param  z       Position Z.
        *   @param  size    Edge size.
        *   @param  imageId ID of the image to use.
        *   @return         A cube mesh with the specified size, position and texture.
        *****************************************************************************/
        public static createMeshCube( x:number, y:number, z:number, size:number, imageId:string ):LibMesh
        {
            return MfgLevelDataFactory.createMeshBlock( x, y, z, size, size, size, imageId );
        }

        /*****************************************************************************
        *   Generates a block mesh.
        *
        *   @param  x       Position X.
        *   @param  y       Position Y.
        *   @param  z       Position Z.
        *   @param  sizeX   Edge size X.
        *   @param  sizeY   Edge size Y.
        *   @param  sizeZ   Edge size Z.
        *   @param  imageId ID of the image to use.
        *   @return         A block mesh with the specified size, position and texture.
        *****************************************************************************/
        public static createMeshBlock( x:number, y:number, z:number, sizeX:number, sizeY:number, sizeZ:number, imageId:string ):LibMesh
        {
            var SIZE_PER_TILE:number = 100;

            var tilingX:number = sizeX / SIZE_PER_TILE;
            var tilingY:number = sizeY / SIZE_PER_TILE;
            var tilingZ:number = sizeZ / SIZE_PER_TILE;

            return new LibMesh(
                [
                    //front
                    new LibFace
                    (
                        new LibVertex( x,           y,          z,              0,          0           ),
                        new LibVertex( x,           y + sizeY,  z,              0,          tilingY     ),
                        new LibVertex( x + sizeX,   y,          z,              tilingX,     0          )
                    ),
                    new LibFace
                    (
                        new LibVertex( x,           y + sizeY,  z,              0,          tilingY     ),
                        new LibVertex( x + sizeX,   y + sizeY,  z,              tilingX,    tilingY     ),
                        new LibVertex( x + sizeX,   y,          z,              tilingX,    0           )
                    ),

                    //back
                    new LibFace
                    (
                        new LibVertex( x,            y + sizeY,  z + sizeZ,      tilingX,   tilingY     ),
                        new LibVertex( x,            y,          z + sizeZ,      tilingX,   0           ),
                        new LibVertex( x + sizeX,    y,          z + sizeZ,      0,         0           )
                    ),
                    new LibFace
                    (
                        new LibVertex( x,           y + sizeY,  z + sizeZ,      tilingX,    tilingY     ),
                        new LibVertex( x + sizeX,   y,          z + sizeZ,      0,          0           ),
                        new LibVertex( x + sizeX,   y + sizeY,  z + sizeZ,      0,          tilingY     )
                    ),

                    //left
                    new LibFace
                    (
                        new LibVertex( x,           y,          z,              tilingZ,    0           ),
                        new LibVertex( x,           y,          z + sizeZ,      0,          0           ),
                        new LibVertex( x,           y + sizeY,  z + sizeZ,      0,          tilingY     )
                    ),
                    new LibFace
                    (
                        new LibVertex( x,           y,          z,              tilingZ,    0           ),
                        new LibVertex( x,           y +sizeY,   z + sizeZ,      0,          tilingY     ),
                        new LibVertex( x,           y + sizeY,  z,              tilingZ,    tilingY     )
                    ),

                    //right
                    new LibFace
                    (
                        new LibVertex( x + sizeX,   y,          z + sizeZ,      tilingZ,    0           ),
                        new LibVertex( x + sizeX,   y,          z,              0,          0           ),
                        new LibVertex( x + sizeX,   y + sizeY,  z + sizeZ,      tilingZ,    tilingY     )
                    ),
                    new LibFace
                    (
                        new LibVertex( x + sizeX,   y,          z,              0,          0           ),
                        new LibVertex( x + sizeX,   y + sizeY,  z,              0,          tilingY     ),
                        new LibVertex( x + sizeX,   y + sizeY,  z + sizeZ,      tilingZ,    tilingY     )
                    ),

                    //top
                    new LibFace
                    (
                        new LibVertex( x,           y,          z + sizeZ,      0,          0           ),
                        new LibVertex( x,           y,          z,              0,          tilingZ     ),
                        new LibVertex( x + sizeX,   y,          z + sizeZ,      tilingX,    0           )
                    ),
                    new LibFace
                    (
                        new LibVertex( x,           y,          z,              0,          tilingZ     ),
                        new LibVertex( x + sizeX,   y,          z,              tilingX,    tilingZ     ),
                        new LibVertex( x + sizeX,   y,          z + sizeZ,      tilingX,    0           )
                    ),

                    //top
                    new LibFace
                    (
                        new LibVertex( x,           y + sizeY,  z + sizeZ,      0,          tilingZ     ),
                        new LibVertex( x + sizeX,   y + sizeY,  z + sizeZ,      tilingX,    tilingZ     ),
                        new LibVertex( x + sizeX,   y + sizeY,  z,              tilingX,    0           )
                    ),
                    new LibFace
                    (
                        new LibVertex( x,           y + sizeY,  z + sizeZ,      0,          tilingZ     ),
                        new LibVertex( x + sizeX,   y + sizeY,  z,              tilingX,    0           ),
                        new LibVertex( x,           y + sizeY,  z,              0,          0           )
                    ),
                ],
                MfgGame.imageSystem.getImage( imageId )
            );
        }
    }
