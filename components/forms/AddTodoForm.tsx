"use client";

import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { usePathname } from "next/navigation";
import { createTodo } from "@/lib/actions/todo.action";
import { useToast } from "../ui/use-toast";

const AddTodoForm = () => {
	const [todo, setTodo] = useState("");
	const pathname = usePathname();
	const { toast } = useToast();

	async function handleFormSubmit(e: FormEvent) {
		e.preventDefault();

		if (!todo) {
			toast({
				title: "Todo Task is empty!",
				description: "You can't add an empty task."
			})
			return;
		}

		try {
			const newTodo = await createTodo(todo, pathname);

			if (newTodo) {
				toast({
					title: "Successful!",
					description: "Task has been added!"
				});
			}
		} catch (error) {
			console.log(`Something went wrong: ${error}`);
		}
		setTodo("");
	}

	return (
		<form onSubmit={handleFormSubmit}>
			<div className="flex items-center gap-2 flex-1">
				<Input
					value={todo}
					onChange={(e) => setTodo(e.target.value)}
					className="text-lg"
				/>
				<Button size="lg">Add</Button>
			</div>
		</form>
	);
};

export default AddTodoForm;
