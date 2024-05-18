import { Types } from 'mongoose'

export class AddCommentDto {
  productId: Types.ObjectId
  creator: Types.ObjectId
  grade: number
  content: string
}

export class DeleteCommentDto {
  commentId: string
  productId: string
  userId: string
}
