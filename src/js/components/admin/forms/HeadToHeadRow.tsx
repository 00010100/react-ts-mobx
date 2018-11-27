import * as React from 'react';
import ViewStore from '../../../stores/ViewStore';
import { HeadToHead } from '../../../models';
import { observer, inject } from 'mobx-react';

interface HeadToHeadRowProps {
  headToHead: HeadToHead;
  index: number;
  viewStore?: ViewStore;
}

interface HeadToHeadRowState {}

@inject('viewStore')
@observer
class HeadToHeadRow extends React.Component<HeadToHeadRowProps, HeadToHeadRowState> {
  handleInputChange = (e) => {
    const { name, value } = e.target;
    const { viewStore, headToHead } = this.props;

    if (value && value.trim().length !== 0) {
      viewStore.updateHeadToHead(headToHead.key, name, value);
    }
  };

  handleRemove = (key: string) => {
    const { viewStore } = this.props;

    viewStore.removeHeadToHead(key);
  };

  render() {
    const { index, headToHead, viewStore } = this.props;
    const { players } = viewStore;
    const { title, playerA, playerB } = headToHead;

    return (
      <tr>
        <th scope="row">{index + 1}</th>
        <td>
          <input
            type="text"
            className="form-control"
            id={`title`}
            name="title"
            placeholder="Head To Head Title"
            value={title}
            onChange={this.handleInputChange}
          />
        </td>
        <td>
          <div className="form-group">
            <select
              className="form-control"
              id="playerA"
              name="playerA"
              value={playerA}
              onChange={this.handleInputChange}
            >
              {players.length > 0 &&
                players.map((player) => {
                  const { key, name } = player;

                  return <option value={key}>{name}</option>;
                })}
            </select>
          </div>
        </td>
        <td>
          <div className="form-group">
            <select
              className="form-control"
              id="playerB"
              name="playerB"
              value={playerB}
              onChange={this.handleInputChange}
            >
              {players.length > 0 &&
                players.map((player) => {
                  const { key, name } = player;

                  return <option value={key}>{name}</option>;
                })}
            </select>
          </div>
        </td>
        <td>
          <button className="btn btn-default" onClick={() => this.handleRemove(headToHead.key)}>X</button>
        </td>
      </tr>
    );
  }
}

export default HeadToHeadRow;
