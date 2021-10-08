/* eslint-disable consistent-return */
module.exports = (controllerMethod) => async (ctx) => {
    const { method: domainMethod, parameters } = controllerMethod(ctx)

    try {
        const data = await domainMethod(parameters)
        return ctx.send(200, {
            success: true,
            data
        })
    } catch (err) {
        ctx.app.emit('error', err, ctx)
    }
}
