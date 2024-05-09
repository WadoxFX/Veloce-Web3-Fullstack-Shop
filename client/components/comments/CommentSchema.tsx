import React from 'react'
import { useRecoilValue } from 'recoil'

import { deleteComment } from '@/api/products'
import { revalidateProduct } from '@/app/(root)/products/[id]/action'
import { profile } from '@/recoil'

import { convertDate } from '../convertDate'
import DrawStars from '../drawStars/DrawStars'
import { TrashIcon } from '../icons'

import style from './comments.module.scss'

const CommentSchema: React.FC<CommentItem> = ({ comment, productId }) => {
  const value = useRecoilValue<UserProfile | null>(profile)

  const handlerDeleteComment = async (userId: string) => {
    await deleteComment({ params: { commentId: comment._id, productId, userId } })
    await revalidateProduct()
  }

  return (
    <li className={style.comment}>
      <div className={style.comment_title}>
        <div>User: #{comment.creator.slice(0, 10)}</div>
        {value?._id === comment.creator && (
          <button aria-label='Delete comment' onClick={() => handlerDeleteComment(value._id)}>
            <TrashIcon size={18} />
          </button>
        )}
      </div>
      <div className={style.statistics}>
        <DrawStars quantity={5} grade={comment.grade} size={12} />
        <div>{convertDate(comment.createdAt)}</div>
      </div>
      <p className={style.comment_content}>{comment.content}</p>
    </li>
  )
}

export default CommentSchema
