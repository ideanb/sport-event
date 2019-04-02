import { useGlobalState } from './index';

const useActions = () => {
  const dispatch = useGlobalState()[1];

  const setCorridorStart = data =>
    dispatch({ type: 'SET_CORRIDOR_START', data });

  const setCorridorEnd = data => dispatch({ type: 'SET_CORRIDOR_END', data });

  const registerAthleteCorridorStart = data =>
    dispatch({ type: 'REGISTER_ATHLETE_CORRIDOR_START', data });

  const registerAthleteCorridorEnd = data =>
    dispatch({ type: 'REGISTER_ATHLETE_CORRIDOR_END', data });

  return {
    setCorridorStart,
    setCorridorEnd,
    registerAthleteCorridorStart,
    registerAthleteCorridorEnd
  };
};

export default useActions;
