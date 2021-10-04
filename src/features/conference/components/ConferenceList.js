import { Grid } from '@material-ui/core';
import React from 'react'
import PropTypes from 'prop-types'
import ConferenceItem from './ConferenceItem'

const ConferenceList = (props) => {
    const { conferences, onAttend } = props

    return (
        <>
            <Grid container spacing={2}>
                {conferences?.map((conference) => {
                    return <Grid item xs={12} lg={4} key={conference.id}>
                        <ConferenceItem conference={conference} onAttend={onAttend} />
                    </Grid>
                })}
            </Grid>
        </>
    )
}

ConferenceList.propTypes = {
    conferences: PropTypes.array,
    onAttend: PropTypes.func.isRequired
}

export default ConferenceList;