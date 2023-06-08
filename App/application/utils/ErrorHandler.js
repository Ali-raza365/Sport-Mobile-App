export const handleAxiosError = (err) => {
    if (err.response) {
        if (err.response.status === 413) {
            alert('Attachment size should be less than 1MB');
        } else if (err?.response?.data?.msg) {
            alert(err?.response?.data?.msg)
        } else if (err?.response?.data?.message) {
            alert(err?.response?.data?.message)
        } else if (err?.response?.data?.error) {
            alert(err?.response?.data?.error)
        } else if (err?.message) {
            alert(err?.message)
        } else if (err?.response?.data) {
            // alert('Something is going wrong. Please try again');
            alert(JSON.stringify(err));
        }
        else {
            alert(JSON.stringify(err.response.data));
        }
    } else if (err.request) {
        alert(JSON.stringify(err));
        // alert('Server is not responding. Please try again');
    } else {
        alert(err);
    }
}