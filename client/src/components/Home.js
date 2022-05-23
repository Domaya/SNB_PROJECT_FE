import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Feed from './Feed';

function Home(){

    return <div>
        <Feed />
    </div>
}
//Home에서 Nav까지 제공하는게 좋지 않을까?
//나중엔 Home에서 Nav와 Feed를 제공하고
//Feed는 Montly와 Day로 구성
//Day는 TodoItem을 포함하는 구조.

export default Home;