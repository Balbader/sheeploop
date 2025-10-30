import { Form } from './form';

export default async function Page() {
	return (
		<>
			<div className="flex flex-col items-center justify-center h-screen">
				<h1>Community Fit Storyline Agent</h1>
				<Form />
			</div>
		</>
	);
}
