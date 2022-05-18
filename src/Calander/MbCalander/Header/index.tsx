import React from 'react'
import { formatDate } from '../../Utils/unit'
import './index.css'
type Iprops = {
    start?: number | undefined
    end?: number | undefined
    isError?: boolean
}
const Header = (props: Iprops) => {
    const {
        end,
        start,
        // isError,
    } = props
    return (
        <div className='mb-calander-header mb_child_padding'>
           <div className='mb-add-date'>
                <div className='mb-add-date-title'>Check in</div>
                <div className='mb-add-date-time'>{start ? formatDate(start) : 'Add dates'}</div>
           </div>
           <div className='mb-day-detail'>
                <div className='mb-day-detail-radius'>
                    {
                        `共${start && end ? (end - start) / 86400000 : '0'}天`
                    }
                </div>
           </div>
           <div className='mb-add-date'>
                <div className='mb-add-date-title'>Check out</div>
                <div className='mb-add-date-time'>{end ? formatDate(end) : 'Add dates'}</div>
           </div>
        </div>
    )
}

export default Header
