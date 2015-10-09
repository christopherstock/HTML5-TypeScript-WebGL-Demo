
    /*****************************************************************************
    *   Specifies all level data.
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    *****************************************************************************/
    class MfgLevelData
    {
        /** All meshes the level consists of. */
        public      allMeshes                       :Array<LibMesh>         = null;

        /*****************************************************************************
        *   Sets up all level data.
        *****************************************************************************/
        constructor()
        {



            this.allMeshes =
            [
                MfgLevelDataFactory.createMeshBlock( 0,    0,   0, 100,  200, 300,  MfgImage.TEXTURE_TEST   ),
                MfgLevelDataFactory.createMeshBlock( -900, 200, 0, 1000, 10,  1000, MfgImage.TEXTURE_STONES ),



            ];
        }

        /*****************************************************************************
        *   Delivers the current level data 3D faces.
        *
        *   @return     All faces the level consists of.
        *****************************************************************************/
        public getAllMeshes3D() : Array<LibMesh>
        {
            return this.allMeshes;
        }

        /*****************************************************************************
        *   Delivers the current level data 2D orthogonal faces for foreground drawing.
        *
        *   @return     All testwise ortho faces.
        *****************************************************************************/
        public getAllMeshes2DForeground() : Array<LibMesh>
        {
            return [
                this.create2DMesh(
                    MfgImage.ORTHO_AUTO_SHOTGUN,
                    MfgSettings.CANVAS_WIDTH  - MfgInit.imageSystem.getImage(MfgImage.ORTHO_AUTO_SHOTGUN).width,
                    MfgSettings.CANVAS_HEIGHT - MfgInit.imageSystem.getImage(MfgImage.ORTHO_AUTO_SHOTGUN).height,
                    0.0,
                    1.0,
                    0.0,
                    1.0
                )
            ];
        }

        /*****************************************************************************
        *   Delivers the current level data 2D orthogonal faces for background drawing.
        *
        *   @return     All testwise ortho faces.
        *****************************************************************************/
        public getAllMeshes2DBackground( x: number, y:number, uMin:number, uMax:number, vMin:number, vMax:number ) : Array<LibMesh>
        {
            return [
                this.create2DMesh(
                    MfgImage.ORTHO_BG_LANDSCAPE,
                    x,
                    y,
                    uMin,
                    uMax,
                    vMin,
                    vMax
                )
            ];
        }

        /*****************************************************************************
        *   Creates all meshes for orthogonal drawing.
        *
        *   @return     An ortho mesh.
        *****************************************************************************/
        public create2DMesh( imageId:string, x:number, y:number, uMin:number, uMax:number, vMin:number, vMax:number ) : LibMesh
        {
            var image:HTMLImageElement = MfgInit.imageSystem.getImage( imageId );

            // where do these OFFSETs come from?
            var imgWidth       = image.width;
            var imgHeight      = image.height;

            y = ( imgHeight + y ) * -1;

            return new LibMesh(
                [
                    new LibFace
                    (
                        new LibVertex( x,            y,             0,  uMin, vMax ),
                        new LibVertex( x + imgWidth, y,             0,  uMax, vMax ),
                        new LibVertex( x,            y + imgHeight, 0,  uMin, vMin )
                    ),
                    new LibFace
                    (
                        new LibVertex( x,            y + imgHeight, 0,  uMin, vMin ),
                        new LibVertex( x + imgWidth, y,             0,  uMax, vMax ),
                        new LibVertex( x + imgWidth, y + imgHeight, 0,  uMax, vMin )
                    )
                ],
                image
            );
        }
    }
