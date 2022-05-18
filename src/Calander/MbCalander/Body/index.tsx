import React from 'react'
import { isInrenger } from '../../Utils/unit'
import { WEEK_SHORT_ARRAY, MONTH_LONG_MAP } from '../../Utils/config'
import './index.css'
type Iprops = {
    monthDays?: Array<any>
    onChange?: any
    start?: number | undefined
    end?: number | undefined
    disableFn?: (curDate: any) => boolean | undefined
    year?: string | number
    mon?: number
}
const Body = (props: Iprops) => {
    const {
        end,
        start,
        mon,
        year,
        monthDays,
        onChange,
        disableFn,
    } = props

    return (
        <div>
            <div className='mb-time-title'>{mon || mon === 0 ? MONTH_LONG_MAP[mon] : '-'} {year}</div>
            <div className='calander-rows-con week-title-con'>
            {
                WEEK_SHORT_ARRAY.map(week_name => {
                    return (
                        <div
                            className='rows_week_title'
                        >
                            {week_name}
                        </div>
                    )
                })
            }
            </div>
            {
                monthDays?.map(list => (
                    <div className='calander-rows-con'>
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