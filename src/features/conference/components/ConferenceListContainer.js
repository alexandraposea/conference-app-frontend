import React, { useCallback, useState } from 'react'
import ConferenceFilters from 'features/conference/components/ConferenceFilters'
import conferences from 'utils/mocks/attendeeList'
import ConferenceList from './ConferenceList'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text'
import { generateDefaultFilters } from 'utils/functions'

function ConferenceListContainer() {
    const {data, loading} = {data: conferences, loading: false}
    const [filters, setFilters] = useState(generateDefaultFilters())
    const handleApplyFilters = useCallback((value) => {
        setFilters(value)
    }, [])

    if (loading) {return <LoadingFakeText lines = {10}/>}

    return ( 
    <>
        <ConferenceFilters filters = {filters} onApplyFilters = {handleApplyFilters}/>
        <ConferenceList conferences={data}/>
    </>
    )
}

export default ConferenceListContainer;

