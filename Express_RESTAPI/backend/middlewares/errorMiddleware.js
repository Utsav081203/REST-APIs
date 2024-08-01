// by default the express error handler passes error in html.
// upon throwing error, the content-type is text-html
// thus we build custom error handler
// middlewares are just functions that execute during req-res cycle

// overwrite default express one
const errorHandler = (err, req, res, next) => {
    const statusCode = (res.statusCode ? res.statusCode : 500);
    // 500 for server error
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: (process.env.NODE_ENV === 'production' ? null : err.stack),
    });
};

module.exports = {
    errorHandler,
};