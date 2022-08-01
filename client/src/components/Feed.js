import {React, useState, useEffect} from 'react'
import Calendar from 'react-calendar';
import '../Calendar.css'
import styled from 'styled-components';
import { Grid, Item } from '@mui/material';
import moment from 'moment';
import Todo from './Todo';
import { color } from '@mui/system';


const Dot = styled.div`
  height: 2px;
  width: 42px;
  background-color: #3CA03C;
  border-radius: 0%;
  display: flex;
  margin-left: 1px;
`
const BestDot = styled.div`
  height: 2px;
  width: 42px;
  background-color: #f87171;
  border-radius: 0%;
  display: flex;
  margin-left: 1px;
`

const Dodo = styled.div`
  box-shadow: 0 -1px 0 #A0A0C8;
  margin-left:4px;
`
function Feed(){
  
  const [mydate, setMydate] = useState(new Date());
  const [mark, setMark] = useState([]);
  const [Alldone, setAllDone] = useState(false);
  const [goodDay, setGoodDay] = useState([]);

    return(<>
      <Grid container spacing={2}>
        <Grid padding={3} >
          <div>
          <Calendar onChange={setMydate} value={mydate}
          showNeighboringMonth={false} 
          tileContent={({date})=>{
            if(mark.find((x)=>x===moment(date).format('YYMMDD'))){
              if(goodDay.find((x)=>x===moment(date).format('YYMMDD'))){
                return(
                  <>
                  <div className="flex justify-center items-center absoluteDiv">
                    <BestDot></BestDot>
                  </div>
                  </>
                )
              }
              else
                return <Dot></Dot>
              
              }
            }
          }
          />
        </div> 
        </Grid>
      </Grid>
      <Dodo>
      <Todo mydate={mydate} setMarkDay={(value)=>setMark(value)}
          checkDay={(value)=>{
            if(value==true){
              setAllDone(true);
            }
          }}
          checkPerfect = {(daySet)=>{
            setGoodDay(daySet)
         }}
      />
      </Dodo>
      
      </>
    )
}

export default Feed;