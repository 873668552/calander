import React from 'react';
import {
  PcCalander,
} from './Calander'
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='search'>
        <PcCalander
          // isSingle // 是否单选日期
          onChange={date => console.log(date)}
          initValue={[new Date('2022/6/1').valueOf()]} // 初始化值
          disableFn={curDate => { if (curDate && curDate.valueOf() < new Date('2022/6/1').valueOf()) { return true } }} // 禁止日期
        />
      </div>
      <div className='m-con'>

      </div>
    </div>
  );
}

export default App;
