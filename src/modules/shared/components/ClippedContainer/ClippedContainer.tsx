import { CSSProperties, useEffect, useState } from 'react'
import type { DefaultColor } from '../../types/types'
import s from './ClippedContainer.module.scss'
import { useMatchMedia } from '../../hooks/useMatchMedia'

type Corner = 'topLeft' | 'topRight' | 'botRight' | 'botLeft'

export interface ClippedContainerProps {
    width?: 'full' | 'fit'
    height?: 'full' | 'fit'
    clipSize?: 'sm' | 'md' | 'lg'
    color?: DefaultColor
    borderColor?: DefaultColor
    children: React.ReactNode
    corners?: { [key in Corner]?: boolean }
    borders?: boolean
    withPadding?: boolean
}

export const ClippedContainer = ({
    color = 'purple',
    borderColor = 'purple',
    clipSize = 'sm',
    width = 'full',
    height = 'fit',
    corners = { botRight: true },
    children,
    borders = true,
    withPadding = false,
}: ClippedContainerProps) => {
    let containerCName = s.clip

    switch (color) {
        case 'blue':
            containerCName += ` ${s.clip_blue}`
            break
        case 'red':
            containerCName += ` ${s.clip_red}`
            break
        case 'yellow':
            containerCName += ` ${s.clip_yellow}`
            break
        default:
            break
    }

    switch (borderColor) {
        case 'blue':
            containerCName += ` ${s.clip_borderBlue}`
            break
        case 'red':
            containerCName += ` ${s.clip_borderRed}`
            break
        case 'yellow':
            containerCName += ` ${s.clip_borderYellow}`
            break
        default:
            break
    }

    if (width === 'fit') containerCName += ` ${s.clip_widthFit}`
    if (height === 'fit') containerCName += ` ${s.clip_heightFit}`

    if (!borders) containerCName += ` ${s.clip_noBorder}`

    const matchMedia = useMatchMedia()

    const getCurrentClipSize = () => {
        let size = 1
        if (clipSize === 'md') size = 2
        if (clipSize === 'lg') size = 3

        if (matchMedia?.isLess480 || matchMedia?.isMore480) size = size * 0.5
        if (matchMedia?.isMore768 || matchMedia?.isMore960) size = size * 0.75

        return `${size}rem`
    }

    //clip formula
    let [size, setSize] = useState(getCurrentClipSize())

    useEffect(() => {
        setSize(getCurrentClipSize())
    }, [matchMedia])

    const topLeftStart = corners.topLeft ? `${size} 0,` : '0 0,'
    const topRight = corners.topRight ? `calc(100% - ${size}) 0, 100% ${size},` : '100% 0,'
    const botRight = corners.botRight
        ? `100% calc(100% - ${size}), calc(100% - ${size}) 100%,`
        : '100% 100%,'
    const botLeft = corners.botLeft ? `${size} 100%, 0 calc(100% - ${size}),` : '0 100%,'
    const topLeftEnd = corners.topLeft ? `0 ${size}` : '0 0'

    const clipPathFigure = `polygon(
        ${topLeftStart}
        ${topRight}
        ${botRight}
        ${botLeft}
        ${topLeftEnd}
    )`

    return (
        <div className={containerCName}>
            <div
                className={s.figure}
                style={{
                    clipPath: clipPathFigure,
                }}
            >
                <div
                    className={s.content}
                    style={{
                        clipPath: clipPathFigure,
                        padding:
                            withPadding && borders ? `calc(${size} / 3) calc(${size} / 2)` : '0',
                    }}
                >
                    {children}
                </div>
            </div>
            {/* borders render */}
            {borders
                ? Object.entries(corners).map(([key, value]) => {
                      if (!value) return
                      const corner = key as Corner

                      const borderSize = `calc(${size} * 1.414)`
                      const borderOffset = `calc(1.5px + ${size} * 1.414 / -2)`

                      let borderStyle = {} as CSSProperties

                      switch (corner) {
                          case 'topLeft':
                              borderStyle = {
                                  top: borderOffset,
                                  left: borderOffset,
                                  transform: 'rotate(135deg)',
                              }
                              break
                          case 'topRight':
                              borderStyle = {
                                  top: borderOffset,
                                  right: borderOffset,
                                  transform: 'rotate(-135deg)',
                              }
                              break
                          case 'botRight':
                              borderStyle = {
                                  bottom: borderOffset,
                                  right: borderOffset,
                                  transform: 'rotate(-45deg)',
                              }
                              break
                          case 'botLeft':
                              borderStyle = {
                                  bottom: borderOffset,
                                  left: borderOffset,
                                  transform: ' rotate(45deg)',
                              }
                              break
                          default:
                              break
                      }

                      return (
                          <div
                              key={corner}
                              style={{ ...borderStyle, width: borderSize, height: borderSize }}
                              className={s.border}
                          ></div>
                      )
                  })
                : null}
            {/* borders render end*/}
        </div>
    )
}
