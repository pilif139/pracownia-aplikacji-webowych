import { Prisma } from '../../prisma/prisma/client'
import prisma from '../db'

function getAllCategories() {
  return prisma.category.findMany({
    include: { posts: false }
  })
}

function getCategoryById(id: number) {
  return prisma.category.findUnique({
    where: { id },
    include: { posts: false }
  })
}

function createCategory(data: Prisma.CategoryCreateInput) {
  return prisma.category.create({
    data
  })
}

function putCategory(id: number, data: Prisma.CategoryCreateInput) {
  return prisma.category.update({
    where: { id },
    data
  })
}

function patchCategory(id: number, data: Partial<Prisma.CategoryCreateInput>) {
  return prisma.category.update({
    where: { id },
    data
  })
}

function deleteCategory(id: number) {
  return prisma.category.delete({
    where: { id }
  })
}

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  putCategory,
  patchCategory,
  deleteCategory
}
