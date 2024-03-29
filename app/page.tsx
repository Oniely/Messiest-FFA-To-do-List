import AddTodoForm from "@/components/forms/AddTodoForm"
import Todos from "@/components/Todos"

const Home = () => {
	return (
		<div>
			<h1 className="text-4xl font-semibold leading-snug">Free For All Todo</h1>
			<p>Messiest To do app - Go CRAZY!</p>
			<AddTodoForm />
			<Todos />
		</div>
	)
}

export default Home