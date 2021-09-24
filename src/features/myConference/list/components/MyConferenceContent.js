import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Grid, Typography } from '@material-ui/core'
import Button from '@bit/totalsoft_oss.react-mui.button'

const MyConferenceContent = (props) => {
    const { conference } = props
    const { startDate, endDate, type, category } = conference
    const { t } = useTranslation()

    const startDateFormatted = t('DATE_FORMAT', { date: { value: startDate, format: 'DD-MM-YYYY HH:mm' } })
    const endDateFormatted = t('DATE_FORMAT', { date: { value: endDate, format: 'DD-MM-YYYY HH:mm' } })

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="caption">{`${startDateFormatted} - ${endDateFormatted}`}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="caption">{`${type?.name}, ${category?.name}`}</Typography>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Button right size="sm" color="danger">{t('MyConferences.Delete')}</Button>
                        <Button right size="sm" color="info">{t('MyConferences.Edit')}</Button>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

MyConferenceContent.propTypes = {
    conference: PropTypes.object.isRequired
    // shape({a: PropTypes.func, t: PropTypes.string, s:PropTypes.object}) varianta pentru forma obiectului
}

export default MyConferenceContent;