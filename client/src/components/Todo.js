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
    const [nextId, setNextId] = useState(todoItem.length+1);
    const [InputTask, setInputTask] = useState("")
    const onTaskHandler = (event)=>{
        setInputTask(event.target.value);
    }
    function CreateItem(event){
        event.preventDefault();
        console.log(InputTask)
        console.log(nextId)
        const newItem = {id:nextId, content:InputTask, done:false}
        const newItems = [...todoItem]
        newItems.push(newItem);
        setTodoItem(newItems);
        setNextId(nextId+1)
    }


    return(<>
        

        <FormGroup>
        
            <form onSubmit={CreateItem}>
                <Checkbox disabled></Checkbox>
                <input type='text' placeholder='오늘의 할 일은?' onChange={onTaskHandler}></input>
                {/* <Button type='submit'></Button> */}
            </form>
            <Box>
                {todoItem.map((item)=>{
                    return <>
                    <ListItem >
                        <FormControlLabel control={<Checkbox />}
                        label={item.content} key={item.id}/>
                    </ListItem>
                    </>
                })}
            </Box>
            
        </FormGroup> 
        </>
    )

}
export default Todo;