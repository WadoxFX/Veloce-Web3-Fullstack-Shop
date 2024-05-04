'use server'

import { revalidatePath } from 'next/cache'

export function revalidateProduct() {
  revalidatePath('/products/[id]')
}
