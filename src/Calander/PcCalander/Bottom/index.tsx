import React, { useMemo, ReactDOM } from 'react'
import './index.css'

type Iprops = {
    addDays?: number | undefined
    onChange?: (num: number) => void
    clear?: () => void
}

const Bottom = (props: Iprops) => {
    const {
        addDays = 0,
        onChange,
        clear
    } = props
    return (
        <div
            className='calander-add-days'
        >
            <div className='add-days-btn'>
            {
                [30, 60, 90, 120, 180].map((day) => {
                    return (
                        <div 
                            className={`add-days-btn-text ${addDays === day ? 'add-days-active' : ''}`}
                            onClick={() => { onChange && onChange(day) }}
                        >
                            {`${day}Days`}
                        </div>
                    )
                })
            }
            </div>
            <div
                className='add-days-clear'
                onClick={clear}
            >
                clear
            </div>
        </div>
    )
}

export default Bottom
