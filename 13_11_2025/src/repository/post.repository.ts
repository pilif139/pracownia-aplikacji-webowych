import { Prisma } from '../../prisma/prisma/client'
import prisma from '../db'

function getAllPosts() {
  return prisma.post.findMany({
    include: { categories: true, comments: true }
  })
}

function getPostById(id: number) {
  return prisma.post.findUnique({
    where: { id }
  })
}

function createPost(data: Prisma.PostCreateInput) {
  return prisma.post.create({
    data
  })
}

function putPost(id: number, data: Prisma.PostUpdateInput) {
  return prisma.post.update({
    where: { id },
    data
  })
}

function patchPost(id: number, data: Partial<Prisma.PostUpdateInput>) {
  return prisma.post.update({
    where: { id },
    data
  })
}

function deletePost(id: number) {
  return prisma.post.delete({
    where: { id }
  })
}

export { getAllPosts, getPostById, createPost, putPost, patchPost, deletePost }
