import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function WindChart(){
  const data = [
    { name: 'Jan', value: 30 },
    { name: 'Feb', value: 45 },
    { name: 'Mar', value: 28 },
    { name: 'Apr', value: 62 },
    { name: 'May', value: 50 },
    { name: 'Jun', value: 38 },
  ];
  const [FloodIncident,setFloodIncident]= useState({})
  const [requestTimeNow, setRequestTimeNow] = useState(null);
  const [sudnayToMonday,setDates] = useState([])

  const [rainfall,setRainfall] = useState([])
 
 
  useEffect(()=>{
    
    axios.get('http://127.0.0.1:8000/getChartWind/').then((res)=>{
      const dailyRainfall = res.data.daily.windspeed_10m_max;
      console.log(res.data.daily.time)
      console.log(res.data.daily)
      setDates(res.data.daily.time) 
      const dailyNames = res.data.daily.time
     
      // Reformat the data to match the structure expected by Recharts
      const formattedData = dailyRainfall.map((value, index) => ({
        Date: dailyNames[index].split('-').slice(1).join('-'),
        Windspeed : value,
      }));
      console.log(formattedData)
      console.log(dailyRainfall)
      setRainfall(formattedData);
    }).catch((error)=>{
        console.log(error.message)
    })
  },[])
  
  return (
    <div>

   {FloodIncident !== 0 && (
    <ResponsiveContainer width="100%" height={300} >
      <LineChart
        data={rainfall}
        // margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" angle={-48} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Windspeed" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
   )}
     </div>
  );
};

export default WindChart;