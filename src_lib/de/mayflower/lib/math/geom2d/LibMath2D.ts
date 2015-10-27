
    /*****************************************************************************
    *   Offers trigonometry functions.
    *
    *   @author     Christopher Stock
    *   @version    0.0.2
    *****************************************************************************/
    class LibMath2D
    {
        /*****************************************************************************
        *   Delivers the sin value of the given angle in degrees.
        *
        *   @param  degrees     An angle to get the sin for. Not in radiants but in degrees.
        *   @return             The sin-value for the specified angle.
        *****************************************************************************/
        public static sinDeg( degrees:number ):number
        {
            return Math.sin( LibMath2D.degToRad( degrees ) );
        }

        /*****************************************************************************
        *   Delivers the cos value of the given angle in degrees.
        *
        *   @param  degrees     An angle to get the cos for. Not in radiants but in degrees.
        *   @return             The cos-value for the specified angle.
        *****************************************************************************/
        public static cosDeg( degrees:number ):number
        {
            return Math.cos( LibMath2D.degToRad( degrees ) );
        }

        /*****************************************************************************
        *   Returns the distant point from a specified point with the
        *   specified angle and distance in degrees.
        *
        *   @param  point       The center point for this sin/cos operation.
        *   @param  degrees     The angle for the distance. In degrees.
        *   @param  distX       The distance X from center.
        *   @param  distY       The distance Y from center.
        *   @return             The distant point.
        *****************************************************************************/
        public static sinCosPoint( point:LibPoint2D, degrees:number, distX:number, distY:number ):LibPoint2D
        {
            return new LibPoint2D
            (
                point.x + LibMath2D.cosDeg( degrees ) * distX,
                point.y + LibMath2D.sinDeg( degrees ) * distY
            );
        }

        /*****************************************************************************
        *   Converts the specified radians value to degrees.
        *
        *   @param  radians The value in radians.
        *   @return         The equivalent value in degrees.
        *****************************************************************************/
        public static radToDeg( radians:number )
        {
            return ( radians * 180 / Math.PI );
        }

        /*****************************************************************************
        *   Converts the specified degree value to radians.
        *
        *   @param  degrees The value in degrees.
        *   @return         The equivalent value in radians.
        *****************************************************************************/
        public static degToRad( degrees:number )
        {
            return ( degrees * Math.PI / 180 );
        }

        /*****************************************************************************
        *   Normalizes the specified angle to a value between 0.0 and 360.0 degrees.
        *
        *   @param  degrees The angle to normalize.
        *   @return         The normalized angle.
        *****************************************************************************/
        public static normalizeAngle( degrees:number )
        {
            while ( degrees < 0.0    ) degrees += 360.0;
            while ( degrees >= 360.0 ) degrees -= 360.0;

            return degrees;
        }
    }
