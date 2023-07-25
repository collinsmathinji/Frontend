import { useEffect } from 'react';
import { useDiabeticContext } from '../hooks/DiabeticStatsContext';
import { useAuthContext } from '../hooks/useAuthContext';

// components
import DiabeticStatsDetails from '../components/Diabetic Health Stats'; 
import DiabeticStatsForm from '../components/DiabeticStatsForm'; 

const Home = () => {
  const { stats: diabeticStats, dispatch } = useDiabeticContext(); 
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchDiabeticStats = async () => {
      const response = await fetch('http://localhost:4000/api/diabeticStats', {
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_DIABETIC_STATS', payload: json }); 
      }
    };

    if (user) {
      fetchDiabeticStats();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <DiabeticStatsForm /> 
      <div className="diabetic-stats">
        {diabeticStats && diabeticStats.map((diabeticStat) => (
          <DiabeticStatsDetails key={diabeticStat._id} stats={diabeticStat} />
        ))}
      </div>
    </div>
  );
  
        }
export default Home;