import React, { useState, useEffect, useRef } from 'react';
import { useDiabeticContext } from '../hooks/DiabeticStatsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { format } from 'date-fns';
import Chart from 'chart.js/auto';

const DiabeticStatsDetails = ({ stats }) => {
  const { dispatch } = useDiabeticContext();
  const { user } = useAuthContext();

  const [diabeticStats, setDiabeticStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const chartRef = useRef(null);

  
  const createChart = () => {
    if (chartRef.current && chartData.length > 0) {
      new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: ['Average Blood Sugar Level'],
          datasets: chartData,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://vercel.com/collinsmathinji/diabetes/Dy87jcdVTcfNVGmUap6Y6uAxpyWW/api/diabeticStats/${stats._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (response.ok) {
        dispatch({ type: 'DELETE_DIABETIC_STAT', payload: stats._id });
      } else {
        // Handle error if needed
      }
    } catch (error) {
      // Handle error if needed
    }
  };

  useEffect(() => {
    const fetchDiabeticStats = async () => {
      try {
        const response = await fetch(`https://vercel.com/collinsmathinji/diabetes/Dy87jcdVTcfNVGmUap6Y6uAxpyWW/api/diabeticStats/${stats._id}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        const json = await response.json();

        if (response.ok) {
          setDiabeticStats(json);

          const bloodSugarLevels = json.bloodSugarLevel.map(bloodSugar => bloodSugar.value);
          const averageBloodSugarLevel = bloodSugarLevels.reduce((acc, val) => acc + val, 0) / bloodSugarLevels.length;

          setChartData([
            {
              label: 'Average Blood Sugar Level',
              data: [averageBloodSugarLevel]
            }
          ]);
        } else {
          // Handle error if needed
        }
      } catch (error) {
        // Handle error if needed
      }
    };

    if (user) {
      fetchDiabeticStats();
    }
  }, [user, stats._id]);

  useEffect(() => {
    createChart();
  }, [chartData, diabeticStats]);

  return (
    <div className="diabetic-stats-details">
      {diabeticStats ? (
        <>
          <h4>Diabetic Health Stats</h4>
          <p><strong>Blood Sugar Level (mg/dL): </strong>{diabeticStats.bloodSugarLevel}</p>
          <p className={diabeticStats.bloodSugarLevel > 200 ? 'high-sugar-level' : diabeticStats.bloodSugarLevel < 70 ? 'low-sugar-level' :diabeticStats.bloodSugarLevel > 600 ? "emergency-2" : 'normal-sugar-level'}><strong>Risk-Emerged:</strong>
            {diabeticStats.bloodSugarLevel > 200 ? "High Sugar level" : diabeticStats.bloodSugarLevel < 70 ? "Low Sugar level" : "Normal sugar level"}
          </p>
          <p className={diabeticStats.bloodSugarLevel > 200 ? 'Diabetes-melitus' : diabeticStats.bloodSugarLevel < 70 ? 'Hypoglycemia' : 'normal'}><strong>Diabetes Type: </strong>
            {diabeticStats.bloodSugarLevel > 200 ? "Diabetes mellitus(Type 1 or 2)(  Insulin shot recommended)" : diabeticStats.bloodSugarLevel < 70 ? "Hypoglycemia.(Give 3 jelly babies/150ml fruit juice...recommended)" : "None"}
          </p>
          <p><strong>Insulin Intake (units): </strong>{diabeticStats.insulinIntake}</p>
          <p><strong>Medication: </strong>{diabeticStats.medication}</p>
          <p><strong>Time: </strong>{format(new Date(diabeticStats.updatedAt), 'MMMM d, yyyy h:mm a')}</p>
          <button onClick={handleDelete}>Delete</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
       
    </div>
  );
};

export default DiabeticStatsDetails;
