import { Button, TextField, Box } from '@mui/material';
import React, {useState} from 'react';
import {useForm} from "react-hook-form"

function Join(){
    const {register, handleSubmit} = useForm();

    
//submit에서 서버와 통신하여
//가입성공하면 로그인페이지로 넘어가게
//실패하면 에러메시지

//유효성검사 옵션과 비밀번호재확인 옵션 추가할 것
    const onSubmit = (event)=> {
        console.log(event)
    }
    const onError = (error)=>{
        console.log(error) //유효성 검사에서 에러 발생시
    }
    

    return <div>
        <Box
            sx={{
                borderRadius: 2,
                p: 2,
                minWidth: 300,
              }}
        >
        <form action='@@서버주소@@' method="post"
            onSubmit={handleSubmit(onSubmit, onError)}>
            <TextField type="text" name="userId" placeholder='ID' {...register('uerId')} margin="dense" fullWidth />
            <TextField type='password' name="userPw" placeholder='PASSWORD' {...register('userPw', {
                minLength:{
                    value: 5,
                    message: "비밀번호는 5글자 이상이어야 합니다."
                }
            })} margin="dense" fullWidth />
            <TextField type='text' name="userName" placeholder='NAME' {...register('userName')}margin="dense" fullWidth />
            <TextField type='text' name='email' placeholder='E-MAIL' {...register('email')}margin="dense" fullWidth />
            <Button type="submit" variant="contained" color="primary">가입하기</Button>
        </form>
        </Box>
    </div>
}


export default Join;