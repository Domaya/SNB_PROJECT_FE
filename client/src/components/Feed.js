import {React, useState, useEffect} from 'react'
import Calendar from 'react-calendar';
import '../Calendar.css'
// import 'react-calendar/dist/Calendar.css';
import { Grid, Item } from '@mui/material';
import moment from 'moment';
import Todo from './Todo';
import '../dot.css'



function Feed(){
  
  const [mydate, setMydate] = useState(new Date());
  const [mark, setMark] = useState([]);

    return(<>
      <Grid container spacing={2}>
        <Grid padding={3}>
        <div>
        <Calendar onChange={setMydate} value={mydate}
         showNeighboringMonth={false} 
         tileContent={({date})=>{
          if(mark.find((x)=>x===moment(date).format('YYMMDD'))){
            return(
              <>
              <div className="flex justify-center items-center absoluteDiv">
                <div className="dot"></div>
              </div>
              </>
            )
          }
        }}
        onClickDay={(value)=>{
        console.log("선택한 날짜 "+moment(value).format('YYMMDD'))
      }}/>
      </div> 
        </Grid>
      
        <Grid>
        </Grid>
      </Grid>
      <Todo mydate={mydate} setMarkDay={(value)=>setMark(value)}/>
      </>
    )
}

export default Feed;