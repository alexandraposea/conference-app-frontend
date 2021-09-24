import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import CustomTextField from '@bit/totalsoft_oss.react-mui.custom-text-field'
import Autocomplete from '@bit/totalsoft_oss.react-mui.autocomplete'
import { useTranslation } from 'react-i18next';

const MyConferenceLocation = (props) => {
		const { countries, counties, cities } = props
    const { t } = useTranslation();

    return <Grid item container lg={12} spacing={3}>
        <Grid item container lg={12} spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
                <CustomTextField
                    label={t('Location.Name')}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
                <CustomTextField
                    label={t('Location.Address')}
                    fullWidth
                />
            </Grid>
        </Grid>
        <Grid item container lg={12} spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
                <Autocomplete
                    label={t('Location.Country')}
                    createdLabel='Location.Country'
                    fullWidth
                    isClearable
                    options={countries}
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <Autocomplete
                    label={t('Location.County')}
                    createdLabel='Location.County'
                    fullWidth
                    isClearable
                    options={counties}
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <Autocomplete
                    label={t('Location.City')}
                    createdLabel='Location.City'
                    fullWidth
                    isClearable
                    isSearchable
                    creatable
                    options={cities}
                />
            </Grid>
        </Grid>
        <Grid item container lg={12} spacing={3}>
            <Grid item xs={12} sm={6} lg={3}>
                <CustomTextField
                    label={t('Location.Latitude')}
                    fullWidth
                />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
                <CustomTextField
                    label={t('Location.Longitude')}
                    fullWidth
                />
            </Grid>
        </Grid>
    </Grid>
}

MyConferenceLocation.propTypes = {
    countries: PropTypes.array.isRequired,
    counties: PropTypes.array.isRequired,
    cities: PropTypes.array.isRequired
}

export default MyConferenceLocation;