import {React, useState} from 'react'
import { Box, Button, Input } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import moment from 'moment';
import ListItem from '@mui/material/ListItem';

function Todo(props){
    const mydate = moment(props.mydate).format('YYMMDD'); //220512와 같은 포맷으로..String임

    const [todoItem, setTodoItem] = useState(
        [
            {id:0, content:"첫번째 아이템", done:false, date:moment().format('YYMMDD')},
            {id:1, content:"test 2", done:true, date:'220511'}
        ]
    )
    const [nextId, setNextId] = useState(todoItem.length);
    const [todayTask, setTodayTask] = useState(FilterTask());
    const [InputTask, setInputTask] = useState("")

    const onTaskHandler = (event)=>{
        setInputTask(event.target.value);
    }
    function CreateItem(event){
        event.preventDefault();
        console.log(InputTask)
        const newItem = {id:nextId, content:InputTask, done:false, date:moment(props.mydate).format('YYMMDD')}
        const newItems = [...todoItem]
        newItems.push(newItem);
        setTodoItem(newItems);
        setNextId(nextId+1);
        console.log(todoItem)
        console.log(mydate)
        FilterTask();
        //- Form을 submit 한 후 초기화를 submit안에서 해주면 서버에서 오류시 글이 전달되지 않았으나 사용자의 글이 지워지기 때문에 문제가 될 소지가 있음
        //useEffect에서 redux에서 post가 성공하였을때 실행되는 변수( signInDone과 같은)를 받아 데이터 전송 성공시 초기화가 되도록 해야 함
    }
    function HandleChecked(event){
        if(event.target.checked==true){
            console.log(event.target)
            console.log(event.target.todoItem)
        }
    } //done 여부에 따라서 체크 되게 안되게

    function FilterTask(){
        const todayTask = todoItem.filter(item => {
            return item.date == mydate;
        })
        
        return todayTask;
    }


    return(<>
        

        <FormGroup>
        <div>
           {moment(props.mydate).format("YYYY년 MM월 DD일 dddd")} 
         </div>
            <form onSubmit={CreateItem}>
                <Checkbox disabled></Checkbox>
                <input type='text' placeholder='오늘의 할 일은?' onChange={onTaskHandler}></input>
                <Button type='submit'></Button>
            </form>
            <Box>
                {todayTask.map((item)=>{
                    return <div key={item.id}>
                    {/* <ListItem > */}
                        <FormControlLabel control={<Checkbox onChange={HandleChecked} />}
                        label={item.content+" id:"+item.id+"   date:"+moment(item.date).format("MMM Do YY")}
                        />
                    {/* </ListItem> */}
                    </div>
                })}
            </Box>
            
        </FormGroup> 
        </>
    )

}
export default Todo;