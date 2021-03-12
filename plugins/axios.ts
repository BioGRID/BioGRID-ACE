const axiosIntercept = (context: any) => {
    context.$axios.onError((error: any) => {
        if (error.name === 'ExpiredAuthSessionError') {
            return context.redirect('/login')
        } else {
            return Promise.reject(error)
        }
    })
}

export default axiosIntercept
