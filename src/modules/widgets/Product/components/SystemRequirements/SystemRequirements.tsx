import type { ProductSystemRequirements } from '@prisma/client'
import s from './SystemRequirements.module.scss'
import { ClippedContainer } from '~/modules/shared/components/ClippedContainer/ClippedContainer'

interface SystemRequirementsProps {
    systemRequirementsMinimal: ProductSystemRequirements
    systemRequirementsRecommended: ProductSystemRequirements
}

export const SystemRequirements = ({
    systemRequirementsMinimal,
    systemRequirementsRecommended,
}: SystemRequirementsProps) => {
    return (
        <div className={s.wrapOuter}>
            <ClippedContainer clipSize='md'>
                <div className={s.wrap}>
                    <SystemRequirementsView type='minimal' {...systemRequirementsMinimal} />
                    <SystemRequirementsView type='recommended' {...systemRequirementsRecommended} />
                </div>
            </ClippedContainer>
        </div>
    )
}

interface SystemRequirementsViewProps extends ProductSystemRequirements {
    type: 'minimal' | 'recommended'
}

const SystemRequirementsView = ({
    type,
    cpu,
    gpu,
    memory,
    freeSpace,
    operatingSystem,
    soundHardware,
}: SystemRequirementsViewProps) => {
    const els = Object.entries({ cpu, gpu, memory, freeSpace, operatingSystem, soundHardware }).map(
        ([name, value]) => {
            let nameForView = name

            switch (name) {
                case 'freeSpace':
                    nameForView = 'free space'
                    break
                case 'operatingSystem':
                    nameForView = 'OS'
                    break
                case 'soundHardware':
                    nameForView = 'sound hardware'
                    break
                default:
                    break
            }

            return (
                <div key={name} className={s.filter}>
                    <div className={s.filter__title}>{nameForView}</div>
                    <div className={s.filter__value}>{value}</div>
                </div>
            )
        },
    )

    return (
        <div className={s.requirements}>
            <div
                className={`${s.requirements__title} ${
                    type === 'minimal' ? s.requirements__title_dark : ''
                }`}
            >
                {type}
            </div>
            <div className={s.requirements__elements}>{els}</div>
        </div>
    )
}
