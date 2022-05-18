import React from 'react'
import { formatDate } from '../../Utils/unit'
import './index.css'
type Iprops = {
    start?: number | undefined
    end?: number | undefined
}
const Bottom = (props: Iprops) => {
    const {
        start,
        end,
    } = props
    return (
        <div className='mb-calander-bottom mb_child_padding'>
           
        </div>
    )
}

export default Bottom
