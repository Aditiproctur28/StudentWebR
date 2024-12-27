export const ErrorMessageHandling = (error) => {
    if (error.response && error.response.status) {
        switch (error.response.status) {
            case 400:
                return 'Bad Request';
            case 401:
                return 'Unauthorized';
            case 404:
                return 'Not Found';
            case 500:
                return 'Internal Server Error';
            case 503:
                return 'Service Unavailable';
            default:
                return "Something went wrong! Please try after sometime.";
        }
    } else {
        return 'Please check your internet connection!';
    }

}
