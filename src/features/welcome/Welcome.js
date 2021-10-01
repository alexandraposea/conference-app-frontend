import React, { useCallback, useState } from 'react'
import { Typography, Grid, InputAdornment } from '@material-ui/core'
import { useTranslation } from 'react-i18next'
import CustomTextField from '@bit/totalsoft_oss.react-mui.custom-text-field'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'
import IconButton from '@bit/totalsoft_oss.react-mui.icon-button'
import { emptyString } from 'utils/constants'
import { useEmail } from "hooks/useEmail"
import { validateEmail } from 'utils/functions'

function Welcome() {
  const { t } = useTranslation()
  const handleChange = useCallback((e) => setTextFieldValue(e.target.value), [])
  const [email, setEmail] = useEmail()
  const [textFieldValue, setTextFieldValue] = useState(email)
  const [isValid, setIsValid] = useState(true)

  const handleButtonClick = useCallback(() => {
    const validEmail = validateEmail(textFieldValue)
    if (validEmail)
      setEmail(textFieldValue)
    else
      setEmail(emptyString)
    setIsValid(validEmail)
  }, [textFieldValue, setEmail])

  const handleKeyDown = useCallback((event) => {
    if (event.keyCode === 13) {
      handleButtonClick()
    }
  }, [handleButtonClick])

  return (
    <Grid container direction="column" alignItems="center" spacing={10}>
      <Grid item>
        <Typography variant="h5">{t("Welcome.title")}</Typography>
      </Grid>
      <Grid container direction="column" alignItems="center" spacing={2}>
        <Grid item>
          <Typography variant="caption">{t("Welcome.subtitle")}</Typography>
        </Grid>
        <Grid item>
          <CustomTextField debounceBy={0}
            onChange={handleChange}
            value={textFieldValue}
            onKeyDown={handleKeyDown}
            helperText={!isValid && t("Welcome.BadEmail")}
            error={!isValid}
            endAdornment={<InputAdornment position="end">
              <IconButton size="small" color="theme" aria-label="go" onClick={handleButtonClick}><KeyboardReturnIcon fontSize="small" /></IconButton>
            </InputAdornment>}>
          </CustomTextField>
        </Grid>
      </Grid>
    </Grid>
  )
}


export default Welcome
