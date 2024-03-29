import { Pencil } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import EditTodoForm from "./forms/EditTodoForm";

const EditTodo = ({ id }: { id: string }) => {
  const [editMode, setEditMode] = useState(false);

   return (
    <>
      {editMode ? (
        <EditTodoForm state={editMode} stateHandler={setEditMode} id={id}  />
      ) : (
        <Button variant="outline" size="icon" className="w-8 h-8 p-1.5" onClick={() => setEditMode(!editMode)}>
          <Pencil />
        </Button>
      )}
    </>
   )
}

export default EditTodo