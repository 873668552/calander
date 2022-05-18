import React from 'react';
import {
  MbCalander,
  PcCalander,
} from './Calander'
import { isMobile } from './Calander/Utils/unit'
import './App.css';

function App() {

  return (
    <div className="App">
      {
        !isMobile() ?
        <div className='search' style={{ width: '45.8vw', margin: '100px auto' }}>
          <PcCalander
            // isSingle // 是否单选日期
            onChange={date => console.log(date)}
            initValue={[new Date('2022/6/1').valueOf()]} // 初始化值
            disableFn={curDate => { if (curDate && curDate.valueOf() < new Date('2022/6/1').valueOf()) { return true } }} // 禁止日期
          />
        </div>
        :
        <div className='m-con'>
          <MbCalander
            onChange={date => console.log(date)}
            initValue={[new Date('2022/6/1').valueOf()]} // 初始化值
            disableFn={curDate => { if (curDate && curDate.valueOf() === new Date('2022/6/1').valueOf()) { return true } }} // 禁止日期
          />
        </div>
      }
    </div>
  );
}

export default App;
