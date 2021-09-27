import React, { useEffect, useReducer } from 'react'
import { useTranslation } from 'react-i18next';
import { useHeader } from 'providers/AreasProvider'
import MyConferenceHeader from '../../list/components/MyConferenceHeader';
import SaveButton from '@bit/totalsoft_oss.react-mui.save-button';
import { categories, counties, countries, types, cities } from '../../../../utils/mocks/conferenceDictionaries';
import MyConference from './MyConference';
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text'
import { reducer, initialConference } from '../conferenceState'
import { useRouteMatch } from 'react-router';
import {conference as mockConference} from 'utils/mocks/myConference'


const MyConferenceContainer = () => {
    const { t } = useTranslation()
    const [, setHeader] = useHeader()
    const [conference, dispatch] = useReducer(reducer, initialConference)
    const match = useRouteMatch()
    const conferenceId = match.params.id
    const isNew = conferenceId === 'new'


    useEffect(() => {
        if(!isNew) {
            dispatch({type: 'resetConference', payload: mockConference})
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => () => setHeader(null), [])

    useEffect(() => {
        setHeader(<MyConferenceHeader title={conference.name} actions={<SaveButton title={t('General.Buttons.Save')} />} />)
    }, [conference.name, setHeader, t])

    const { loading, data } = {
        loading: false,
        data: {
            typeList: types,
            categoryList: categories,
            countryList: countries,
            countyList: counties,
            cityList: cities
        }
    }

    if (loading) {
        return <LoadingFakeText lines={10} />
    }

    return (
        <MyConference
            conference={conference}
            dispatch={dispatch}
            types={data?.typeList}
            categories={data?.categoryList}
            countries={data?.countryList}
            counties={data?.countyList}
            cities={data?.cityList}
        />

    )
}

export default MyConferenceContainer;