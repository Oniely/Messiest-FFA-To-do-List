import { Check } from "lucide-react";
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { FormEvent, useState } from "react";
import { usePathname } from "next/navigation";
import { updateTodo } from "@/lib/actions/todo.action";

interface Props {
  state: boolean;
  stateHandler: (state: boolean) => void;
  id: string
}

const EditTodoForm = ({ state, stateHandler, id }: Props) => {
  const [title, setTitle] = useState('');
  const pathname = usePathname();

  async function handleClick(e: FormEvent) {
    e.preventDefault();

    try {
      await updateTodo(id, title, pathname);
    } catch (error: any) {
      console.log(`Something went wrong when updating task: ${error.message}`);
    }

    stateHandler(!state);
  }

   return (
     <form className="flex items-center gap-1">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        <Button variant={'outline'} size={'icon'} className="w-8 h-8 p-1.5" onClick={handleClick}><Check /></Button>
     </form>
   )
}

export default EditTodoForm