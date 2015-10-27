
    /*****************************************************************************
    *   Handles 3D matrices that are used for calculations in 3D space.
    *
    *   @author     Christopher Stock
    *   @version    0.0.2
    *****************************************************************************/
    class LibMatrix
    {
        /*****************************************************************************
        *   Takes a  matrix and a vector with 4 entries, transforms that vector by
        *   the matrix, and returns the result as a vector with 4 entries.
        *
        *   @param  m   The matrix.
        *   @param  v   The point in homogenous coordinates.
        *   @return     The multiplied matrix.
        *****************************************************************************/
        public static matrixVectorMultiply( v:Float32Array, m:Float32Array ):Float32Array
        {
            var dst:Float32Array = new Float32Array( 4 );
            for ( var i = 0; i < 4; ++i )
            {
                dst[ i ] = 0.0;
                for ( var j = 0; j < 4; ++j )
                {
                    dst[ i ] += v[ j ] * m[ j * 4 + i ];
                }
            }
            return dst;
        }

        /*****************************************************************************
        *   Creates a new translation matrix containing the specified translation.
        *
        *   @param  tx  Translation X.
        *   @param  ty  Translation Y.
        *   @param  tz  Translation Z.
        *   @return     A new matrix.
        *****************************************************************************/
        public static createTranslationMatrix( tx:number, ty:number, tz:number ):Float32Array
        {
            var dst:Float32Array = new Float32Array( 16 );

            dst[ 0  ] = 1;      dst[ 1  ] = 0;      dst[ 2  ] = 0;      dst[ 3  ] = 0;
            dst[ 4  ] = 0;      dst[ 5  ] = 1;      dst[ 6  ] = 0;      dst[ 7  ] = 0;
            dst[ 8  ] = 0;      dst[ 9  ] = 0;      dst[ 10 ] = 1;      dst[ 11 ] = 0;
            dst[ 12 ] = tx;     dst[ 13 ] = ty;     dst[ 14 ] = tz;     dst[ 15 ] = 1;

            return dst;
        }

        /*****************************************************************************
        *   Creates the world matrix for the camera.
        *
        *   @param  camera      The position of the camera
        *   @param  target      The position of the target
        *   @param  up          The looking directory.
        *   @return dst         The view matrix containing the results.
        *****************************************************************************/
        public static createLookAtMatrix( camera:LibVertex, target:LibVertex, up:LibVertex )
        {
            var dst:Float32Array = new Float32Array( 16 );

            var zAxis:LibVertex = LibVertex.normalizeVector( LibVertex.subtractVectors( camera, target ) );
            var xAxis:LibVertex = LibVertex.normalizeVector( LibVertex.crossVector(     up,     zAxis  ) );
            var yAxis:LibVertex = LibVertex.normalizeVector( LibVertex.crossVector(     zAxis,  xAxis  ) );

            dst[ 0  ] = xAxis.x;        dst[ 1  ] = xAxis.y;        dst[ 2  ] = xAxis.z;        dst[ 3  ] = 0;
            dst[ 4  ] = yAxis.x;        dst[ 5  ] = yAxis.y;        dst[ 6  ] = yAxis.z;        dst[ 7  ] = 0;
            dst[ 8  ] = zAxis.x;        dst[ 9  ] = zAxis.y;        dst[ 10 ] = zAxis.z;        dst[ 11 ] = 0;
            dst[ 12 ] = camera.x;       dst[ 13 ] = camera.y;       dst[ 14 ] = camera.z;       dst[ 15 ] = 1;

            return dst;
        }

        /*****************************************************************************
        *   Computes a 4-by-4 perspective transformation matrix given the angular height
        *   of the frustum, the aspect ratio, and the near and far clipping planes.  The
        *   arguments define a frustum extending in the negative z direction.  The given
        *   angle is the vertical angle of the frustum, and the horizontal angle is
        *   determined to produce the given aspect ratio.  The arguments near and far are
        *   the distances to the near and far clipping planes.  Note that near and far
        *   are not z coordinates, but rather they are distances along the negative
        *   z-axis.  The matrix generated sends the viewing frustum to the unit box.
        *   We assume a unit box extending from -1 to 1 in the x and y dimensions and
        *   from -1 to 1 in the z dimension.
        *
        *   @param  fieldOfViewInDegrees    Field of view in degrees.
        *   @param  aspect                  Aspect of viewport (width / height).
        *   @param  near                    Near Z clipping plane.
        *   @param  far                     Far Z clipping plane.
        *   @return                         A new perspective matrix.
        *****************************************************************************/
        public static createPerspectiveMatrix( fieldOfViewInDegrees:number, aspect:number, near:number, far:number )
        {
            var dst:Float32Array = new Float32Array( 16 );
            var f:number         = Math.tan( Math.PI * 0.5 - 0.5 * LibMath2D.degToRad( fieldOfViewInDegrees ) );
            var rangeInv:number  = 1.0 / ( near - far );

            dst[ 0  ] = f / aspect;     dst[ 1  ] = 0;      dst[ 2  ] = 0;                          dst[ 3  ] = 0;
            dst[ 4  ] = 0;              dst[ 5  ] = f;      dst[ 6  ] = 0;                          dst[ 7  ] = 0;
            dst[ 8  ] = 0;              dst[ 9  ] = 0;      dst[ 10 ] = ( near + far ) * rangeInv;  dst[ 11 ] = -1;
            dst[ 12 ] = 0;              dst[ 13 ] = 0;      dst[ 14 ] = near * far * rangeInv * 2;  dst[ 15 ] = 0;

            return dst;
        }

        /*****************************************************************************
        *   Computes a 4-by-4 orthographic projection matrix given the coordinates of the planes defining the axis-aligned, box-shaped viewing volume.  The matrix
        *   generated sends that box to the unit box.  Note that although left and right are x coordinates and bottom and top are y coordinates, near and far
        *   are not z coordinates, but rather they are distances along the negative z-axis.  We assume a unit box extending from -1 to 1 in the x and y
        *   dimensions and from -1 to 1 in the z dimension.
        *
        *   @param  left    The x coordinate of the left plane of the box.
        *   @param  right   The x coordinate of the right plane of the box.
        *   @param  bottom  The y coordinate of the bottom plane of the box.
        *   @param  top     The y coordinate of the right plane of the box.
        *   @param  near    The negative z coordinate of the near plane of the box.
        *   @param  far     The negative z coordinate of the far plane of the box.
        *   @return         The orthographic view matrix.
        *****************************************************************************/
        public static createOrthographicMatrix( left:number, right:number, bottom:number, top:number, near:number, far:number )
        {
            var dst:Float32Array = new Float32Array( 16 );

            dst[ 0  ] = 2 / (right - left);                 dst[ 1  ] = 0;                                  dst[ 2  ] = 0;                              dst[ 3  ] = 0;
            dst[ 4  ] = 0;                                  dst[ 5  ] = 2 / (top - bottom);                 dst[ 6  ] = 0;                              dst[ 7  ] = 0;
            dst[ 8  ] = 0;                                  dst[ 9  ] = 0;                                  dst[ 10 ] = 2 / (near - far);               dst[ 11 ] = 0;
            dst[ 12 ] = (left + right) / (left - right);    dst[ 13 ] = (bottom + top) / (bottom - top);    dst[ 14 ] = (near + far) / (near - far);    dst[ 15 ] = 1;

            return dst;
        }

        /*****************************************************************************
        *   Creates a new x rotation matrix.
        *
        *   @param  angleInDegrees  Amount to rotate X.
        *   @return                 The matrix for rotation-X operations.
        *****************************************************************************/
        public static createXRotationMatrix( angleInDegrees:number )
        {
            var dst:Float32Array = new Float32Array( 16 );
            var c:number         = LibMath2D.cosDeg( angleInDegrees );
            var s:number         = LibMath2D.sinDeg( angleInDegrees );

            dst[ 0  ] = 1;      dst[ 1  ] = 0;      dst[ 2  ] = 0;      dst[ 3  ] = 0;
            dst[ 4  ] = 0;      dst[ 5  ] = c;      dst[ 6  ] = s;      dst[ 7  ] = 0;
            dst[ 8  ] = 0;      dst[ 9  ] = -s;     dst[ 10 ] = c;      dst[ 11 ] = 0;
            dst[ 12 ] = 0;      dst[ 13 ] = 0;      dst[ 14 ] = 0;      dst[ 15 ] = 1;

            return dst;
        }

        /*****************************************************************************
        *   Creates a new y rotation matrix.
        *
        *   @param  angleInDegrees  Amount to rotate Y.
        *   @return                 The matrix for rotation-Y operations.
        *****************************************************************************/
        public static createYRotationMatrix( angleInDegrees:number )
        {
            var dst:Float32Array = new Float32Array( 16 );
            var c:number         = LibMath2D.cosDeg( angleInDegrees );
            var s:number         = LibMath2D.sinDeg( angleInDegrees );

            dst[ 0  ] = c;      dst[ 1  ] = 0;      dst[ 2  ] = -s;     dst[ 3  ] = 0;
            dst[ 4  ] = 0;      dst[ 5  ] = 1;      dst[ 6  ] = 0;      dst[ 7  ] = 0;
            dst[ 8  ] = s;      dst[ 9  ] = 0;      dst[ 10 ] = c;      dst[ 11 ] = 0;
            dst[ 12 ] = 0;      dst[ 13 ] = 0;      dst[ 14 ] = 0;      dst[ 15 ] = 1;

            return dst;
        }

        /*****************************************************************************
        *   Creates a new z rotation matrix.
        *
        *   @param  angleInDegrees  Amount to rotate Z.
        *   @return                 The matrix for rotation-Z operations.
        *****************************************************************************/
        public static createZRotationMatrix( angleInDegrees:number )
        {
            var dst:Float32Array = new Float32Array( 16 );
            var c:number         = LibMath2D.cosDeg( angleInDegrees );
            var s:number         = LibMath2D.sinDeg( angleInDegrees );

            dst[ 0  ] = c;      dst[ 1  ] = s;      dst[ 2  ] = 0;      dst[ 3  ] = 0;
            dst[ 4  ] = -s;     dst[ 5  ] = c;      dst[ 6  ] = 0;      dst[ 7  ] = 0;
            dst[ 8  ] = 0;      dst[ 9  ] = 0;      dst[ 10 ] = 1;      dst[ 11 ] = 0;
            dst[ 12 ] = 0;      dst[ 13 ] = 0;      dst[ 14 ] = 0;      dst[ 15 ] = 1;

            return dst;
        }

        /*****************************************************************************
        *   Takes two 4-by-4 matrices, a and b, and computes the product in the order
        *   that pre-composes b with a.  In other words, the matrix returned will
        *   transform by b first and then a.  Note this is subtly different from just
        *   multiplying the matrices together.  For given a and b, this function returns
        *   the same object in both row-major and column-major mode.
        *
        *   @param  m1  Matrix 1.
        *   @param  m2  Matrix 2.
        *   @return     The multiplied new matrix.
        *****************************************************************************/
        public static multiplyMatrices( m1:Float32Array, m2:Float32Array ):Float32Array
        {
            var dst:Float32Array = new Float32Array( 16 );

            var a00 = m1[ 0 * 4 + 0 ];       var a01 = m1[ 0 * 4 + 1 ];       var a02 = m1[ 0 * 4 + 2 ];       var a03 = m1[ 0 * 4 + 3 ];
            var a10 = m1[ 1 * 4 + 0 ];       var a11 = m1[ 1 * 4 + 1 ];       var a12 = m1[ 1 * 4 + 2 ];       var a13 = m1[ 1 * 4 + 3 ];
            var a20 = m1[ 2 * 4 + 0 ];       var a21 = m1[ 2 * 4 + 1 ];       var a22 = m1[ 2 * 4 + 2 ];       var a23 = m1[ 2 * 4 + 3 ];
            var a30 = m1[ 3 * 4 + 0 ];       var a31 = m1[ 3 * 4 + 1 ];       var a32 = m1[ 3 * 4 + 2 ];       var a33 = m1[ 3 * 4 + 3 ];
            var b00 = m2[ 0 * 4 + 0 ];       var b01 = m2[ 0 * 4 + 1 ];       var b02 = m2[ 0 * 4 + 2 ];       var b03 = m2[ 0 * 4 + 3 ];
            var b10 = m2[ 1 * 4 + 0 ];       var b11 = m2[ 1 * 4 + 1 ];       var b12 = m2[ 1 * 4 + 2 ];       var b13 = m2[ 1 * 4 + 3 ];
            var b20 = m2[ 2 * 4 + 0 ];       var b21 = m2[ 2 * 4 + 1 ];       var b22 = m2[ 2 * 4 + 2 ];       var b23 = m2[ 2 * 4 + 3 ];
            var b30 = m2[ 3 * 4 + 0 ];       var b31 = m2[ 3 * 4 + 1 ];       var b32 = m2[ 3 * 4 + 2 ];       var b33 = m2[ 3 * 4 + 3 ];

            dst[ 0  ] = a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30;
            dst[ 1  ] = a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31;
            dst[ 2  ] = a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32;
            dst[ 3  ] = a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33;
            dst[ 4  ] = a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30;
            dst[ 5  ] = a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31;
            dst[ 6  ] = a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32;
            dst[ 7  ] = a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33;
            dst[ 8  ] = a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30;
            dst[ 9  ] = a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31;
            dst[ 10 ] = a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32;
            dst[ 11 ] = a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33;
            dst[ 12 ] = a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30;
            dst[ 13 ] = a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31;
            dst[ 14 ] = a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32;
            dst[ 15 ] = a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33;

            return dst;
        }

        /*****************************************************************************
        *   Copies the specified matrix.
        *
        *   @param  src The matrix to copy
        *   @return     A copy of the specified matrix.
        *****************************************************************************/
        public static copyMatrix( src:Float32Array ):Float32Array
        {
            var dst:Float32Array = new Float32Array( 16 );

            dst[ 0  ] = src[ 0  ];  dst[ 1  ] = src[ 1  ];  dst[ 2  ] = src[ 2  ];  dst[ 3  ] = src[ 3  ];
            dst[ 4  ] = src[ 4  ];  dst[ 5  ] = src[ 5  ];  dst[ 6  ] = src[ 6  ];  dst[ 7  ] = src[ 7  ];
            dst[ 8  ] = src[ 8  ];  dst[ 9  ] = src[ 9  ];  dst[ 10 ] = src[ 10 ];  dst[ 11 ] = src[ 11 ];
            dst[ 12 ] = src[ 12 ];  dst[ 13 ] = src[ 13 ];  dst[ 14 ] = src[ 14 ];  dst[ 15 ] = src[ 15 ];

            return dst;
        }

        /*****************************************************************************
        *   Computes the inverse of a matrix.
        *
        *   @param  m   Matrix to compute inverse of.
        *   @return     The inverted matrix.
        *****************************************************************************/
        public static inverseMatrix( m:Float32Array ):Float32Array
        {
            var dst:Float32Array = new Float32Array( 16 );

            var m00 = m[ 0 * 4 + 0 ];   var m01 = m[ 0 * 4 + 1 ];   var m02 = m[ 0 * 4 + 2 ];   var m03 = m[ 0 * 4 + 3 ];
            var m10 = m[ 1 * 4 + 0 ];   var m11 = m[ 1 * 4 + 1 ];   var m12 = m[ 1 * 4 + 2 ];   var m13 = m[ 1 * 4 + 3 ];
            var m20 = m[ 2 * 4 + 0 ];   var m21 = m[ 2 * 4 + 1 ];   var m22 = m[ 2 * 4 + 2 ];   var m23 = m[ 2 * 4 + 3 ];
            var m30 = m[ 3 * 4 + 0 ];   var m31 = m[ 3 * 4 + 1 ];   var m32 = m[ 3 * 4 + 2 ];   var m33 = m[ 3 * 4 + 3 ];

            var tmp_0  = m22 * m33;     var tmp_1  = m32 * m23;     var tmp_2  = m12 * m33;     var tmp_3  = m32 * m13;
            var tmp_4  = m12 * m23;     var tmp_5  = m22 * m13;     var tmp_6  = m02 * m33;     var tmp_7  = m32 * m03;
            var tmp_8  = m02 * m23;     var tmp_9  = m22 * m03;     var tmp_10 = m02 * m13;     var tmp_11 = m12 * m03;
            var tmp_12 = m20 * m31;     var tmp_13 = m30 * m21;     var tmp_14 = m10 * m31;     var tmp_15 = m30 * m11;
            var tmp_16 = m10 * m21;     var tmp_17 = m20 * m11;     var tmp_18 = m00 * m31;     var tmp_19 = m30 * m01;
            var tmp_20 = m00 * m21;     var tmp_21 = m20 * m01;     var tmp_22 = m00 * m11;     var tmp_23 = m10 * m01;

            var t0 = ( tmp_0 * m11 + tmp_3 * m21 + tmp_4  * m31 ) - ( tmp_1 * m11 + tmp_2 * m21 + tmp_5  * m31 );
            var t1 = ( tmp_1 * m01 + tmp_6 * m21 + tmp_9  * m31 ) - ( tmp_0 * m01 + tmp_7 * m21 + tmp_8  * m31 );
            var t2 = ( tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31 ) - ( tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31 );
            var t3 = ( tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21 ) - ( tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21 );

            var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

            dst[ 0  ] = d * t0;
            dst[ 1  ] = d * t1;
            dst[ 2  ] = d * t2;
            dst[ 3  ] = d * t3;
            dst[ 4  ] = d * ( ( tmp_1  * m10 + tmp_2  * m20 + tmp_5  * m30 ) - ( tmp_0  * m10 + tmp_3  * m20 + tmp_4  * m30 ) );
            dst[ 5  ] = d * ( ( tmp_0  * m00 + tmp_7  * m20 + tmp_8  * m30 ) - ( tmp_1  * m00 + tmp_6  * m20 + tmp_9  * m30 ) );
            dst[ 6  ] = d * ( ( tmp_3  * m00 + tmp_6  * m10 + tmp_11 * m30 ) - ( tmp_2  * m00 + tmp_7  * m10 + tmp_10 * m30 ) );
            dst[ 7  ] = d * ( ( tmp_4  * m00 + tmp_9  * m10 + tmp_10 * m20 ) - ( tmp_5  * m00 + tmp_8  * m10 + tmp_11 * m20 ) );
            dst[ 8  ] = d * ( ( tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33 ) - ( tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33 ) );
            dst[ 9  ] = d * ( ( tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33 ) - ( tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33 ) );
            dst[ 10 ] = d * ( ( tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33 ) - ( tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33 ) );
            dst[ 11 ] = d * ( ( tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23 ) - ( tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23 ) );
            dst[ 12 ] = d * ( ( tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12 ) - ( tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22 ) );
            dst[ 13 ] = d * ( ( tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22 ) - ( tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02 ) );
            dst[ 14 ] = d * ( ( tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02 ) - ( tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12 ) );
            dst[ 15 ] = d * ( ( tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12 ) - ( tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02 ) );

            return dst;
        }
    }
