import React from 'react'
import { formatDate } from '../../Utils/unit'
import './index.css'
type Iprops = {
    start?: number | undefined
    end?: number | undefined
    isSingle?: boolean
    isError?: boolean
}
const Header = (props: Iprops) => {
    const {
        start,
        end,
        isSingle
    } = props
    return (
        <div className='calander-header'>
            <div className='calander-header-title'>Select dates</div>
            <>
            {
                start || end ?
                <div className='calander-header-detail'>
                    {
                        isSingle ? formatDate(start) :
                        `${formatDate(start)} - ${end ? formatDate(end) : '-'} 共${start && end ? (end - start) / 86400000 : '-'}天`
                    }
                </div> 
                : 
                <div className='calander-header-intro'>how long do you want to stay</div>
            }
            </>
        </div>
    )
}

export default Header
