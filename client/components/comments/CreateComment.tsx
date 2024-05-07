import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilValue } from 'recoil'

import type { TCommentSchema } from '@/@types/zod'
import { commentSchema } from '@/@types/zod'
import { addComment } from '@/api/products'
import { revalidateProduct } from '@/app/(root)/products/[id]/action'
import { profile } from '@/recoil'

import { InputLabel } from '../ui'

import style from './comments.module.scss'

const CreateComment: React.FC<CreateCommentProps> = ({ productId }) => {
  const value = useRecoilValue<UserProfile | null>(profile)
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<TCommentSchema>({
    resolver: zodResolver(commentSchema),
  })

  const onSubmit = handleSubmit(async data => {
    if (value?._id) {
      const { comment, grade } = data

      await addComment({ params: { content: comment, productId, grade, creator: value._id } })
      await revalidateProduct()
      resetField('comment')
    }
  })

  return value?._id ? (
    <form onSubmit={onSubmit}>
      <div className={style.select_grade}>
        <select {...register('grade')}>
          <option value='5'>5</option>
          <option value='4'>4</option>
          <option value='3'>3</option>
          <option value='2'>2</option>
          <option value='1'>1</option>
        </select>
      </div>
      <InputLabel
        name='comment'
        label='Your comment'
        register={register}
        error={errors.comment?.message}
      />
      <button>Send</button>
    </form>
  ) : (
    <p className={style.worning}>
      You need to be registered to leave a review about a product.
      <Link href='/signup'> Click to register</Link>
    </p>
  )
}

export default CreateComment
