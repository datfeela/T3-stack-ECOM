import { type ChangeEvent, useEffect, useState } from 'react'
import { api } from '~/modules/shared/api/apiTRPC'
import type { SelectedProduct } from '../types/types'

export const useSelectedProducts = () => {
    // get initial
    const currentSelectedProducts = api.products.getMainPageProducts.useQuery(undefined, {
        keepPreviousData: true,
        refetchOnWindowFocus: false,
    }).data

    // ids w/ sort
    const [selectedValues, setSelectedValues] = useState(
        currentSelectedProducts?.map(({ sortNum, productId }) => ({ id: productId, sortNum })) ||
            ([] as { id: string; sortNum: number }[]),
    )

    useEffect(() => {
        if (!currentSelectedProducts) return

        setSelectedValues(
            currentSelectedProducts.map(({ productId, sortNum }) => ({ id: productId, sortNum })),
        )
    }, [currentSelectedProducts])

    // handle values add/delete
    const handleSelectedGamesChange = (value: string) => {
        // add
        if (!selectedValues.find((el) => el.id === value))
            setSelectedValues([
                ...selectedValues,
                { id: value, sortNum: selectedValues.length + 1 },
            ])
        // delete
        else setSelectedValues(selectedValues.filter((el) => el.id !== value))
    }

    // get products for selected ids
    const selectedProductsData = api.products.getManyProductsByIds.useQuery(
        selectedValues.map((value) => value.id),
        {
            keepPreviousData: true,
        },
    ).data

    // handle state update w/ sort
    const [selectedProducts, setSelectedProducts] = useState(
        selectedProductsData?.map((product) => ({
            ...product,
            sortNum: selectedValues.find((el) => el.id === product.id)?.sortNum || 0,
        })) as SelectedProduct[] | undefined,
    )

    useEffect(() => {
        setSelectedProducts(
            selectedProductsData?.map((product) => ({
                ...product,
                sortNum: selectedValues.find((el) => el.id === product.id)?.sortNum || 0,
            })),
        )
    }, [selectedValues, selectedProductsData])

    // change sort
    const changeProductSort = (e: ChangeEvent<HTMLInputElement>, id: string) => {
        const sortNumNew = Number(e.target.value)

        if (isNaN(sortNumNew)) return

        setSelectedValues(
            selectedValues.map((el) => {
                if (el.id === id) return { id, sortNum: sortNumNew }
                return el
            }),
        )
    }

    return {
        selectedProducts,
        handleSelectedGamesChange,
        changeProductSort,
    }
}
