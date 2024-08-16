import { createComponentDefinition } from '@rise-tools/react'

import { Icon } from '.'

type LucideIconType = typeof Icon;
export const LucideIcon: LucideIconType = createComponentDefinition<typeof Icon>('rise-tools/kit-lucide-icons/Icon')
