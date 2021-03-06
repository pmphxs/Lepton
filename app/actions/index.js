'use strict'

import { getGitHubApi, GET_SINGLE_GIST } from '../utilities/githubApi'
import Notifier from '../utilities/notifier'
import { remote } from 'electron'
const logger = remote.getGlobal('logger')

export const UPDATE_USER_SESSION = 'UPDATE_USER_SESSION'
export const LOGOUT_USER_SESSION = 'LOGOUT_USER_SESSION'
export const UPDATE_ACCESS_TOKEN = 'UPDATE_ACCESS_TOKEN'
export const REMOVE_ACCESS_TOKEN = 'REMOVE_ACCESS_TOKEN'
export const UPDATE_GISTS = 'UPDATE_GISTS'
export const UPDATE_SYNC_TIME = 'UPDATE_SYNC_TIME'
export const UPDATE_SINGLE_GIST = 'UPDATE_SINGLE_GIST'
export const UPDATE_GIST_TAGS = 'UPDATE_GIST_TAGS'
export const SELECT_GIST_TAG = 'SELECT_GIST_TAG'
export const SELECT_GIST = 'SELECT_GIST'
export const UPDATE_AUTHWINDOW_STATUS = 'UPDATE_AUTHWINDOW_STATUS'
export const UPDATE_GIST_SYNC_STATUS = 'UPDATE_GIST_SYNC_STATUS'
export const UPDATE_SEARCHWINDOW_STATUS = 'UPDATE_SEARCHWINDOW_STATUS'
export const UPDATE_UPDATEAVAILABLEBAR_STATUS = 'UPDATE_UPDATEAVAILABLEBAR_STATUS'
export const UPDATE_NEW_VERSION_INFO = 'UPDATE_NEW_VERSION_INFO'

export function updateNewVersionInfo (status) {
  return {
    type: UPDATE_NEW_VERSION_INFO,
    payload: status
  }
}

export function updateUpdateAvailableBarStatus (status) {
  return {
    type: UPDATE_UPDATEAVAILABLEBAR_STATUS,
    payload: status
  }
}

export function updateGistSyncStatus (status) {
  return {
    type: UPDATE_GIST_SYNC_STATUS,
    payload: status
  }
}

export function updateAuthWindowStatus (status) {
  return {
    type: UPDATE_AUTHWINDOW_STATUS,
    payload: status
  }
}

export function updateSearchWindowStatus (status) {
  return {
    type: UPDATE_SEARCHWINDOW_STATUS,
    payload: status
  }
}

export function updateAccessToken (token) {
  return {
    type: UPDATE_ACCESS_TOKEN,
    payload: token
  }
}

export function removeAccessToken () {
  return {
    type: REMOVE_ACCESS_TOKEN,
    payload: null
  }
}

export function updateUserSession (session) {
  return {
    type: UPDATE_USER_SESSION,
    payload: session
  }
}

export function logoutUserSession () {
  return {
    type: LOGOUT_USER_SESSION,
    payload: null
  }
}

export function updateGists (gists) {
  return {
    type: UPDATE_GISTS,
    payload: gists
  }
}

export function updateSyncTime (time) {
  return {
    type: UPDATE_SYNC_TIME,
    payload: time
  }
}

export function updateSingleGist (gist) {
  return {
    type: UPDATE_SINGLE_GIST,
    payload: gist
  }
}

export function updateGistTags (tags) {
  return {
    type: UPDATE_GIST_TAGS,
    payload: tags
  }
}

export function selectGistTag (tag) {
  return {
    type: SELECT_GIST_TAG,
    payload: tag
  }
}

export function selectGist (id) {
  return {
    type: SELECT_GIST,
    payload: id
  }
}

export function fetchSingleGist (oldGist, id) {
  return (dispatch, getState) => {
    let state = getState()
    return getGitHubApi(GET_SINGLE_GIST)(state.accessToken, id)
      .then((details) => {
        let newGist = Object.assign(oldGist, { details: details })
        let newGistWithId = {}
        newGistWithId[id] = newGist
        dispatch(updateSingleGist(newGistWithId))
      })
      .catch((err) => {
        logger.error('The request has failed: ' + err)
        Notifier('Sync failed', 'Please check your network condition.')
      })
  }
}
