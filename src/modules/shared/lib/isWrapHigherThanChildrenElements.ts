interface Props {
    wrapEl: Element
    children: HTMLCollection
    withParentPadding?: boolean
}

export const isWrapHigherThanChildrenElements = ({
    wrapEl,
    children,
    withParentPadding = false,
}: Props) => {
    let wrapperHeight = wrapEl.clientHeight

    if (!withParentPadding) {
        const computedStyle = getComputedStyle(wrapEl)
        const padding =
            parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom)

        wrapperHeight -= padding
    }

    const childElements = Array.from(children)

    let childrenHeight = 0

    childElements.forEach((el) => {
        childrenHeight += el.clientHeight
    })

    if (childrenHeight > wrapperHeight) return false
    return true
}
