import AddTodoForm from "@/components/forms/AddTodoForm"
import Todos from "@/components/Todos"

const Home = () => {
	return (
		<div>
			<h1 className="text-4xl font-semibold leading-snug">Task</h1>
			<AddTodoForm />
			<Todos />
		</div>
	)
}

export default Home