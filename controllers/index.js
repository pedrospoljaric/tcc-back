/* eslint-disable consistent-return */
module.exports = (controllerMethod) => async (req, res, next) => {
    const { method: domainMethod, parameters } = controllerMethod(req)

    try {
        const data = await domainMethod(parameters)
        return res.status(200).send({
            success: true,
            data
        })
    } catch (err) {
        next(err)
    }
}
