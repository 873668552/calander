import React from 'react'
import CalHeader from './Header'
import CalBody from './Body'
import CalBottom from './Bottom'
import { formatDays } from '../Utils/unit'
import { MONTH_LONG_MAP } from '../Utils/config'
import hooksDate from '../calanderhooks'
import './index.css'

type Props = {
    style?: any
    visible?: Boolean
    isSingle?: boolean
    isAbsolute?: boolean
    initValue?: Array<number | undefined>
    onClose?: (date: Array<any>) => void
    onChange?: (date?: Array<any> | any) => void
    disableFn?: (curDate: any) => boolean | undefined
};

const Calander = (props: Props) => {
    const {
        end,
        year,
        month,
        start,
        style,
        isError,
        addDays,
        isSingle,
        isAbsolute,
        leftMonthDays,
        rightMonthDays,
        onChange,
        disableFn,
        clearDate,
        onMonthChange,
        bottomAddChange
    } = hooksDate(props)

    return (
        <>
        {
            props.visible ?
                <div
                    onClick={e => e.stopPropagation()}
                    className='calander_con'
                    style={{ position: `${isAbsolute ? 'absolute' : 'relative'}`, ...style }}
                >
                    <CalHeader
                        end={end}
                        start={start}
                        isError={isError}
                        isAbsolute={isAbsolute}
                        isSingle={props.isSingle}
                    />
                    <div
                        className='calander_con_body'
                        style={isSingle ? { justifyContent: 'center' } : {}}
                    >
                        <CalBody
                            isSingle={isSingle}
                            position='left'
                            monthDays={formatDays(leftMonthDays)}
                            type='pc'
                            onChange={onChange}
                            start={start ? start : 0}
                            end={end ? end : 0}
                            monthChange={onMonthChange}
                            year={year}
                            month={`${MONTH_LONG_MAP[month]}`}
                            disableFn={disableFn}
                        />
                        {
                            isSingle ? '' :
                            <CalBody
                                isSingle={false}
                                position='right'
                                monthDays={formatDays(rightMonthDays)}
                                type='pc'
                                onChange={onChange}
                                start={start ? start : 0}
                                end={end ? end : 0}
                                monthChange={onMonthChange}
                                year={month === 11 ? year + 1 : year}
                                disableFn={disableFn}
                                month={`${MONTH_LONG_MAP[month === 11 ? 0 : month + 1]}`}
                            />
                        }
                    </div>
                    {
                        props.isSingle ? ''
                        :
                        <CalBottom
                            onChange={bottomAddChange}
                            addDays={addDays}
                            clear={clearDate}
                        />
                    }
                </div> : ''
        }
        </>
    )
}

export default Calander
