'use client';

import { useState } from 'react';
import { getWeatherInfo } from './action';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Form() {
	const [result, setResult] = useState<string | null>(null);

	async function handleSubmit(formData: FormData) {
		const res = await getWeatherInfo(formData);
		setResult(res);
	}

	return (
		<>
			<div className="flex flex-col items-center justify-center gap-4 w-full max-w-md">
				<form action={handleSubmit}>
					<Input name="city" placeholder="Enter city" required />
					<Button type="submit">Get Weather</Button>
				</form>
				{result && <pre>{result}</pre>}
			</div>
		</>
	);
}
