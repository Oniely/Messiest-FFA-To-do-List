import { Todo } from "@prisma/client";
import TodoCard from "./TodoCard";
import { prisma } from "@/utils/prisma";
import { Divide } from "lucide-react";

const Todos = async () => {
	const todos = await prisma.todo.findMany();

  if (!todos) {
    return (
      <div className="mt-2 text-center text-2xl py-10 border rounded-lg">No Tasks Just Yet.</div>
    );
  }

	return (
		<div className="pt-2 flex flex-col gap-2">
			{todos.map(todo => (
        <TodoCard
        key={todo.id}
				id={todo.id}
				title={todo.title}
				createdAt={todo.createdAt}
				isCompleted={todo.isCompleted}
			/>
      ))}
		</div>
	);
};

export default Todos;
