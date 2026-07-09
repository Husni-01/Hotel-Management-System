export function getApiError(error) {
    if (error.response) {
        return (
            error.response.data?.message || error.response.data?.error || `Request failed with status ${error.response.status}`
        )
    }

    if (error.request) {
        return 'Cannot reach the API...'
    }

    return error.message || 'Something went wrong...'
}