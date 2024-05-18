'use client'

import React from 'react'

import DrawStars from '@/components/drawStars/DrawStars'
import { useToggle } from '@/hooks/useToggle'

import CommentSchema from './CommentSchema'
import CreateComment from './CreateComment'
import style from './comments.module.scss'
import { calcGrade } from './calcGrade'

interface CommentsProps {
  comments?: ProductComments
  productId: string
}

const Comments: React.FC<CommentsProps> = ({ comments, productId }) => {
  const [isOn, toggle] = useToggle()
  const stars = comments?.length ? calcGrade(comments) : 0

  return (
    <div className={style.comments_accordeon}>
      <button onClick={toggle}>
        <div>Reviews {`(${comments?.length})`}</div>

        <div className={style.stars}>
          <DrawStars quantity={5} grade={stars} size={16} />
          <div>{stars}/5</div>
        </div>
      </button>

      {isOn && (
        <>
          <CreateComment productId={productId} />
          <ul className={style.comments}>
            {comments?.map((comment: ProductComment, index) => (
              <CommentSchema productId={productId} comment={comment} key={index} />
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default Comments
