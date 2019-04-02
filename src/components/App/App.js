import React, { useEffect } from 'react';
import moment from 'moment';
import { suscribeReaders, suscribeCaptures } from '../../api';
import useActions from '../../state/actions';
import { useGlobalState } from '../../state';
import './App.css';
import logo from './logo.svg';

const App = () => {
  const actions = useActions();
  const [state] = useGlobalState();
  const { corridorStart, corridorEnd } = state;

  useEffect(() => {
    suscribeReaders(onReaders);
  }, []);

  useEffect(() => {
    if (corridorStart.id && corridorEnd.id) {
      suscribeCaptures(onCaptures);
    }
  }, [corridorStart.id, corridorEnd.id]);

  const onReaders = readers => {
    const startPosition = Math.min.apply(
      null,
      readers.map(reader => reader.position)
    );
    const endPosition = Math.max.apply(
      null,
      readers.map(reader => reader.position)
    );

    const corridorStartSelected = readers.find(
      reader => reader.position === startPosition
    );
    const corridorEndSelected = readers.find(
      reader => reader.position === endPosition
    );

    actions.setCorridorStart(corridorStartSelected);
    actions.setCorridorEnd(corridorEndSelected);
  };

  const onCaptures = captures => {
    for (const capture of captures) {
      if (capture.reader_id === corridorStart.id) {
        actions.registerAthleteCorridorStart(capture);
      } else if (capture.reader_id === corridorEnd.id) {
        actions.registerAthleteCorridorEnd(capture);
      }
    }
  };

  const renderBlankState = () => {
    return (
      <tr>
        <td colspan="3">Waiting for captures</td>
      </tr>
    );
  };

  const renderBody = () => {
    const captureList = state.captures.map(capture => {
      const { athlete = {}, captured } = capture;
      const time =
        capture.reader_id === corridorEnd.id
          ? moment(captured)
              .utc()
              .format('HH:mm:ss')
          : '--:--:--';
      return (
        <tr key={capture.id}>
          <td>{athlete.number}</td>
          <td>{athlete.name}</td>
          <td>{time}</td>
        </tr>
      );
    });
    return captureList;
  };

  return (
    <div className="main">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <table className="captureList">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>{!state.captures.length ? renderBlankState() : renderBody()}</tbody>
      </table>
    </div>
  );
};

export default App;
