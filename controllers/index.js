module.exports = (controllerMethod) => async (ctx) => {
    const { method: domainMethod, parameters } = controllerMethod(ctx)

    const data = await domainMethod(parameters)
    return ctx.send(200, {
        success: true,
        data
    })
}
