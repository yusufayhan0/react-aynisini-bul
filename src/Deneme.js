import React, { useEffect, useState } from 'react'

export default function Deneme(props) {

    useEffect(() => {
        console.log("props.gelenDeger1", props.dddd)
    }, [props.dddd])

    return (
        <div>
            
        </div>
    )
}
