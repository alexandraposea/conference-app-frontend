import RegularCard from '@bit/totalsoft_oss.react-mui.regular-card';
import PropTypes from 'prop-types'
import React from 'react'
import MyConferenceSubtitle from './MyConferenceSubtitle'
import MyConferenceContent from './MyConferenceContent'

const MyConferenceItem = props => {
    const { conference } = props
    const { name, location, speakers } = conference
    const speaker = speakers.find(item => item.isMainSpeaker)

    return <RegularCard cardTitle={name}
        cardSubtitle={<MyConferenceSubtitle speaker={speaker} location={location} />}
        content={<MyConferenceContent conference={conference} />} />
}

MyConferenceItem.propTypes = {
    conference: PropTypes.object.isRequired
}

export default MyConferenceItem;