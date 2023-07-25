import { useContext } from 'react';
import { DiabeticStatsContext } from '../context/DiabeticStats'; 

export const useDiabeticContext = () => {
  const diabeticStatsContext = useContext(DiabeticStatsContext);
  if ( !diabeticStatsContext) {
    throw new Error(
      'useWorkoutsContext must be used inside both WorkoutsContextProvider and DiabeticStatsContextProvider'
    );
  }

  return {  ...diabeticStatsContext }; 
};