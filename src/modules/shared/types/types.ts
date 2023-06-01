import type { BuiltInProviderType } from 'next-auth/providers'
import type { ClientSafeProvider, LiteralUnion } from 'next-auth/react'

export type DefaultColor = 'yellow' | 'red' | 'blue' | 'purple'
export type ImageOrientation = '16/9' | '16/10' | '4/5' | '21/9' | '3/4' | 'unset'
export type AuthProviders = Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
> | null
