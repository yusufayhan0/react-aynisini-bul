import React, { useEffect, useState } from 'react'




function Image(props) {


    
    

    return (
        <div>
            <img src={"../images/"+props.imagepath} alt="" width="80" height="80" />
        </div>
    )
}

export default Image
