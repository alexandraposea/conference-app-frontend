import React, { useEffect, useReducer } from 'react'
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
// import { DICTIONARY_QUERY } from 'features/myConference/gql/queries/DictionaryQuery'

const MyConferenceContainer = () => {
    const { t } = useTranslation()
    const [, setHeader] = useHeader()
    const [conference, dispatch] = useReducer(reducer, initialConference)
    const match = useRouteMatch()
    const conferenceId = match.params.id
    const isNew = conferenceId === 'new'

    const { data, loading: loadingConference } = useQueryWithErrorHandling(CONFERENCE_QUERY,
        {
            variables: {
                id: conferenceId,
                isNew
            },

            onCompleted: (result) => result?.conference && dispatch({ type: 'resetConference', payload: result.conference })
        }
    )

    // const { loading } = useQueryWithErrorHandling(DICTIONARY_QUERY)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => () => setHeader(null), [])

    useEffect(() => {
        setHeader(<MyConferenceHeader title={conference.name} actions={<SaveButton title={t('General.Buttons.Save')} />} />)
    }, [conference.name, setHeader, t])

    if (loadingConference) {
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