import React from 'react'
import Header from './Header'
import Body from './Body'
import Bottom from './Bottom'
import { formatDays } from '../Utils/unit'
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
        isError,
        addDays,
        isSingle,
        mbCalander,
        leftMonthDays,
        rightMonthDays,
        mbCalanderYear,
        setError,
        onChange,
        disableFn,
        clearDate,
        onMonthChange,
        bottomAddChange,
    } = hooksDate({...props, isMbCalander: true})
    // console.log(mbCalander)
    return (
        <div className='mb_calander_con'>
            <Header
                end={end}
                start={start}
                isError={isError}
            />
            {/* 错误提示 */}
            {
                isError ?
                    <div className='mb-error-con mb_child_padding'>
                        <div className='mb-error'>
                            <div className='mb-error-icon'>
                                <img alt='pic' className='mb-error-icon-img' />
                            </div>
                            <div className='mb-error-text'>This date is not available for checkout</div>
                            <div
                                className='mb-error-close'
                                onClick={() => {setError(false)}}
                            >+</div>
                        </div>
                    </div>
                    : ''
            }
            <div className='mb-body-con'>
                {
                    mbCalander && mbCalander.map((fullYearDays, ind) => {
                        return (
                            <>
                                {
                                    fullYearDays.map((monDays, monInd) => {
                                        return (
                                            <Body
                                                key={`${ind}-${monInd}`}
                                                monthDays={formatDays(monDays)}
                                                onChange={onChange}
                                                start={start ? start : 0}
                                                end={end ? end : 0}
                                                disableFn={disableFn}
                                                year={mbCalanderYear[ind]}
                                                mon={monInd}
                                            />
                                        )
                                    })
                                }
                            </>
                        )
                    })
                }
            </div>
            <Bottom
                onChange={bottomAddChange}
                addDays={addDays}
                clear={clearDate}
            />
        </div>
    )
}

export default Calander
