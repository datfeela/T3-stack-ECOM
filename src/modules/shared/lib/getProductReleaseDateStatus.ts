type GetProductReleaseDateStatus = (date: Date) => {
    status: 'new' | 'coming soon' | undefined
    daysSinceRelease: number
}

export const getProductReleaseDateStatus: GetProductReleaseDateStatus = (date) => {
    const dateNowMs = Date.now()
    const dateMs = date.getTime()
    const daysSinceRelease = Math.floor((dateNowMs - dateMs) / 1000 / 3600 / 24)

    if (daysSinceRelease < 0)
        return {
            status: 'coming soon',
            daysSinceRelease,
        }
    return { daysSinceRelease, status: daysSinceRelease > 180 ? undefined : 'new' }
}
