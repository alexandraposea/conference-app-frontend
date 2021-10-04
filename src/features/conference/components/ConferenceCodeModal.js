import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Grid, Typography } from '@material-ui/core'
import qrCode from 'assets/img/QRCode.png'


const ConferenceCodeModal = ({ code }) => {
    const { t } = useTranslation()
    return (
        <Grid container justifyContent='center'>
            <Grid item lg={12}>
                <img alt='QR' src={qrCode} style={{ maxHeight: '100px' }} />
            </Grid>
            <Grid item>
                <Typography variant='subtitle1'> {t('Conferences.QRCodeMessage', { code })}</Typography>
            </Grid>
        </Grid>
    )

}

ConferenceCodeModal.propTypes = {
    code: PropTypes.string
}

export default ConferenceCodeModal