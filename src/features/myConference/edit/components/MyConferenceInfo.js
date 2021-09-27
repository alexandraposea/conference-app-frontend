import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Grid } from '@material-ui/core'
import CustomTextField from '@bit/totalsoft_oss.react-mui.custom-text-field'
import DateTime from '@bit/totalsoft_oss.react-mui.date-time'
import Autocomplete from '@bit/totalsoft_oss.react-mui.autocomplete'
import { onTextBoxChange } from 'utils/propertyChangeAdapters'

const MyConferenceInfo = (props) => {
    const { types, categories, conference, dispatch } = props
    const { t } = useTranslation()
    const { name, startDate, endDate, type, category } = conference
    const handleChange = type => value => dispatch({ type: type, payload: value })

    return <Grid container spacing={3}>
        <Grid item lg={9} container spacing={3}>
            <Grid item lg={4} sm={6} xs={12}>
                <CustomTextField label={t('Conference.Name')} fullWidth
                    value={name}
                    onChange={onTextBoxChange(handleChange('name'))} />
            </Grid>
        </Grid>
        <Grid item lg={12} container spacing={3}>
            <Grid item lg={3} sm={6} xs={12}>
                <DateTime label={t('Conference.StartDate')} showTime={true}
                    value={startDate}
                    onChange={handleChange('startDate')} />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
                <DateTime label={t('Conference.EndDate')} showTime={true}
                    value={endDate}
                    onChange={handleChange('endDate')} />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
                <Autocomplete label={t('Conference.Type')} fullWidth isClearable options={types}
                    value={type}
                    onChange={handleChange('type')} />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
                <Autocomplete label={t('Conference.Category')} fullWidth isClearable options={categories}
                    value={category}
                    onChange={handleChange('category')} />
            </Grid>
        </Grid>
    </Grid>
}

MyConferenceInfo.propTypes = {
    conference: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    types: PropTypes.array,
    categories: PropTypes.array
}

export default MyConferenceInfo;