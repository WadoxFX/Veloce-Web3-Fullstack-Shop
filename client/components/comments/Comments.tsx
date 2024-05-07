'use client'

import React from 'react'

import DrawStars from '@/components/drawStars/DrawStars'
import { useToggle } from '@/hooks/useToggle'

import CommentSchema from './CommentSchema'
import CreateComment from './CreateComment'
import style from './comments.module.scss'

interface CommentsProps {
  comments?: ProductComments
  productId: string
}

const Comments: React.FC<CommentsProps> = ({ comments, productId }) => {
  const [isOn, toggle] = useToggle()
  let stars: number = 0

  if (comments?.length) {
    for (let i = 0; comments.length > i; i += 1) stars += comments[i].grade
    stars = Number((stars / comments.length).toFixed(2))
  }

  return (
    <div className={style.comments_accordeon}>
      <button onClick={toggle}>
        <div>Reviews{` (${comments?.length})` || 0}</div>

        <div className={style.stars}>
          <DrawStars quantity={5} grade={stars} size={16} />
          <div>{stars}/5</div>
        </div>
      </button>

      {isOn && (
        <>
          <CreateComment productId={productId} />
          <ul className={style.comments}>
            {comments?.map((comment: ProductComment, id: number) => (
              <CommentSchema productId={productId} comment={comment} key={id} />
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default Comments
