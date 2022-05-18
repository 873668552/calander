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
            className='mb-calander-bottom-con'
        >
            <div className='mb-calander-bottom  mb_child_padding'>
                {
                    [30, 60, 90, 120, 180].map((day) => {
                        return (
                            <div 
                                className={`mb-add-days-btn-text ${addDays === day ? 'mb-add-days-active' : ''}`}
                                onClick={() => { onChange && onChange(day) }}
                            >
                                {`${day}Days`}
                            </div>
                        )
                    })
                }
                <div
                    className='mb-add-days-btn-text mb-add-days-clear'
                    onClick={clear}
                >
                    clear
                </div>
            </div>
        </div>
    )
}

export default Bottom
