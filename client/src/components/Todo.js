import {React, useState, useEffect} from 'react'
import {ListItem, ListItemButton, ListItemText, TextField, IconButton } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";
import styled from 'styled-components';

const CheckList = styled.div`
    background-color:ivory;
`
const ThisDate = styled.div`
    font-size:25px;
    font-weight:500;
    font-family: 'Nanum Gothic', sans-serif;
    padding : 6px 0px 6px 0px;
`
const InputField = styled.div`
    margin-left : 15px;
`

function Todo(props){
    const mydate = moment(props.mydate).format('YYMMDD'); //220512와 같은 포맷으로..String임

    const [todoItem, setTodoItem] = useState(
        [
            {id:0, content:"첫번째 아이템", done:false, date:moment().format('YYMMDD')},
            {id:1, content:"test 2", done:true, date:'220513'},
            {id:2, content:"머리감기", done:false, date:moment().format('YYMMDD')},
            {id:3, content:"필라테스", done:false, date:moment().format('YYMMDD')},
            {id:4, content:"미용실", done:true, date:moment().format('YYMMDD')},
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
        event.target.reset();
        //- Form을 submit 한 후 초기화를 submit안에서 해주면 서버에서 오류시 글이 전달되지 않았으나 사용자의 글이 지워지기 때문에 문제가 될 소지가 있음
        //useEffect에서 redux에서 post가 성공하였을때 실행되는 변수( signInDone과 같은)를 받아 데이터 전송 성공시 초기화가 되도록 해야 함
    }
    
   
    function FilterTask(){
        const items = todoItem.filter(item => {
            return item.date == mydate;
        })
        return items
    }


    const onToggle = (item)=> ()=> {
        const copyItem = [...todoItem];
        const tempItem = {id:item.id, content:item.content, done:!(item.done), date:item.date}
        copyItem[item.id] = tempItem;
        setTodoItem(copyItem);
    }

    const deleteItem = (item) => () => {
        const id = item.id;
        setTodoItem(
            todoItem.filter(
                item => {
                    return item.id !== id;
                }
            )
        )
    }
    
    function makeMark(todoItem){
        let dateList = [];
        todoItem.map((item)=>{
            dateList.push(item.date);
        })
        const dateSet = new Set(dateList);
        const dateArr= Array.from(dateSet)
        return dateArr;
    }

    function checkDone(todayTask){
        let flag = false;
        for(let i=0; i<todayTask.length; i++){
            if (todayTask[i].done===false){
                console.log("flag"+flag)
                return false;
            }
        }
        flag = true;
        console.log("flag"+flag);
        return true;
    }
    const [perfectDay, setPerfectDay] = useState([])
    useEffect(()=>{
        props.setMarkDay(makeMark(todoItem))
    }, [todoItem])
    useEffect(()=>{
        console.log(FilterTask())
        setTodayTask(FilterTask());
    }, [mydate])
    useEffect(()=>{
        setTodayTask(FilterTask());
        let day = checkDone(todayTask);
        let copyPerfectDayArr = [...perfectDay]
        let daySet = new Set();
        if(day == true){
            copyPerfectDayArr.push(mydate);
            daySet = new Set(copyPerfectDayArr);
            const dayArray = Array.from(daySet)
            setPerfectDay(dayArray)
            props.checkPerfect(perfectDay);
        }
    }, [todoItem])
    useEffect(()=>{
        let day = checkDone(todayTask);
        let copyPerfectDayArr = [...perfectDay]
        let daySet = new Set();
        props.checkDay(day);
        if(day == true){
            copyPerfectDayArr.push(mydate);
            daySet = new Set(copyPerfectDayArr);
            const dayArray = Array.from(daySet)
            setPerfectDay(dayArray)
            props.checkPerfect(perfectDay);
        }
    }, [todayTask])


    return(<>
        

        <FormGroup>
            <ThisDate>
            {moment(props.mydate).format("YYYY년 MM월 DD일 ddd")} 
            </ThisDate>
            
            < InputField>
                <form onSubmit={CreateItem}>
                    <TextField id="outlined-basic" placeholder='오늘의 할 일은?' size='small' margin='dense' variant="outlined" onChange={onTaskHandler} />
                    <IconButton type={'submit'}>
                        <AddIcon />
                    </IconButton>
                </form>
            </InputField>
                <CheckList>
                {todayTask.map((item)=>{
                    return <ListItem key={item.id}
                        disableGutters
                        secondaryAction={
                            <IconButton aria-label="deletes"  onClick={deleteItem(item)}>
                            <DeleteIcon />
                          </IconButton>
                        }
                    >
                        <ListItemButton disableRipple onClick={onToggle(item)}>
                            <Checkbox disableRipple checked={item.done}/>
                            <ListItemText primary={`${item.content}  ${item.done}`}></ListItemText>
                        </ListItemButton>
                        </ListItem>
                })}
            </CheckList>
            
        </FormGroup> 
        </>
    )

}
export default Todo;