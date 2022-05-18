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
            <div className='mb-calander-rows-con mb-week-title-con'>
            {
                WEEK_SHORT_ARRAY.map(week_name => {
                    return (
                        <div
                            className='mbrows_week_title'
                        >
                            {week_name}
                        </div>
                    )
                })
            }
            </div>
            {
                monthDays?.map(list => (
                    <div className='mb-calander-rows-con'>
                        {
                            list.map((date: any, ind: number) => {
                                return (
                                    <div
                                        className={`mbrows ${date && isInrenger(date.valueOf(), start, end) ? 'mbm2m-picker-cell-in-range' : ''}`}
                                    >
                                        {
                                            disableFn && disableFn(date) ?
                                                <div className='mbrows-disable'>
                                                    { date ? date.getDate() : '' }
                                                </div>
                                                :
                                                <>
                                                    <div className={`${end && start && date && date.valueOf() === start ? 'mbows-con-start-half' : ''} ${end && start && date && date.valueOf() === end ? 'mbows-con-end-half' : ''}`} />
                                                        <div
                                                            style={date ? { cursor: 'pointer' } : {}}
                                                            className={`${date ? 'rows-has-date' : ''} mbrows-con ${date && date.valueOf() === start ? 'mbm2m-picker-cell-in-start' : ''} ${date && date.valueOf() === end ? 'mbm2m-picker-cell-in-end' : ''}`}
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