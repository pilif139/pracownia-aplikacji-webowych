import { Prisma } from '../../prisma/prisma/client'
import prisma from '../db'

function getAllUsers() {
  return prisma.user.findMany({
    include: { comments: false }
  })
}

function getUserById(id: number) {
  return prisma.user.findUnique({
    where: { id },
    include: { comments: true }
  })
}

function createUser(data: Prisma.UserCreateInput) {
  return prisma.user.create({
    data
  })
}

function putUser(id: number, data: Prisma.UserCreateInput) {
  return prisma.user.update({
    where: { id },
    data
  })
}

function patchUser(id: number, data: Partial<Prisma.UserCreateInput>) {
  return prisma.user.update({
    where: { id },
    data
  })
}

function deleteUser(id: number) {
  return prisma.user.delete({
    where: { id }
  })
}

export { getAllUsers, getUserById, createUser, putUser, patchUser, deleteUser }
