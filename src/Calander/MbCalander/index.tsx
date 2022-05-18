import React from 'react'
import Header from './Header'
import Body from './Body'
import Bottom from './Bottom'
import hooksDate from '../calanderhooks'
import './index.css'

type Props = {
    visible?: Boolean
    isSingle?: boolean
    initValue?: Array<number | undefined>
    onClose?: (date: Array<any>) => void
    onChange?: (date?: Array<any> | any) => void
    disableFn?: (curDate: any) => boolean | undefined
    mbCalanderYear?: Array<number>
};

const Calander = (props: Props) => {
    const {
        end,
        year,
        month,
        start,
        addDays,
        isSingle,
        mbCalander,
        leftMonthDays,
        rightMonthDays,
        onChange,
        disableFn,
        clearDate,
        onMonthChange,
        bottomAddChange,
    } = hooksDate({...props, isMbCalander: true})

    return (
        <div className='mb_calander_con'>
            <Header />
            <Body
                monthDays={mbCalander}
            />
            <Bottom />
        </div>
    )
}

export default Calander
