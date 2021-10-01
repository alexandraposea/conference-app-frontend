import React, { useEffect, useReducer, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useHeader } from 'providers/AreasProvider'
import MyConferenceHeader from '../../list/components/MyConferenceHeader';
import SaveButton from '@bit/totalsoft_oss.react-mui.save-button';
import MyConference from './MyConference';
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text'
import { reducer, initialConference } from '../conferenceState'
import { useRouteMatch } from 'react-router';
import { useQueryWithErrorHandling } from 'hooks/errorHandling';
import { CONFERENCE_QUERY } from 'features/myConference/gql/queries/ConferenceQuery'
import { categories, cities, counties, countries, types } from 'utils/mocks/conferenceDictionaries';

const MyConferenceContainer = () => {
    const { t } = useTranslation()
    const [, setHeader] = useHeader()
    const [conference, dispatch] = useReducer(reducer, initialConference)
    const match = useRouteMatch()
    const conferenceId = match.params.id
    const isNew = conferenceId === 'new'

    const { loading: loadingConference } = useQueryWithErrorHandling(CONFERENCE_QUERY,
        {
            variables: {
                id: conferenceId
            },
            skip: isNew,
            onCompleted: (result) => dispatch({ type: 'resetConference', payload: result.conference })
        }
    )

    const { loading, data } = {
        loading: false, data: {
            typeList: types,
            categoryList: categories,
            countryList: countries,
            countyList: counties,
            cityList: cities
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => () => setHeader(null), [])

    useEffect(() => {
        setHeader(<MyConferenceHeader title={conference.name} actions={<SaveButton title={t('General.Buttons.Save')} />} />)
    }, [conference.name, setHeader, t])

    if (loading || loadingConference) {
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