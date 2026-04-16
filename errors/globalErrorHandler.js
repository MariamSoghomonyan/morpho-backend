const isProduction = process.env.NODE_ENV === 'production';

export default function globalErrorHandler(err, req, res, next) {
    const statusCode = err.status || 500;

    if (!isProduction) {
        console.error(err);
    }

    res.status(statusCode).render('500', {
        title: "Internal Server Error",
        status: statusCode,
        stack: isProduction ? null : err.stack,
        layout: false,
    });
}