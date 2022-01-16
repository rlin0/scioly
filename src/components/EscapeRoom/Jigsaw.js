import React, { Component } from "react"
import Draggable from "react-draggable"
import { S3Url } from "../../helpers.js"

export default class Jigsaw extends Component {
  constructor() {
    super()
  }

  shuffle = (array) => {
    array.sort(() => Math.random() - 0.5)
  }

  renderPieces = () => {
    var arr = []
    const width = 5
    const size = 100
    const padding = 10
    // array of [0, 8]
    var pieces = [...Array(20).keys()]
    this.shuffle(pieces)
    for (let i = 0; i < 20; i++) {
      if (pieces[i] + 1 == 11) continue;
      arr.push(
        <Draggable>
          <img
            style={{
              left: `${(i % width) * (size + padding)}px`,
              top: `${Math.floor(i / width) * (size + padding)}px`,
              position: "absolute",
            }}
            src={`${S3Url}/er/jigsaw/piece${pieces[i] + 1}.png`}
          // src={`https://averycorp.s3.us-east-1.amazonaws.com/er/jigsaw/Gear${pieces[i] + 1}.png`}
          />
        </Draggable>
      )
    }
    return arr
  }

  render() {
    return <div style={{ position: "relative" }}>{this.renderPieces()}</div>
  }
}
