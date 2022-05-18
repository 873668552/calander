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
        year,
        month,
        disableFn
    } = props

    console.log(monthDays)
    
    return (
        <div className='mb-body-con'>
        </div>
    )
}

export default Body