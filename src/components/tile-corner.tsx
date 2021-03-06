import * as React from 'react';

import { TileCornerStatics } from '../models/tile-corner';
import { PlayerColors } from '../models/player';
import { connect } from 'react-redux';
import { AddCorner } from '../redux/actions'
import Config from '../config';

type TileCornerProps = {
  xPos: number,
  yPos: number,
  color: PlayerColors,
  tileIdx: number,
  debugIdx: number,
}

export class TileCorner extends React.Component<any> {
  getTileImg(): string {
    return `./assets/pieces/STRUCTURE_settlement_${this.props.color}.png`;
  }

  isOwned() : boolean {
    return this.props.color !== PlayerColors.NONE;
  }

  debug() {
    if (!Config.IsDebug) return null;
    const posStyle : React.CSSProperties = {
      position: 'absolute',
      top: 20,
      left: 0,
      width: 100,
      fontSize: 25,
    };
    return (<div className='debug' style={posStyle}>{`${this.props.tileIdx}-${this.props.cornerId}`}</div>);
  }

  hitboxClick() {
    this.props.AddCorner({
      tileIdx: this.props.tileIdx,
      cornerId: this.props.cornerId,
      color: this.props.activePlayerColor,
      tileCorner: this.props.tileCorner,
    });
  }

  render() {
    const posStyle : React.CSSProperties = {
      position: 'absolute',
      top: this.props.yPos,
      left: this.props.xPos,
      zIndex: 10000,
    };
    const imgStyle : React.CSSProperties = {
      position: 'absolute',
      height: TileCornerStatics.Width,
      width: TileCornerStatics.Height,
    };
    return (<div className="tile-corner" style={posStyle}>
      <div style={imgStyle} className="tile-corner-hitbox" onClick={() => this.hitboxClick()}></div>
        {this.isOwned() ? <img style={imgStyle} src={this.getTileImg()}></img> : null}
      {this.debug()}
    </div>);
  }
}

const mapStateToProps = (state, ownProps) => {
  const tileCorner = state.board.tiles[ownProps.tileIdx].corners.find(el => el.cornerId === ownProps.cornerId);
  return {
    tileCorner,
    color: tileCorner.color,
    activePlayerColor: state.game.activePlayerColor,
  };
};

export default connect(
  mapStateToProps,
  { AddCorner }
)(TileCorner);