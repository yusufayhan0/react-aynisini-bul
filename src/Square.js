import React, { useEffect, useState } from 'react'


let colorsCharacter = "0123456789abcdef"
function Square(props) {

    const { gamesettings,hideShow } = props
    const [getcolor, setColor] = useState("#444")
    const [isShow, setisShow] = useState(true)
    const [showClass, setShowClass] = useState("square-own-hide")//square-own-hide
    let color = "#"

    const createColor = () => {
        for (let index = 0; index < 6; index++) {
            color += colorsCharacter[Math.ceil(Math.random() * 15)]
        }
        setColor(color)
    }

    useEffect(() => {
        if (props.finish) {
            setShowClass("square-own-hide")
            setisShow(true)
            setColor("#444")
            props.setFinish(false)
        }
    }, [props.finish])

    useEffect(() => {
        //setShowClass("square-own-hide")
    }, [props.imagepath])

    useEffect(() => {
        if (gamesettings.difficulty !== "1") {
            createColor()
        }
        else {
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
                setisShow(true)
            }
        }
        if (gamesettings.difficulty === "3") {
            createColor()
        }
    }, [hideShow])



    const show = () => {
        setShowClass("square-own-show")
        setisShow(false)
    }

    return (
        <div className="square-container" onClick={() => {
            show()
            isShow && props.tempSq(props.indexNo, props.idNo)
        }}>
            <div className={"square-own-container " + showClass}>
                <div className="common div-rotate" style={{ backgroundColor: getcolor, transition: "300ms all" }}></div>
                <div className="common img-rotate">
                    <img src={"../images/" + props.imagepath} alt="" width="100%" height="100%" />
                </div>

            </div>
        </div>
    )
}

export default Square
