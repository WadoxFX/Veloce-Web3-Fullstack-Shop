export const calcGrade = (comments: ProductComments): number =>
  +(comments.reduce((acc, comment) => acc + comment.grade, 0) / comments.length).toFixed(2)
