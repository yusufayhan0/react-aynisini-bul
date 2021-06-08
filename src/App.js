import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Square from "./Square";
let imageHistory = []
let imageCountHistory = Array(19).fill(0)
function App() {

  const [tempSquare, setTempSquare] = useState([])
  const [tempOkSquare, setTempOkSquare] = useState([])
  const [getSquare, setSquare] = useState([])
  const [hideShow, setHideShow] = useState([0, -1, -1])
  const [historyTrueSquare, setHistoryTrueSquare] = useState([])
  const [image, setImage] = useState()

  const ref = useRef(1)
  const count = [];
  useEffect(() => {
    let i = 0;
    for (let index = 0; index < 36; index++) {
      count.push(index)
    }
  }, [])

  useLayoutEffect(() => {
    setSquare(count)
  }, [])



  useEffect(() => {
    if (tempSquare.length > 0) {
      if (tempSquare[3] !== -1) {
        if (tempSquare[2] === tempSquare[3]) {
          console.log("10 puan daha kazandınız")
        }
        else {
          setTimeout(() => {
            setHideShow(value => [value[0] + 1, tempSquare[0], tempSquare[1]])
          }, 700);
        }
      }
    }
    else {
      setHideShow([0, -1, -1])
    }
  }, [tempSquare])

  const imageList = [
    "",
    "adjust-solid.jpg",
    "algolia-brands.jpg",
    "angle-double-down-solid.jpg",
    "angle-double-left-solid.jpg",
    "arrow-alt-circle-right-regular.jpg",
    "arrow-alt-circle-up-solid.jpg",
    "arrows-alt-h-solid.jpg",
    "backward-solid.jpg",
    "bluetooth-brands.jpg",
    "buromobelexperte-brands.jpg",
    "carrot-solid.jpg",
    "chevron-circle-up-solid.jpg",
    "cog-solid.jpg",
    "dharmachakra-solid.jpg",
    "dot-circle-regular.jpg",
    "ello-brands.jpg",
    "empire-brands.jpg",
    "exclamation-circle-solid.jpg"
  ]





  const tempSq = (index, id) => {
    if (ref.current === 1) {
      setTempSquare([-1, index, id, -1])
      ref.current++
    }
    else {
      setTempSquare(value => [index, value[1], value[2], id])
      ref.current = 1
    }
  }

  const imageCreate = () => {
    let imageNo
    let imageName
    let isImage
    let isNext = true
    while (isNext) {
      imageNo = (Math.round(Math.random() * 17) + 1)
      isImage = imageHistory.find(no => no === imageNo)
      if (imageCountHistory[imageNo] < 2) {
        imageHistory.push(imageNo)
        imageCountHistory[imageNo]++
      }
      if (imageHistory.length > 35) {
        isNext = false
      }

    }
    return imageHistory
  }

  useEffect(() => {
    setImage(imageCreate())
  }, [])


  return (
    <div className="app-container">

      <div className="app-game-container">
        {
          getSquare.map((index) => {

            return <Square key={index} indexNo={index} idNo={image[index]} imagepath={imageList[image[index]]} hideShow={hideShow} tempSq={tempSq} />
          })
        }
      </div>

    </div>
  );
}

export default App;
