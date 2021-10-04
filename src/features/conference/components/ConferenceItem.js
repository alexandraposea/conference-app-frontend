import RegularCard from '@bit/totalsoft_oss.react-mui.regular-card';
import PropTypes from 'prop-types'
import React from 'react'
import ConferenceSubtitle from './ConferenceSubtitle'
import ConferenceContent from './ConferenceContent'

const ConferenceItem = props => {
    const { conference, onAttend } = props
    const { name, location, speakers } = conference
    const speaker = speakers.find(item => item.isMainSpeaker)

    return <RegularCard cardTitle={name}
        cardSubtitle={<ConferenceSubtitle speaker={speaker} location={location} />}
        content={<ConferenceContent conference={conference} onAttend={onAttend} />} />
}

ConferenceItem.propTypes = {
    conference: PropTypes.object.isRequired,
    onAttend: PropTypes.func.isRequired
}

export default ConferenceItem;