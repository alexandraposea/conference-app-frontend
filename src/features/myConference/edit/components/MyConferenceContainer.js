import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useHeader } from 'providers/AreasProvider'
import MyConferenceHeader from '../../list/components/MyConferenceHeader';
import SaveButton from '@bit/totalsoft_oss.react-mui.save-button';
import { categories, counties, countries, types, cities } from '../../../../utils/mocks/conferenceDictionaries';
import MyConference from './MyConference';
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text'


const MyConferenceContainer = () => {
    const { t } = useTranslation()
    const [, setHeader] = useHeader()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => () => setHeader(null), [])

    useEffect(() => {
        setHeader(<MyConferenceHeader actions={<SaveButton title={t('General.Buttons.Save')} />} />)
    }, [setHeader, t])

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
        <MyConference types={data?.typeList}
            categories={data?.categoriesList}
            countries={data?.countryList}
            counties={data?.countyList}
            cities={data?.cityList}
        />

    )
}

export default MyConferenceContainer;