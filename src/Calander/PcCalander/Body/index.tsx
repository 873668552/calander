import React from 'react'
import { isInrenger } from '../../Utils/unit'
import './index.css'
import { WEEK_SHORT_ARRAY } from '../../Utils/config'
type Iprops = {
    monthDays?: Array<any>
    type?: string
    onChange?: any
    start?: number | undefined
    end?: number | undefined
    isSingle?: boolean
    monthChange?: any
    year?: number
    month?: string
    position?: string
    disableFn?: (curDate: any) => boolean | undefined
}
const Body = (props: Iprops) => {
    const {
        start,
        end,
        monthDays,
        onChange,
        isSingle,
        monthChange,
        year,
        month,
        position,
        disableFn
    } = props

    // console.log(monthDays)
    
    return (
        <div>
            <div className='pc_body pc_body_change_mon'>
                <div className={isSingle ? 'arr_left' : 'arr_left'}
                    onClick={(e) => { monthChange('reduce') }}
                    style={position === 'right' && !isSingle ? { visibility: 'hidden' } : {}}
                />
                <div>{`${month} ${year}`}</div>
                <div className={isSingle ? 'arr_right' : 'arr_right'}
                    onClick={(e) => { monthChange('add') }}
                    style={position === 'left' && !isSingle ? { visibility: 'hidden' } : {}}
                />
            </div>
            {/* monthchange */}
            <div className='pc_body pc_body_title'>
            {
                WEEK_SHORT_ARRAY.map(week_name => {
                    return (
                        <div
                            className='rows_title'
                        >
                            {week_name}
                        </div>
                    )
                })
            }
            </div>
            {
                monthDays?.map(list => (
                    <div className='pc_body'>
                        {
                            list.map((date: any, ind: number) => {
                                return (
                                    <div
                                        className={`rows ${date && isInrenger(date.valueOf(), start, end) ? 'm2m-picker-cell-in-range' : ''}`}
                                    >
                                        {
                                            disableFn && disableFn(date) ?
                                                <div className='rows-disable'>
                                                    { date ? date.getDate() : '' }
                                                </div>
                                                :
                                                <>
                                                    <div className={`${end && start && date && date.valueOf() === start ? 'ows-con-start-half' : ''} ${end && start && date && date.valueOf() === end ? 'ows-con-end-half' : ''}`} />
                                                        <div
                                                            className={`rows-con ${date && date.valueOf() === start ? 'm2m-picker-cell-in-start' : ''} ${date && date.valueOf() === end ? 'm2m-picker-cell-in-end' : ''}`}
                                                            onClick={() => { onChange(date, ind) }}
                                                        >
                                                            {
                                                                date ? date.getDate() : ''
                                                            }
                                                    </div>
                                                </>
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default Body