'use server'

import { revalidatePath } from 'next/cache'

export async function revalidateProduct() {
  revalidatePath('/products/[id]')
}
