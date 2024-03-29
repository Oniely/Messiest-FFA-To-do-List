"use server";

import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";

export async function createTodo(title: string, path: string) {
  try {
    const todo = await prisma.todo.create({
      data: {
        title
      }
    })

    revalidatePath(path);
    return todo;
  } catch (error: any) {
    throw new Error(`Something went wrong when adding a task: ${error.message}`)
  }
}

export async function updateTodo(id: string, newTitle: string, path: string) {
  try {
    await prisma.todo.update({ where: { id }, data: { title: newTitle } });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Something went wrong when adding a task: ${error.message}`)
  }
}

export async function deleteTodo(id: string, path: string)  {
  try {
    await prisma.todo.delete({ where: { id } });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Something went wrong when adding a task: ${error.message}`)
  }
}

export async function changeStatus(id: string, status: boolean,  path: string) {
  try {
    await prisma.todo.update({ where: { id }, data: { isCompleted: status } })

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Something went wrong when adding a task: ${error.message}`)
  }
}