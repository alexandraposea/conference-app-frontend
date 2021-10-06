import Typography from '@bit/totalsoft_oss.react-mui.typography';
import { Box, Grid, ListItem, ListItemText } from '@material-ui/core';
import { useQueryWithErrorHandling } from 'hooks/errorHandling';
import React from 'react'
import { useRouteMatch } from 'react-router';
import USERS_LIST_QUERY from '../gql/queries/UsersListQuery'
import { CONFERENCE_QUERY } from 'features/myConference/gql/queries/ConferenceQuery'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text'
import user from 'assets/img/user.png'

const JoinedConference = () => {
    const match = useRouteMatch()
    const conferenceId = match.params.id
    const isNew = conferenceId === 'new'

    const { data, loading } = useQueryWithErrorHandling(USERS_LIST_QUERY,
        {
            variables: {
                id: conferenceId
            },

        })

    const { data: conferenceData, loading: loadingConference } = useQueryWithErrorHandling(CONFERENCE_QUERY,
        {
            variables: {
                id: conferenceId,
                isNew
            },

        }
    )

    // const { name, startDate, endDate, organizerEmail, ...cData } = conferenceData.conference

    if (loading || loadingConference) { return <LoadingFakeText lines={10} /> }


    return (
        <>
            <Grid container>
                <Grid container justifyContent="center" xs={8}>
                    <Grid container item direction="column">
                        <Typography>Nume: {conferenceData?.conference?.name}</Typography>
                        <Typography>Email organizator: {conferenceData?.conference?.organizerEmail}</Typography>
                        <Typography>Start date: {conferenceData?.conference?.startDate}</Typography>
                        <Typography>End date: {conferenceData?.conference?.endDate}</Typography>
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" xs={4} direction="column">
                    <Typography variant="h6" justifyContent="center">Participants</Typography>
                    {data?.users?.map((element) =>
                        <Grid item key={data.users.indexOf(element)}>
                            <Typography>{element.attendeeEmail}</Typography>
                        </Grid>
                    )}
                </Grid>
                <Grid container justifyContent="center" xs={4} direction="column">
                    <Typography variant="h6" justifyContent="center">Speakers</Typography>
                    {conferenceData?.conference?.speakers?.map((element) =>
                        <Grid item key={element.id}>
                            <img src={user} alt="user" style={{ maxHeight: '100px' }} />
                            <Typography>{element.name}</Typography>

                        </Grid>
                    )}
                </Grid>
            </Grid>
        </>

        // <Box
        //     sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
        // >
        //     {data?.users?.map((element) => {
        //         return <ListItem key={data.users.indexOf(element)} component="div" disablePadding>
        //             <ListItemText primary={element.attendeeEmail} />
        //         </ListItem>
        //     })}

        // </Box>
    )
}

export default JoinedConference;