import React, { useCallback, useEffect, useState } from 'react'
import { initDate, getRenderDataPerMonth, completeDateVauleof, getFullYearDays } from './Utils/unit'

type Props = {
    initValue?: Array<number | undefined>
    visible?: Boolean
    onChange?: (date?: Array<any> | any) => void
    onClose?: (date: Array<any>) => void
    isSingle?: boolean
    disableFn?: (curDate: any) => boolean | undefined
    isMbCalander?: boolean
    mbCalanderYear?: Array<number>
};

const Calander = (props: Props) => {
    let nowDate = new Date()
    const {
        visible,
        initValue = [],
        isMbCalander,
        // 如果没有的话，选择当前年和后一年为初始化值
        mbCalanderYear = [nowDate.getFullYear(), nowDate.getFullYear() + 1]
    } = props
    let curDate = initValue[0] && !!new Date(initValue[0]).valueOf() ? new Date(initValue[0]) : nowDate
    let [isOpen, setIsOpen] = useState(!!visible);
    let [isSingle, setIsSingle] = useState(props.isSingle);
    let [addDays, setAddDays] = useState(0);
    let [start, setStart] = useState<number | undefined>(completeDateVauleof(initValue[0]) || 0);
    let [end, setEnd] = useState<number | undefined>(completeDateVauleof(!props.isSingle && initValue[1] && initValue[0] && initValue[1] > initValue[0] ? initValue[1] : 0 ));
    let [leftMonthDays, setLeftDays] = useState<any []>([]);
    let [rightMonthDays, setRightDays] = useState<any []>([]);
    let [year, setYear] = useState(curDate.getFullYear());
    let [month, setMonth] = useState(curDate.getMonth());
    // 日历渲染数据
    let mbDays: Array<any> = []
    if (isMbCalander) {
        mbCalanderYear && mbCalanderYear.map((item) => {
            mbDays.concat(getFullYearDays(item))
        })
    }
    let [mbCalander, setMbCalander] = useState<any []>(mbDays);
   
    useEffect(()=>{
        let initDays = initDate(curDate.getFullYear(), curDate.getMonth())
        setLeftDays(initDays[0])
        setRightDays(initDays[1])
        window.onresize = () => {
            let clientWidth=document.documentElement.clientWidth;
            if (clientWidth >= 1420) {
                setIsSingle(false)
            } else if (clientWidth < 1420) {
                setIsSingle(true)
            }
        }
    },[]) 

    useEffect(()=>{
        if (props.isSingle) {
            props.onChange && props.onChange(start)
        } else {
            props.onChange && props.onChange([start, end])
        }
    },[start, end]) 

    const onChange = useCallback((date: any) => {
        if (!date) {
            return
        }
        if (props.isSingle) {
            return setStart(date.valueOf())
        }
        if (!start) {
            return setStart(date.valueOf())
        }
        if (end && start) {
            if (start < date.valueOf() && end > date.valueOf()) {
                setStart(date.valueOf())
                return
            } else if (start > date.valueOf()) {
                setStart(date.valueOf())
                return
            } else if (end < date.valueOf()) {
                setEnd(date.valueOf())
                return
            } else if (end === date.valueOf() && start === date.valueOf()) {
                setStart(date.valueOf())
                setEnd(0)
                return
            } 
            else if (start === date.valueOf()) {
                setStart(date.valueOf())
                setEnd(0)
                return
            }
        }
        if (start && !end) {
            if (start > date.valueOf()) {
                setEnd(start)
                setStart(date.valueOf())
                return
            }
            if (start === date.valueOf()) {
                setStart(date.valueOf())
                setEnd(0)
                return
            }
            return setEnd(date.valueOf())
        }
    }, [start, end]);

    const onMonthChange = useCallback((type: string) => {
        // console.log(type)
        switch(type) {
            case 'add':
                addMonth();
                break;
            case 'reduce':
                reduceMonth();
                break;
        }
    }, [month, year]);

    const addMonth = useCallback(() => {
        let leftYear = year,
        leftMonth = month,
        rightMonth = month,
        rightYear = year;

        if (month === 10) {
            leftMonth = 11
            rightMonth = 0
            rightYear = leftYear + 1
        } else if (month === 11) {
            leftMonth = 0
            leftYear += 1
            rightMonth = 1
            rightYear = leftYear
        } else {
            leftMonth += 1
            rightMonth = leftMonth + 1
        }
        setLeftDays(getRenderDataPerMonth(leftYear, leftMonth))
        setRightDays(getRenderDataPerMonth(rightYear, rightMonth))
        setYear(leftYear)
        setMonth(leftMonth)
    }, [month, year])

    const reduceMonth = useCallback(() => {
        let leftYear = year,
        leftMonth = month,
        rightMonth = month,
        rightYear = year;

        if (month === 0) {
            leftMonth = 11
            leftYear -= 1
            rightMonth = 0
            rightYear = leftYear + 1
        } else {
            leftMonth -= 1
            rightMonth = leftMonth + 1
        }
        setLeftDays(getRenderDataPerMonth(leftYear, leftMonth))
        setRightDays(getRenderDataPerMonth(rightYear, rightMonth))
        setYear(leftYear)
        setMonth(leftMonth)
    }, [month, year])

    const bottomAddChange = useCallback((adds: number) => {
        // 86400000
        if (addDays === 0) {
            setAddDays(adds)
            if (!start) {
                let startDate = completeDateVauleof(initValue[0]) || 0,
                end = startDate + 86400000 * adds;
                setStart(startDate)
                setEnd(end)
            } else if (!end) {
                setEnd(start + 86400000 * adds)
            } else {
                setEnd(end + 86400000 * adds)
            }
        } else if (addDays === adds)  {
            setAddDays(0)
            if (end) {
                let endDate = end - 86400000 * adds
                if (endDate === start) {
                    setEnd(0)
                } else {
                    setEnd(endDate)
                }
            }
        } else {
            setAddDays(adds)
            if (!start) {
                let startDate = completeDateVauleof(initValue[0]) || 0,
                end = startDate + 86400000 * (adds - addDays);
                setStart(startDate)
                setEnd(end)
            } else if (!end) {
                setEnd(start + 86400000 * (adds - addDays))
            } else {
                setEnd(end + 86400000 * (adds - addDays))
            }
        }
    }, [start, end, addDays]);

    const clearDate = useCallback(() => {
        setAddDays(0)
        setEnd(0)
    },[])
    const onClose = useCallback(() => {
        setIsOpen(false)
    },[])

    return {
        addDays,
        mbCalander,
        isOpen, setIsOpen,
        isSingle, setIsSingle,
        start, setStart,
        end, setEnd,
        leftMonthDays,
        rightMonthDays,
        year,
        month,
        onChange,
        onMonthChange,
        bottomAddChange,
        clearDate,
        disableFn: props.disableFn,
        onClose:onClose,
        isMbCalander,
    }
}

export default Calander
