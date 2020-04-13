import * as React from "react";
import * as Components from "./components"
import * as Models from "../models/models"

export default class BoardSmall extends React.Component {
  static readonly AmountTiles = 19;

  private readonly board: Models.BoardSmall;

  constructor(props) {
    super(props)
    this.board = new Models.BoardSmall();
  }

  render() {
    return (this.board.GetTiles().map((val, i) => {
      return <Components.Tile 
        xPos={val.xPos} 
        yPos={val.yPos}
        tileType={Models.TileType.WOOL}
        />
      })
    );
  }
}
