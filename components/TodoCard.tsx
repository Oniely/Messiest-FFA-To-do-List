"use client";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

import { Todo } from "@prisma/client";

import { useRef, useState } from "react";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { changeStatus, deleteTodo } from "@/lib/actions/todo.action";
import { usePathname } from "next/navigation";
import EditTodo from "./EditTodo";

const TodoCard = ({ id, title, createdAt, isCompleted }: Todo) => {
  const [status, setStatus] = useState(isCompleted);
	const card = useRef(null);
	const deleteBtn = useRef(null);
	const pathname = usePathname();
  const { contextSafe } = useGSAP();

	useGSAP(() => {
		gsap.from(card.current, { y: -10, opacity: 0 });
		gsap.to(card.current, { y: 0, opacity: 1 });
	});

  const deleteOnClick = contextSafe(() => {
    gsap.to(card.current, { y: -10, opacity: 0 });
  })

  async function handleChangeStatus(id: string, newStatus: boolean) {
    try {
      await changeStatus(id, newStatus, pathname);
    } catch (error: any) {
      console.log(`Something went wrong on status change: ${error.message}`);
    }
  }

	return (
		<div
			className="border p-4 rounded-md flex items-center justify-between"
			ref={card}
		>
			<div className="flex items-center gap-3">
				<Checkbox
					id={id}
					className="w-6 h-6"
					checked={status}
					onCheckedChange={(e) => {
            setStatus(!status);
            handleChangeStatus(id, !isCompleted)}
          }
				/>
				<div>
					<h3 className="text-lg font-medium leading-snug">
						{title}
					</h3>
					<p className="text-sm text-gray-400 font-light">
						{createdAt.toDateString()}
					</p>
				</div>
			</div>
			<div className="flex items-center gap-2">
				<EditTodo id={id} />
				<Button
					variant="outline"
					size="icon"
					className="w-8 h-8 p-1.5 hover:bg-red-500 hover:text-white"
					onClick={() => {
            deleteTodo(id, pathname)
            deleteOnClick();
          }}
					ref={deleteBtn}
				>
					<Trash2 />
				</Button>
			</div>
		</div>
	);
};

export default TodoCard;
