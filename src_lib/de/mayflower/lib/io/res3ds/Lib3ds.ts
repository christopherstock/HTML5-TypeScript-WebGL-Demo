
    /********************************************************************************
    *   A parser that outputs faces and materials from a specified
    *   3d studio max ASCII Scene Export File (.ase).
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ********************************************************************************/
    class Lib3ds
    {
        /** The factor to DIVIDE all vertex-coordinates from the .ase-file during import. */
        public      static          POINTS_SCALATION        :number                     = 10;
        /** Specifies number of faces for triggering a 'high poly model' warning. */
        public      static          MAX_FACES               :number                     = 1000;

        /** The debug context. */
        private                     debug                   :LibDebug                   = null;
        /** All parsed triangles. */
        private                     faces                   :Array<Lib3dsTriangle>      = null;
        /** All parsed materials. */
        private                     materials               :Array<Lib3dsMaterial>      = null;

        /*************************************************************************************
        *   Parses the given content of an .ase file and assigns the parsed faces and materials.
        *
        *   @param  fileContent The content of the .ase file to parse.
        *   @param  debug       The debug context.
        *************************************************************************************/
        constructor( fileContent:string, debug:LibDebug )
        {
            this.debug = debug;

            this.debug.log( "=======================================" );
            this.debug.log( "Parsing 3dsmax content ... [" + fileContent.length + "] chars" );

            //pick and parse materials
            var chunkMaterialList:string = LibString.searchRegEx( fileContent, /\*MATERIAL_LIST \{[\s\S]+?\n}/ )[ 0 ];
            this.debug.log( "material list [" + chunkMaterialList.length + "] chars" );
//            this.parseMaterials( chunkMaterialList );

            //pick and parse meshes
            var chunksGeomObjects:Array<string> = LibString.searchRegEx( fileContent, /\*GEOMOBJECT \{[\s\S]+?\n}/g );
            this.parseMeshes( chunksGeomObjects );
/*
            //warning if more than max faces
            if ( iFaces.length > MAX_FACES )
            {
                this.debug.log( "WARNING! 3dsmax-file [" + iFilename + "] specifies more than [" + MAX_FACES + "] faces - [" + iFaces.length + "] faces defined" );
            }
*/
        }

        /*************************************************************************************
        *   Parses the given textfile chunk for all specified materials.
        *
        *   @param  src     The textfile chunk that contains all material information.
        *************************************************************************************/
        private parseMaterials( src:String ):void
        {
/*
            //check if materials are defined
            String[] chunksMaterials = LibStrings.getViaRegEx( src, "\\t\\*MATERIAL \\d+ \\{.+?\\n\\t\\}" );
            if ( chunksMaterials != null )
            {
                //browse all material-chunks and assign all materials
                iMaterials3ds = new LibMaxMaterial[ chunksMaterials.length ];
                for ( int i = 0; i < chunksMaterials.length; ++i )
                {
                    //get material name ( mandatory )
                    String[][]  materialNameAa  = LibStrings.getViaRegExGrouped( chunksMaterials[ i ], 1, "\\*MATERIAL_NAME \"([^\"]+)\"" );
                    String      materialName    = materialNameAa[ 0 ][ 0 ];
                    LibColors   materialColor   = LibColors.getByName( materialName );

                    //get material offsets ( optional )
                    String[][]  materialOffsetUaa = LibStrings.getViaRegExGrouped( chunksMaterials[ i ], 1, "\\*UVW_U_OFFSET ([\\-\\d\\.]+)" );
                    float       materialOffsetU   = ( materialOffsetUaa == null ? 0.0f : Float.parseFloat( materialOffsetUaa[ 0 ][ 0 ] ) );
                    String[][]  materialOffsetVaa = LibStrings.getViaRegExGrouped( chunksMaterials[ i ], 1, "\\*UVW_V_OFFSET ([\\-\\d\\.]+)" );
                    float       materialOffsetV   = ( materialOffsetVaa == null ? 0.0f : Float.parseFloat( materialOffsetVaa[ 0 ][ 0 ] ) );

                    //get material tiling ( optional )
                    String[][]  materialTilingUaa = LibStrings.getViaRegExGrouped( chunksMaterials[ i ], 1, "\\*UVW_U_TILING ([\\-\\d\\.]+)" );
                    float       materialTilingU   = ( materialTilingUaa == null ? 1.0f : Float.parseFloat( materialTilingUaa[ 0 ][ 0 ] ) );
                    String[][]  materialTilingVaa = LibStrings.getViaRegExGrouped( chunksMaterials[ i ], 1, "\\*UVW_V_TILING ([\\-\\d\\.]+)" );
                    float       materialTilingV   = ( materialTilingVaa == null ? 1.0f : Float.parseFloat( materialTilingVaa[ 0 ][ 0 ] ) );

                    //assign material
                    iMaterials3ds[ i ] = new LibMaxMaterial( materialName, materialColor, materialOffsetU, materialOffsetV, materialTilingU, materialTilingV  );
                    iDebug.out( "Material [" + i + "]: [" + iMaterials3ds[ i ].name + "][" + iMaterials3ds[ i ].offsetU + "][" + iMaterials3ds[ i ].offsetV + "][" + iMaterials3ds[ i ].tilingU + "][" + iMaterials3ds[ i ].tilingV + "]" );
                }
            }
*/
        }

        /*************************************************************************************
        *   Parses all given textfile chunk for all specified meshes.
        *
        *   @param  srcMeshes   All textfile chunks each containing one mesh.
        *************************************************************************************/
        private parseMeshes( srcMeshes:Array<string> ):void
        {
            this.debug.log( " meshes to parse: [" + srcMeshes.length + "]" );

            var allFaces           :Array<Lib3dsTriangle>       = [];
            var vertices3ds        :Array<Lib3dsVertex>         = [];
            var faces3ds           :Array<Lib3dsFace>           = [];
            var textureVertices3ds :Array<Lib3dsTextureVertex>  = [];

            //browse all meshes
            for ( var meshIndex:number = 0; meshIndex < srcMeshes.length; ++meshIndex )
            {
                this.debug.log( " Importing mesh # [" + meshIndex + "]" );

                var srcMesh = srcMeshes[ meshIndex ];

                //get number of vertices
                var numVertices:string = LibString.searchRegEx( srcMesh, /\*MESH_NUMVERTEX (\d+)/ )[ 1 ];
                this.debug.log( " number of vertices: [" + numVertices + "]" );

                //get number of faces
                var numFaces:string = LibString.searchRegEx( srcMesh, /\*MESH_NUMFACES (\d+)/ )[ 1 ];
                this.debug.log( " number of faces: [" + numFaces + "]" );

                //get number of texture-vertices
                var numTextureVertices:string = LibString.searchRegEx( srcMesh, /\*MESH_NUMTVERTEX (\d+)/ )[ 1 ];
                this.debug.log( " number of texture-vertices: [" + numTextureVertices + "]" );

                //read all vertices
                var verticesChunks:Array<string> = LibString.searchRegEx( srcMesh, /\*MESH_VERTEX\s+\d+\s+[\s\S]+?\n/g );
                this.debug.log( " parsing [" + verticesChunks.length + "] vertices chunks.." );
                for ( var i:number = 0; i < verticesChunks.length; ++i )
                {
                    var verticesParsed:Array<string> = LibString.searchRegEx( verticesChunks[ i ], /\*MESH_VERTEX\s+\d+\s+([\d\.\-]+)\s+([\d\.\-]+)\s+([\d\.\-]+)/ );
                    this.debug.log( "  [" + verticesParsed[ 1 ] + "][" + verticesParsed[ 2 ] + "][" + verticesParsed[ 3 ] + "]" );

                    //assign all vertices
                    vertices3ds[ i ] = new Lib3dsVertex
                    (
                        parseFloat( verticesParsed[ 1 ] ) / Lib3ds.POINTS_SCALATION,
                        parseFloat( verticesParsed[ 2 ] ) / Lib3ds.POINTS_SCALATION,
                        parseFloat( verticesParsed[ 3 ] ) / Lib3ds.POINTS_SCALATION
                    );
                }
/*
                //read all face normals ( optional )
                String[][]  facesNormalsAA  = LibStrings.getViaRegExGrouped( meshSrc, 4, "\\*MESH_FACENORMAL\\s+(\\d+)\\s+([\\d\\.\\-]+)\\s+([\\d\\.\\-]+)\\s+([\\d\\.\\-]+)" );
                LibMaxVertex[] facesNormals    = null;
                if ( facesNormalsAA != null )
                {
                    facesNormals = new LibMaxVertex[ facesNormalsAA.length ];

                    for ( int i = 0; i < facesNormalsAA.length; ++i )
                    {
                        facesNormals[ i ] = new LibMaxVertex
                        (
                            Float.parseFloat( facesNormalsAA[ i ][ 1 ] ),
                            Float.parseFloat( facesNormalsAA[ i ][ 2 ] ),
                            Float.parseFloat( facesNormalsAA[ i ][ 3 ] )
                        );
                    }

                    iDebug.out( "parsed [" + facesNormalsAA.length + "] face-normals" );
                }
*/
                //read all faces
                var facesChunks:Array<string> = LibString.searchRegEx( srcMesh, /\*MESH_FACE\s+\d+:\s+[\s\S]+?\n/g );
                this.debug.log( " parsing [" + facesChunks.length + "] faces chunks.." );
                for ( var i:number = 0; i < facesChunks.length; ++i )
                {
                    var facesParsed:Array<string> = LibString.searchRegEx( facesChunks[ i ], /\*MESH_FACE\s+(\d+):\s+A:\s+([\d\.\-]+)\s+B:\s+([\d\.\-]+)\s+C:\s+([\d\.\-]+)/ );
                    this.debug.log( "  [" + facesParsed[ 2 ] + "][" + facesParsed[ 3 ] + "][" + facesParsed[ 4 ] + "]" );

                    //assign all faces
                    faces3ds[ i ] = new Lib3dsFace
                    (
                        null, //( facesNormals == null ? null : facesNormals[ i ] ),
                        vertices3ds[ facesParsed[ 2 ] ],
                        vertices3ds[ facesParsed[ 3 ] ],
                        vertices3ds[ facesParsed[ 4 ] ]
                    );
                }
/*
                //read all texture-vertices
                String[][]  textureVerticesAA      = LibStrings.getViaRegExGrouped( meshSrc, 3, "\\*MESH_TVERT\\s+\\d+\\s+([\\d\\.\\-]+)\\s+([\\d\\.\\-]+)\\s+([\\d\\.\\-]+)\\n" );
                if ( textureVerticesAA != null )
                {
                    iDebug.out( "parsing [" + textureVerticesAA.length + "] texture-vertices.." );
                    //assign them
                    for ( int i = 0; i < textureVerticesAA.length; ++i )
                    {
                        //assign all vertices
                        textureVertices3ds[ i ] = new LibMaxTextureVertex
                        (
                            Float.parseFloat( textureVerticesAA[ i ][ 0 ] ),
                            Float.parseFloat( textureVerticesAA[ i ][ 1 ] )
                        );
                        //Debug.d3dsRegEx.out( "[" + textureVerticesAA[ i ][ 0 ] + "][" + textureVerticesAA[ i ][ 1 ] + "][" + textureVerticesAA[ i ][ 2 ] + "]" );
                    }
                }

                //read all texture-faces and assign them
                String[][]  textureFacesAA         = LibStrings.getViaRegExGrouped( meshSrc, 3, "\\*MESH_TFACE\\s+\\d+\\s+([\\d\\.\\-]+)\\s+([\\d\\.\\-]+)\\s+([\\d\\.\\-]+)\\n" );
                if ( textureFacesAA != null )
                {
                    iDebug.out( "parsing [" + textureFacesAA.length + "] texture-faces.." );
                    for ( int currentTextureFace = 0; currentTextureFace < faces3ds.length; ++currentTextureFace )
                    {
                        //assign all texture-faces
                        faces3ds[ currentTextureFace ].vertex1.u = textureVertices3ds[ Integer.parseInt( textureFacesAA[ currentTextureFace ][ 0 ] ) ].u;
                        faces3ds[ currentTextureFace ].vertex1.v = textureVertices3ds[ Integer.parseInt( textureFacesAA[ currentTextureFace ][ 0 ] ) ].v;
                        faces3ds[ currentTextureFace ].vertex2.u = textureVertices3ds[ Integer.parseInt( textureFacesAA[ currentTextureFace ][ 1 ] ) ].u;
                        faces3ds[ currentTextureFace ].vertex2.v = textureVertices3ds[ Integer.parseInt( textureFacesAA[ currentTextureFace ][ 1 ] ) ].v;
                        faces3ds[ currentTextureFace ].vertex3.u = textureVertices3ds[ Integer.parseInt( textureFacesAA[ currentTextureFace ][ 2 ] ) ].u;
                        faces3ds[ currentTextureFace ].vertex3.v = textureVertices3ds[ Integer.parseInt( textureFacesAA[ currentTextureFace ][ 2 ] ) ].v;
                    }
                }

                //set material used if an error occurs on mapping textures ..
                LibMaxMaterial material = new LibMaxMaterial( null, LibColors.ERed, 0.0f, 0.0f, 1.0f, 1.0f );

                //get number of texture-vertices
                String[][]  materialRefAA       = LibStrings.getViaRegExGrouped( meshSrc, 1, "\\*MATERIAL_REF (\\d+)" );
                if ( materialRefAA != null )
                {
                    int         materialRef         = Integer.parseInt( materialRefAA[ 0 ][ 0 ] );
                    material = iMaterials3ds[ materialRef ];
                    iDebug.out( "material ref is: [" + materialRef + "]" );
                }
                else
                {
                    iDebug.out( "This mesh has no material." );
                }

                iDebug.out( "picked texture: " + material.name );
*/
                //construct all triangles
                this.faces = [];
                for ( var i:number = 0; i < faces3ds.length; ++i )
                {
                    var triangle:Lib3dsTriangle = new Lib3dsTriangle
                    (
                        new LibVertex( 0.0, 0.0, 0.0, 0.0, 0.0 ),
                        null, //material.name,
                        null, //material.color,

                        new LibVertex( faces3ds[ i ].vertex1.x,     faces3ds[ i ].vertex1.y,    faces3ds[ i ].vertex1.z, 0.0, 1.0 ),
                        new LibVertex( faces3ds[ i ].vertex2.x,     faces3ds[ i ].vertex2.y,    faces3ds[ i ].vertex2.z, 0.0, 1.0 ),
                        new LibVertex( faces3ds[ i ].vertex3.x,     faces3ds[ i ].vertex3.y,    faces3ds[ i ].vertex3.z, 0.0, 1.0 ),
/*
                        new LibVertex( face.vertex1.y,     face.vertex1.x,     face.vertex1.z, ( face.vertex1.u + material.offsetU ) * material.tilingU, ( face.vertex1.v + material.offsetV ) * material.tilingV ),
                        new LibVertex( face.vertex2.y,     face.vertex2.x,     face.vertex2.z, ( face.vertex2.u + material.offsetU ) * material.tilingU, ( face.vertex2.v + material.offsetV ) * material.tilingV ),
                        new LibVertex( face.vertex3.y,     face.vertex3.x,     face.vertex3.z, ( face.vertex3.u + material.offsetU ) * material.tilingU, ( face.vertex3.v + material.offsetV ) * material.tilingV ),
*/
                        null //( face.iFaceNormal == null ? null : new LibVertex ( face.iFaceNormal.y, face.iFaceNormal.x, face.iFaceNormal.z  ) )
                    );
                    this.faces.push( triangle );
                }
            }

            //done
            this.debug.log( " done parsing meshes" );
        }

        /*************************************************************************************
        *   Delivers all parsed faces from this imported 3ds max .ase file.
        *
        *   @return     All parsed faces from this file.
        *************************************************************************************/
        public getFaces():Array<Lib3dsTriangle>
        {
            return this.faces;
        }
    }
