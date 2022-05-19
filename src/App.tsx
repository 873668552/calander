import React, { useState } from 'react';
import {
  MbCalander,
  PcCalander,
} from './Calander'
import { isMobile } from './Calander/Utils/unit'
import './App.css';

function App() {
  let [isOpen, setOpen] = useState(false)
  let [date, setDate] = useState([])
  return (
    <div className="App" >
      <div 
        className='modo-inp'
        onClick={() => { setOpen(!isOpen) }}
      >
        {
          `start: ${date[0]} end: ${date[1]}`
        }
        <>
          <PcCalander
            isAbsolute // position
            style={{ width: '60vw', top: '100px', left: '0' }}
            // isSingle // 是否单选日期
            visible={isOpen}
            onChange={date => setDate(date)}
            initValue={date} // 初始化值
            disableFn={curDate => { if (curDate && curDate.valueOf() < new Date('2022/6/1').valueOf()) { return true } }} // 禁止日期
          />
        </>
      </div>
      {/* {
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
      } */}
    </div>
  );
}

export default App;
