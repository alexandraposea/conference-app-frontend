import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Face, Info, LocationOn } from '@material-ui/icons'
import CardTitle from '@bit/totalsoft_oss.react-mui.card-title'
import IconCard from '@bit/totalsoft_oss.react-mui.icon-card'
import { AddButton } from '@bit/totalsoft_oss.react-mui.kit.core'
import MyConferenceInfo from './MyConferenceInfo'
import MyConferenceLocation from './MyConferenceLocation'
import MyConferenceSpeakers from './MyConferenceSpeakers'


const MyConference = (props) => {
    const { types, categories, countries, counties, cities } = props
    const { t } = useTranslation()

    return (
        <>
            <IconCard 
                icon={Info} 
                title={t('Conference.Info')}
                content={
                    <MyConferenceInfo  types={types} categories={categories}/>} />
            <IconCard 
                icon={LocationOn} 
                title={t('Conference.Location')}
                content={
                    <MyConferenceLocation   countries={countries}
                counties={counties}
                cities={cities}/>} 
            />
            <IconCard
                icon={Face}
                title={<CardTitle title={t('Conference.Speakers')}
                    actions={[<AddButton key='addSpeaker' title={t('General.Buttons.AddSpeaker')} />]} />}
                content={<MyConferenceSpeakers />}
            />
        </>
    )
}

MyConference.propTypes = {
    types: PropTypes.array,
    categories: PropTypes.array,
    countries: PropTypes.array,
    counties: PropTypes.array,
    cities: PropTypes.array

}

export default MyConference;