import { Prisma } from '../../prisma/prisma/client'
import prisma from '../db'

function getAllComments() {
  return prisma.comment.findMany()
}

function getCommentById(id: number) {
  return prisma.comment.findUnique({
    where: { id }
  })
}

function createComment(data: Prisma.CommentCreateInput) {
  return prisma.comment.create({
    data
  })
}

function putComment(id: number, data: Prisma.CommentCreateInput) {
  return prisma.comment.update({
    where: { id },
    data
  })
}

function patchComment(id: number, data: Partial<Prisma.CommentCreateInput>) {
  return prisma.comment.update({
    where: { id },
    data
  })
}

function deleteComment(id: number) {
  return prisma.comment.delete({
    where: { id }
  })
}

export {
  getAllComments,
  getCommentById,
  createComment,
  putComment,
  patchComment,
  deleteComment
}
