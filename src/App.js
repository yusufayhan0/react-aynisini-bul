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
  const [settings, setSettings] = useState({
    gamercount: "1",
    difficulty: "1"
  })
  const [gamerLine, setGamerLine] = useState("1")
  const [scoreBoard, setScoreBoard] = useState([])

  const ref = useRef(1)
  const count = [];
  useEffect(() => {
    let i = 0;
    for (let index = 0; index < 36; index++) {
      count.push(index)
    }
  }, [])

  useLayoutEffect(() => {
    setSettings({
      gamercount: "1",
      difficulty: "1"
    })
    setGamerLine("1")
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
        setTimeout(() => {
          gamerLine === "1" ? setGamerLine("2") : setGamerLine("1")
        }, 700);
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

  const handleDifficulty = (e) => {
    setSettings(setting => ({ ...setting, difficulty: e.target.value }))

  }

  useEffect(() => {
    console.log(settings)
  }, [settings])

  const handleGamerCount = (e) => {
    setSettings(setting => ({ ...setting, gamercount: e.target.value }))
  }

  return (
    <div className="app-container">



      <div className="app-game-container">
        {
          getSquare.map((index) => {

            return <Square key={index} gamesettings={settings} indexNo={index} idNo={image[index]} imagepath={imageList[image[index]]} hideShow={hideShow} tempSq={tempSq} />
          })
        }
      </div>
      <div className="settings-container">

        <div>
          {
            settings.gamercount === "1"
              ? <p>Tek Oyuncu</p>
              : <p>{gamerLine} Oyuncu</p>
          }

        </div>

        <p>Zorluk Derecesi</p>
        <div>
          <input type="radio" onChange={handleDifficulty} id="difficulty1" name="difficulty" value="3" />
          <label for="difficulty1">Zor</label>
          <input type="radio" onChange={handleDifficulty} id="difficulty2" name="difficulty" value="2" />
          <label for="difficulty2">Orta</label>
          <input type="radio" onChange={handleDifficulty} id="difficulty3" name="difficulty" value="1" defaultChecked />
          <label for="difficulty3">Kolay</label>
        </div>
        <p>Oyuncu sayısı</p>
        <div>
          <input type="radio" id="gamer1" onChange={handleGamerCount} name="gamercount" value="1" defaultChecked />
          <label for="gamer1">Tek Kişilik</label>
          <input type="radio" id="gamer2" onChange={handleGamerCount} name="gamercount" value="2" />
          <label for="gamer2">2 Kişilik</label>
        </div>
      </div>
    </div>
  );
}

export default App;
