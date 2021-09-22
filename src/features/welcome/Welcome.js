import React from 'react'
import { Typography, Grid, InputAdornment} from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import CustomTextField from '@bit/totalsoft_oss.react-mui.custom-text-field'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'
import IconButton from '@bit/totalsoft_oss.react-mui.icon-button'



function Welcome() {
  const { t } = useTranslation()

 return (
   <Grid container direction="column"  alignItems="center" spacing={10}>
     <Grid item>
      <Typography variant="h5">{t("Welcome.title")}</Typography>
     </Grid>
     <Grid container direction="column"  alignItems="center">
     <Grid item>
      <Typography variant="caption">{t("Welcome.subtitle")}</Typography>
      </Grid>
      <Grid item>
      <CustomTextField 
        endAdornment = {<InputAdornment position="end">
            <IconButton size="small" color="theme" aria-labels="go"><KeyboardReturnIcon fontSize="small"/></IconButton>
          </InputAdornment>}>
      </CustomTextField>
     </Grid>
     </Grid>
   </Grid>
 )
}

export default Welcome
