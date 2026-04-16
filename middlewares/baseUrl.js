export default function baseUrlMiddleware(req, res, next) {
    req.baseFullUrl = `${req.protocol}://${req.get('host')}`;
    next();
}