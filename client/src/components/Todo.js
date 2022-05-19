import {React, useState, useEffect, useCallback} from 'react'
import { Box, Button, Input, List, ListItem, ListItemButton, ListItemText, TextField, InputLabel, FormHelperText, IconButton } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";

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

    useEffect(()=>{
        console.log(FilterTask())
        setTodayTask(FilterTask());
    }, [mydate])
    useEffect(()=>{
        setTodayTask(FilterTask());
    }, [todoItem])


    return(<>
        

        <FormGroup>
            <div>
            {moment(props.mydate).format("YYYY년 MM월 DD일 dddd")} 
            </div>
            
                <form onSubmit={CreateItem}>
                    <CheckBoxOutlineBlankIcon />
                    <TextField id="outlined-basic" placeholder='오늘의 할 일은?' size='small' variant="outlined" onChange={onTaskHandler} />
                    {/* <input type='text' placeholder='오늘의 할 일은?' onChange={onTaskHandler}></input> */}
                    {/* <Button type='submit'></Button> */}
                    <IconButton type={'submit'}>
                        <AddIcon />
                    </IconButton>
                </form>
            
                {todayTask.map((item)=>{
                    return <ListItem key={item.id}
                        secondaryAction={
                            <IconButton edge="end" aria-label="deletes" onClick={deleteItem(item)}>
                            <DeleteIcon />
                          </IconButton>
                        }
                    >
                        <ListItemButton disableRipple onClick={onToggle(item)}>
                            <Checkbox disableRipple checked={item.done}/>
                            <ListItemText primary={`${item.content}  ${item.done}`}></ListItemText>
                        </ListItemButton>
                        {/* <li >
                            {item.done ?  <BiCheckboxChecked />: <BiCheckbox />}
                            {item.content}+{item.id}
                        </li> */}   
                        </ListItem>
                    // <div key={item.id}>
                        
                    // {/* <ListItem > */}
                    //     <FormControlLabel id={item.id} checked={item.done} onChange={(event)=>{
                    //         {HandleChecked(event.target.checked, event.target.id)}
                    //     }} control={<Checkbox />}
                    //     label={item.content+" id:"+item.id+"   date:"+item.date+"   done:"+item.done}
                    //     />
                    // {/* </ListItem> */}
                    // </div>
                })}
            
            
        </FormGroup> 
        </>
    )

}
export default Todo;