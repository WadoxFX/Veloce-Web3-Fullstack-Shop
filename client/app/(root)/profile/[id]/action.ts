'use server'

import { revalidatePath } from 'next/cache'

export async function revalidateProfile() {
  revalidatePath('/profile/[id]')
}
