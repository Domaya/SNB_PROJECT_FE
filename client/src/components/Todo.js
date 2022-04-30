import {React, useState} from 'react'
import { Box, Button } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';

function Todo(){
    const [todoItem, setTodoItem] = useState(
        [
            {id:0, content:"test 1", done:false},
            {id:1, content:"test 2", done:true}
        ]
    )
    const [nextId, setNextId] = useState(todoItem.length);
    const [InputTask, setInputTask] = useState("")

    const onTaskHandler = (event)=>{
        setInputTask(event.target.value);
    }
    function CreateItem(event){
        event.preventDefault();
        console.log(nextId)
        const newItem = {id:nextId, content:InputTask, done:false}
        const newItems = [...todoItem]
        newItems.push(newItem);
        setTodoItem(newItems);
        setNextId(nextId+1)
        setInputTask("")

    }
    function HandleChecked(event){
        if(event.todoItem.done === true){
            return true
        }else{
            return false
        }
    } //done 여부에 따라서 체크 되게 안되게


    return(<>
        

        <FormGroup>
            <form onSubmit={CreateItem}>
                <Checkbox disabled></Checkbox>
                <input type='text' placeholder='오늘의 할 일은?' onChange={onTaskHandler}></input>
                <Button type='submit'></Button>
            </form>
            <Box>
                {todoItem.map((item)=>{
                    return <>
                    <ListItem >
                        <FormControlLabel control={<Checkbox />}
                        label={item.content+" "+item.id}
                        />
                    </ListItem>
                    </>
                })}
            </Box>
            
        </FormGroup> 
        </>
    )

}
export default Todo;