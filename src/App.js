import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Square from "./Square";
let imageHistory = []
let imageCountHistory = Array(19).fill(0)
function App() {

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

  const [tempSquare, setTempSquare] = useState([])
  const [getSquare, setSquare] = useState([])
  const [hideShow, setHideShow] = useState([0, -1, -1])
  const [image, setImage] = useState()
  const [settings, setSettings] = useState({
    gamercount: "1",
    difficulty: "1"
  })
  const [gamerLine, setGamerLine] = useState("1")//sıranın kimde olduğunu tutar
  const [scoreBoard, setScoreBoard] = useState({
    oyuncu1: {
      toplam: 0,
      basarili: 0
    },
    oyuncu2: {
      toplam: 0,
      basarili: 0
    }
  })
  const [moveCount, setMoveCount] = useState(0)
  const [timeState, setTimeState] = useState([])
  const [stateCount, setStateCount] = useState(0)
  const refTime = useRef()
  const [buttonShow, setButtonShow] = useState(true)
  const [finishState, setFinishState] = useState(false)
  const [gameFinish, setGameFinish] = useState(["", ""])


  const ref = useRef(1)
  const count = [];

  const defaultSettings = () => {
    setGamerLine("1")
    setScoreBoard({ oyuncu1: { toplam: 0, basarili: 0 }, oyuncu2: { toplam: 0, basarili: 0 } })
    setMoveCount(0)
    setTimeState([])
    setStateCount(0)
    setButtonShow(true)
    setFinishState(true)
    setGameFinish(["", ""])
    setHideShow([0, -1, -1])
    ref.current = 1
    setTimeout(() => {
      setImage(imageCreate())
    },550);

  }

  useEffect(() => {
    let i = 0;
    for (let index = 0; index < 36; index++) {
      count.push(index)
    }
  }, [])

  useLayoutEffect(function () {
    setSettings({
      gamercount: "1",
      difficulty: "1"
    })
    setGamerLine("1")
    setSquare(count)
  }, [])

  const handleStart = () => {
    defaultSettings()
    refTime.current = setInterval(setTime, 1000);
    setButtonShow(false)
  }

  const handleFinish = () => {
    clearInterval(refTime.current)
    setButtonShow(true)
    setGameFinish(["finish-modal-show", "finish-modal-message-show"])
    //setSettings({ gamercount: "1", difficulty: "1" })

  }

  function setTime() {
    setStateCount(value => value + 1);

  }

  useEffect(() => {
    setTimeState(value => [value[0], pad(stateCount % 60)])
    setTimeState(value => [pad(parseInt(stateCount / 60)), value[1]])
  }, [stateCount])

  function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }



  useEffect(() => {
    if (tempSquare.length > 0) {
      if (tempSquare[3] !== -1) {
        if (tempSquare[2] === tempSquare[3]) {
          if (settings.gamercount === "2") {
            setTimeout(() => {
              if (gamerLine === "1") {
                setGamerLine("2")
                setScoreBoard(value => ({
                  ...value, oyuncu1: {
                    ...value.oyuncu1,
                    basarili: value.oyuncu1.basarili + 1,
                    toplam: value.oyuncu1.toplam + 1
                  }
                }))
              }
              else {
                setGamerLine("1")
                setScoreBoard(value => ({
                  ...value, oyuncu2: {
                    ...value.oyuncu2,
                    basarili: value.oyuncu2.basarili + 1,
                    toplam: value.oyuncu2.toplam + 1
                  }
                }))
              }

            }, 700);
          }
          else {
            setScoreBoard(value => ({
              ...value, oyuncu1: {
                ...value.oyuncu1,
                toplam: value.oyuncu1.toplam + 1,
                basarili: value.oyuncu1.basarili + 1,
              }
            }))
          }
        }
        else {
          if (settings.gamercount === "2") {
            setTimeout(() => {
              if (gamerLine === "1") {
                setGamerLine("2")
                setScoreBoard(value => ({
                  ...value, oyuncu1: {
                    ...value.oyuncu1,
                    toplam: value.oyuncu1.toplam + 1
                  }
                }))
              }
              else {
                setGamerLine("1")
                setScoreBoard(value => ({
                  ...value, oyuncu2: {
                    ...value.oyuncu2,
                    toplam: value.oyuncu2.toplam + 1
                  }
                }))
              }

            }, 700);
          }
          else {
            setGamerLine("1")
            setScoreBoard(value => ({
              ...value, oyuncu1: {
                ...value.oyuncu1,
                toplam: value.oyuncu1.toplam + 1
              }
            }))
          }
          setTimeout(() => {
            setHideShow(value => [value[0] + 1, tempSquare[0], tempSquare[1]])
          }, 700);
        }
        setMoveCount(move => move + 1)
      }
    }
    else {
      setHideShow([0, -1, -1])
    }
    console.log("tempSquare-tempSquare",tempSquare)
  }, [tempSquare])

  useEffect(() => {
    //console.log("scoreBoard", scoreBoard)
  }, [scoreBoard])

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
    imageCountHistory = Array(19).fill(0)
    imageHistory = []
    let imageNo
    let isNext = true
    while (isNext) {
      imageNo = (Math.round(Math.random() * 17) + 1)
      if (imageCountHistory[imageNo] < 2) {
        imageHistory.push(imageNo)
        imageCountHistory[imageNo]++
      }
      if (imageHistory.length > 35) {
        isNext = false
      }

    }
    console.log("imageHistory-imageHistory", imageHistory)
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
      <div className={"finish-modal " + gameFinish[0]}></div>
      <div className={"finish-modal-message " + gameFinish[1]}>
        1. Oyuncu
        <hr />
        <p>Toplam Hamle : {scoreBoard.oyuncu1.toplam}</p>
        <p>Başarılı Hamle : {scoreBoard.oyuncu1.basarili}</p>
        <p>Başarısız Hamle : {scoreBoard.oyuncu1.toplam - scoreBoard.oyuncu1.basarili}</p>

        {settings.gamercount === "2" && <span>
          2. Oyuncu
          <hr />
          <p>Toplam Hamle : {scoreBoard.oyuncu2.toplam}</p>
          <p>Başarılı Hamle : {scoreBoard.oyuncu2.basarili}</p>
          <p>Başarısız Hamle : {scoreBoard.oyuncu2.toplam - scoreBoard.oyuncu2.basarili}</p>
        </span>}


        <button onClick={() => setGameFinish(["", ""])} >Kapat</button>
      </div>
      <div className="app-game-container">
        {
          buttonShow && <div className="app-game-floor"></div>
        }
        {
          getSquare.map((index) => {
            return <Square key={index} gamesettings={settings} setFinish={setFinishState} finish={finishState} indexNo={index} idNo={image[index]} imagepath={imageList[image[index]]} hideShow={hideShow} tempSq={tempSq} />
          })
        }
      </div>
      <div className="settings-container">
        <div>
          {
            settings.gamercount === "1"
              ? <p>Tek Oyuncu</p>
              : <p>{gamerLine}. Oyuncu</p>
          }
        </div>
        <div style={{ height: settings.gamercount === "2" ? "75px" : "0px", position: "relative", opacity: settings.gamercount === "2" ? "1" : "0" }}>
          <span style={{ position: "absolute" }}>
            <p>1. Oyuncu : {scoreBoard.oyuncu1.basarili}</p>
            <p>2. Oyuncu : {scoreBoard.oyuncu2.basarili}</p>
          </span>
        </div>

        <p>Zorluk Derecesi</p>
        <div>
          <input type="radio" onChange={handleDifficulty} id="difficulty1" name="difficulty" value="3" />
          <label htmlFor="difficulty1">Zor</label>
          <input type="radio" onChange={handleDifficulty} id="difficulty2" name="difficulty" value="2" />
          <label htmlFor="difficulty2">Orta</label>
          <input type="radio" onChange={handleDifficulty} id="difficulty3" name="difficulty" value="1" defaultChecked />
          <label htmlFor="difficulty3">Kolay</label>
        </div>
        <p>Oyuncu sayısı</p>
        <div>
          <input type="radio" id="gamer1" disabled={!buttonShow} onChange={handleGamerCount} name="gamercount" value="1" defaultChecked />
          <label htmlFor="gamer1">Tek Kişilik</label>
          <input type="radio" id="gamer2" disabled={!buttonShow} onChange={handleGamerCount} name="gamercount" value="2" />
          <label htmlFor="gamer2">2 Kişilik</label>
        </div>
        <div>
          <p>{timeState[0]} : {timeState[1]}</p>
          <p>Hamle Sayısı : {moveCount}</p>
        </div>
        {
          buttonShow
            ? <button onClick={handleStart}>Başla</button>
            : <button onClick={handleFinish}>Bitir</button>
        }
      </div>
    </div>
  );
}

export default App;
