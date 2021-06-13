import React, { useEffect, useState } from 'react'


let colorsCharacter = "0123456789abcdef"
function Square(props) {

    //gamercount: "1"
    //difficulty: "1"

    const { gamesettings } = props

    const { hideShow } = props
    const [getcolor, setColor] = useState("#444")
    const [isShow, setisShow] = useState(false)
    const [change, setChange] = useState(false)
    const [showClass, setShowClass] = useState("square-own-hide")//square-own-hide
    let color = "#"

    const createColor = () => {
        for (let index = 0; index < 6; index++) {
            color += colorsCharacter[Math.ceil(Math.random() * 15)]
        }
        setColor(color)
        setChange(false)
    }

    useEffect(() => {
        //createColor()
    }, [])

    useEffect(() => {

        if (gamesettings.difficulty !== "1") {
            createColor()
        }
        else{
            setColor("#444")
        }

    }, [gamesettings])


    useEffect(() => {
        if (hideShow[1] !== -1 && hideShow[2] !== -1) {
            if (hideShow[1] === props.indexNo || hideShow[2] === props.indexNo) {
                setShowClass("square-own-hide")
                if (gamesettings.difficulty === "2") {
                    createColor()
                }
                setisShow(false)
            }
        }
        if (gamesettings.difficulty === "3") {
            createColor()
        }
    }, [hideShow])

    const show = () => {
        if (isShow) {
            setShowClass("square-own-hide")
            setisShow(false)
        } else {
            setShowClass("square-own-show")
            setisShow(true)
        }
    }

    return (
        <div className="square-container" onClick={() => {
            show()
            props.tempSq(props.indexNo, props.idNo)
        }}>
            <div className={"square-own-container " + showClass}>
                <div className="common div-rotate" style={{ backgroundColor: getcolor,transition:"300ms all" }}></div>
                <div className="common img-rotate">
                    <img src={"../images/" + props.imagepath} alt="" width="100%" height="100%" />
                </div>

            </div>
        </div>
    )
}

export default Square
