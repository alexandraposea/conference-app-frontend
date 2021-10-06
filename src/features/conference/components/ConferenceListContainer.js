import React, { useCallback, useEffect, useState } from 'react'
import ConferenceFilters from 'features/conference/components/ConferenceFilters'
import ConferenceList from './ConferenceList'
import LoadingFakeText from '@bit/totalsoft_oss.react-mui.fake-text'
import { extractPager, generateDefaultFilters } from 'utils/functions'
import { useError, useQueryWithErrorHandling } from 'hooks/errorHandling'
import { CONFERENCE_LIST_QUERY } from '../gql/queries/ConferenceListQuery'
import { useEmail } from 'hooks/useEmail'
import { useFooter } from 'providers/AreasProvider'
import Pagination from '@bit/totalsoft_oss.react-mui.pagination'
import { useMutation } from '@apollo/client'
import ATTEND_CONFERENCE from '../gql/mutations/AttendConference'
import WITHDRAW_CONFERENCE from '../gql/mutations/WithdrawConference'
import JOIN_CONFERENCE from '../gql/mutations/JoinConference'
import DialogDisplay from '@bit/totalsoft_oss.react-mui.dialog-display'
import ConferenceCodeModal from './ConferenceCodeModal'
import { useToast } from '@bit/totalsoft_oss.react-mui.kit.core'
import { useTranslation } from 'react-i18next'
import { emptyArray, emptyString } from 'utils/constants'
import { useHistory } from 'react-router'


function ConferenceListContainer() {
    const [filters, setFilters] = useState(generateDefaultFilters())
    const [pager, setPager] = useState({ totalCount: 0, page: 0, pageSize: 3 })
    const [suggestedConferences, setSuggestedConferences] = useState(emptyArray)
    const showError = useError()
    const [code, setCode] = useState()
    const [open, setOpen] = useState(false)
    const history = useHistory()


    const { t } = useTranslation()

    const addToast = useToast()

    const [email] = useEmail()
    const [, setFooter] = useFooter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => () => setFooter(null), [])

    const { data, loading, refetch } = useQueryWithErrorHandling(CONFERENCE_LIST_QUERY,
        {
            variables: {
                pager: extractPager(pager),
                filters,
                email
            },
            onCompleted: (result) => {
                const totalCount = result?.conferenceList.pagination.totalCount
                setPager(state => ({ ...state, totalCount }))
            }
        })

    const handleRowsPerPageChange = useCallback((pageSize) => {
        setPager(state => ({ ...state, pageSize: parseInt(pageSize) }))
    }, [])

    const handlePageChange = useCallback((page) => {
        setPager(state => ({ ...state, page }))
    }, [])

    const [attend] = useMutation(ATTEND_CONFERENCE, {
        onError: showError,
        onCompleted: result => {
            if (result?.attend) {
                setCode(result?.attend?.code)
                setSuggestedConferences(result?.attend?.suggestedConferences)
                setOpen(true)
                addToast(t('Conferences.SuccessfullyAttended'), 'success')
                refetch()
            }
        }
    })

    const handleAttend = useCallback(
        conferenceId => () => {
            attend({
                variables: {
                    input: {
                        conferenceId,
                        attendeeEmail: email
                    }
                }
            })
        }, [attend, email])

    const [withdraw] = useMutation(WITHDRAW_CONFERENCE, {
        onCompleted: () => {
            addToast(t("Conferences.SuccessfullyWithdrawn"), 'success')
            refetch()
        },
        onError: showError
    })

    const handleWithdraw = useCallback(conferenceId => () => {
        withdraw({
            variables: {
                input: {
                    conferenceId,
                    attendeeEmail: email
                }
            }
        })
    }, [withdraw, email]);

    const [join] = useMutation(JOIN_CONFERENCE, {
        onCompleted: () => {
            addToast(t("Conferences.SuccessfullyJoined"), 'success')
            refetch()
        },
        onError: showError
    })

    const handleJoin = useCallback(conferenceId => () => {
        join({
            variables: {
                input: {
                    conferenceId,
                    attendeeEmail: email
                }
            }
        })
        refetch()
        
        history.push(`/joinedConference/${conferenceId}`)
    }, [join, email, refetch, history]);

    useEffect(() => {
        setFooter(<Pagination
            totalCount={pager.totalCount}
            page={pager.page}
            pageSize={pager.pageSize}
            rowsPerPageOptions={[3, 6, 12, 24, 100]}
            onRowsPerPageChange={handleRowsPerPageChange}
            onPageChange={handlePageChange}
            onRefresh={refetch}
        />)
    }, [handlePageChange, handleRowsPerPageChange, pager.page, pager.pageSize, pager.totalCount, refetch, setFooter])

    const handleApplyFilters = useCallback((value) => {
        setFilters(value)
    }, [])

    const handleClose = useCallback(() => {
        setOpen(false)
        setCode(emptyString)
        refetch
    }, [refetch])

    if (loading || !data) { return <LoadingFakeText lines={10} /> }

    return (
        <>
            <ConferenceFilters filters={filters} onApplyFilters={handleApplyFilters} />
            <ConferenceList conferences={data?.conferenceList?.values}
                onAttend={handleAttend}
                onWithdraw={handleWithdraw}
                onJoin={handleJoin} />
            <DialogDisplay id='showQRCode'
                open={open}
                onClose={handleClose}
                title={t('General.Congratulations')}
                content={<ConferenceCodeModal
                    code={code}
                    suggestedConferences={suggestedConferences}
                    onAttend={handleAttend} />}
            />
        </>
    )
}

export default ConferenceListContainer;

