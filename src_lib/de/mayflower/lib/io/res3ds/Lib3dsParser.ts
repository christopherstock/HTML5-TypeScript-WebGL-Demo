
    /********************************************************************************
    *   A parser that outputs faces and materials from a specified
    *   3d studio max ASCII Scene Export File (.ASE).
    *
    *   @author     Christopher Stock
    *   @version    0.0.1
    ********************************************************************************/
    class Lib3dsParser
    {
        /** All vertex-coordinates from the .ase-file are DIVIDED by this factor during import. */
        public      static          POINTS_SCALATION        :number                     = 10;
        /** Number of faces in one d3ds-files for triggering a 'high poly model' warning. */
        public      static          MAX_FACES               :number                     = 3000;

        /** The debug context. */
        private                     debug                   :LibDebug                   = null;
        /** All parsed triangles. */
        private                     faces                   :Array<Lib3dsTriangle>      = null;
        /** All parsed materials. */
        private                     materials               :Array<Lib3dsMaterial>      = null;

        /*************************************************************************************
        *   Parses the given content of an .ASE file and assigns the parsed faces and materials.
        *
        *   @param  fileContent The content of the .ASE file to parse.
        *   @param  debug       The debug context.
        *************************************************************************************/
        constructor( fileContent:string, debug:LibDebug )
        {
            this.debug = debug;

            this.debug.log( "=======================================" );
            this.debug.log( "Parsing 3dsmax content ... " );
/*
            //pick and parse materials
            var chunkMaterialList:string = LibStrings.getViaRegEx( fileSrc, "\\*MATERIAL_LIST \\{.+?\\n\\}" )[ 0 ];
            parseMaterials( chunkMaterialList );

            //pick and parse meshes
            var chunksGeomObjects:Array<string> = LibStrings.getViaRegEx( fileSrc, "\\*GEOMOBJECT \\{.+?\\n\\}"    );
            parseMeshes( chunksGeomObjects );

            //warning if more than max faces
            if ( iFaces.length > MAX_FACES )
            {
                this.debug.log( "WARNING! 3dsmax-file [" + iFilename + "] specifies more than [" + MAX_FACES + "] faces - [" + iFaces.length + "] faces defined" );
            }
*/
        }

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

        private parseMeshes( meshesSrc:Array<string> ):void
        {
/*
            iDebug.out( "meshes to parse: [" + meshesSrc.length + "]" );

            Vector<LibMaxTriangle>      allFaces                = new Vector<LibMaxTriangle>();
            LibMaxVertex[]              vertices3ds             = null;
            LibMaxFace[]                faces3ds                = null;
            LibMaxTextureVertex[]       textureVertices3ds      = null;

            //browse all meshes
            int cur = 0;
            for ( String meshSrc : meshesSrc )
            {
                //BufferedReader inStream = new BufferedReader( new StringReader( chunksGeomObjects[ i ] ) );

                //next texture!
                ++cur;
                iDebug.out( "\nImporting mesh # [" + cur + "]" );

                //get number of vertices
                String[][]  numVerticesAA   = LibStrings.getViaRegExGrouped( meshSrc, 1, "\\*MESH_NUMVERTEX (\\d+)" );
                int         numVertices     = Integer.parseInt( numVerticesAA[ 0 ][ 0 ] );
                            vertices3ds     = new LibMaxVertex[ numVertices ];
                iDebug.out( "number of vertices: [" + numVertices + "]" );

                //get number of faces
                String[][]  numFacesAA      = LibStrings.getViaRegExGrouped( meshSrc, 1, "\\*MESH_NUMFACES (\\d+)" );
                int         numFaces        = Integer.parseInt( numFacesAA[ 0 ][ 0 ] );
                            faces3ds        = new LibMaxFace[ numFaces ];
                iDebug.out( "number of faces: [" + numFaces + "]" );

                //get number of texture-vertices
                String[][]  numTVerticesAA      = LibStrings.getViaRegExGrouped( meshSrc, 1, "\\*MESH_NUMTVERTEX (\\d+)" );
                int         numTVertices        = Integer.parseInt( numTVerticesAA[ 0 ][ 0 ] );
                            textureVertices3ds  = new LibMaxTextureVertex[ numTVertices ];
                iDebug.out( "number of texture-vertices: [" + numTVertices + "]" );

                //read all vertices
                String[][]  verticesAA      = LibStrings.getViaRegExGrouped( meshSrc, 3, "\\*MESH_VERTEX\\s+\\d+\\s+([\\d\\.\\-]+)\\s+([\\d\\.\\-]+)\\s+([\\d\\.\\-]+)\\n" );
                iDebug.out( "parsing [" + verticesAA.length + "] vertices.." );
                //assign them
                for ( int i = 0; i < verticesAA.length; ++i )
                {
                    //assign all vertices
                    vertices3ds[ i ] = new LibMaxVertex
                    (
                        Float.parseFloat( verticesAA[ i ][ 0 ] ) / POINTS_SCALATION,
                        Float.parseFloat( verticesAA[ i ][ 1 ] ) / POINTS_SCALATION,
                        Float.parseFloat( verticesAA[ i ][ 2 ] ) / POINTS_SCALATION
                    );
                    //Debug.d3dsRegEx.out( "[" + verticesAA[ i ][ 0 ] + "][" + verticesAA[ 0 ][ 1 ] + "][" + verticesAA[ 0 ][ 2 ] + "]" );
                }

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

                //read all faces
                String[][]  facesAA         = LibStrings.getViaRegExGrouped( meshSrc, 4, "\\*MESH_FACE\\s+(\\d+)\\:\\s+A\\:\\s+([\\d\\.\\-]+)\\s+B\\:\\s+([\\d\\.\\-]+)\\s+C\\:\\s+([\\d\\.\\-]+)" );
                iDebug.out( "parsing [" + facesAA.length + "] faces.." );
                //assign them
                for ( int i = 0; i < facesAA.length; ++i )
                {
                    //assign all faces
                    faces3ds[ i ] = new LibMaxFace
                    (
                        ( facesNormals == null ? null : facesNormals[ i ] ),
                        vertices3ds[ Integer.parseInt( facesAA[ i ][ 1 ] ) ],
                        vertices3ds[ Integer.parseInt( facesAA[ i ][ 2 ] ) ],
                        vertices3ds[ Integer.parseInt( facesAA[ i ][ 3 ] ) ]
                    );
                }

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

                //add all faces to the vector
                for( LibMaxFace face : faces3ds )
                {
                    //Debug.d3dsRegEx.out( "CREATE FACE!" + material.name );
                    try
                    {
                        //create free-triangle and add it to the faces stack
                        LibMaxTriangle ft = new LibMaxTriangle
                        (
                            new LibVertex( 0.0f, 0.0f, 0.0f ),
                            material.name,
                            material.color,
                            new LibVertex ( face.vertex1.y,     face.vertex1.x,     face.vertex1.z, ( face.vertex1.u + material.offsetU ) * material.tilingU, ( face.vertex1.v + material.offsetV ) * material.tilingV ),
                            new LibVertex ( face.vertex2.y,     face.vertex2.x,     face.vertex2.z, ( face.vertex2.u + material.offsetU ) * material.tilingU, ( face.vertex2.v + material.offsetV ) * material.tilingV ),
                            new LibVertex ( face.vertex3.y,     face.vertex3.x,     face.vertex3.z, ( face.vertex3.u + material.offsetU ) * material.tilingU, ( face.vertex3.v + material.offsetV ) * material.tilingV ),
                            ( face.iFaceNormal == null ? null : new LibVertex ( face.iFaceNormal.y, face.iFaceNormal.x, face.iFaceNormal.z  ) )
                        );
                        allFaces.add( ft );
                    }
                    catch ( Exception ioe )
                    {
                        iDebug.err( "I/O Exception on writing parsed ASE-File!" );
                        iDebug.trace( ioe );
                    }
                }
            }

            //convert all faces from vector to array
            iFaces = allFaces.toArray( new LibMaxTriangle[] {} );

            //done
            iDebug.out( "done" );
*/
        }

        public getFaces():Array<Lib3dsTriangle>
        {
            return this.faces;
        }
    }
