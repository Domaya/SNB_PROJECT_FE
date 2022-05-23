import {React, useState, useEffect} from 'react'
import Calendar from 'react-calendar';
import '../Calendar.css'
import styled from 'styled-components';
import { Grid, Item } from '@mui/material';
import moment from 'moment';
import Todo from './Todo';
import '../dot.css'


const Dodo = styled.div`
  box-shadow: 0 -1px 0 #A0A0C8;
  margin-left:4px;
`
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
          />
        </div> 
        </Grid>
      </Grid>
      <Dodo>
      <Todo mydate={mydate} setMarkDay={(value)=>setMark(value)}/>
      </Dodo>
      
      </>
    )
}

export default Feed;