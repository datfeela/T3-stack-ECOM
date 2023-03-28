import { useEffect, useState } from 'react'
import { ProductSelector } from '~/modules/features/ProductSelector'

export interface OriginalGameInputProps {
    name: string
    value: string
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}

export const OriginalGameInput = ({ name, value, setFieldValue }: OriginalGameInputProps) => {
    const handleSelectedGameChange = (id: string) => {
        setFieldValue(name, id)
    }

    return <ProductSelector handleChange={handleSelectedGameChange} selectedId={value} />
}
