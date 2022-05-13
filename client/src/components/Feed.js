import {React, useState, useEffect} from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Grid, Item } from '@mui/material';
import moment from 'moment';
import Todo from './Todo';

// function TheDate(props){
   
//     return (<>
//       <div>
//         <Calendar onChange={setMydate} value={mydate} />
//         <div>
//            {moment(mydate).format("YYYY년 MM월 DD일 dddd")} 
//          </div>
//       </div> 
//       </>
//     );
//   }
  //나중에 날짜 포맷 변경하기

function Feed(){
  const [mydate, setMydate] = useState(new Date());

  useEffect(()=>{
    console.log("HEllo")
  },[])
    return(<>
      <Grid container spacing={2}>
        <Grid item xs = {3}>
        <div>
        <Calendar onChange={setMydate} value={mydate} onClickDay={(value)=>{
        console.log("선택한 날짜 "+moment(value).format('YYMMDD'))
      }}/>
        {/* <div>
           {moment(mydate).format("YYYY년 MM월 DD일 dddd")} 
         </div> */}
      </div> 
        </Grid>
      
        <Grid item xs={9}>
        </Grid>
      </Grid>
      <Todo mydate={mydate} />
      </>
    )
}

export default Feed;