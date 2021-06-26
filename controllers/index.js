module.exports = (controllerMethod) => async (req, res, next) => {
    const { method: domainMethod, parameters } = controllerMethod(req)

    try {
        const data = await domainMethod(parameters)
        return res.json(200, {
            success: true,
            data
        })
    } catch (err) {
        return next(err)
    }
}
