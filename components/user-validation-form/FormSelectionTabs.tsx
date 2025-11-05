'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import LoginForm from './LoginForm';
import UserValidationForm from './UserValidationForm';

export default function FormSelectionTabs() {
	return (
		<Tabs defaultValue="login" className="w-full">
			<TabsList className="grid w-full grid-cols-2 mb-6">
				<TabsTrigger value="login">Log In</TabsTrigger>
				<TabsTrigger value="validation">Sign Up</TabsTrigger>
			</TabsList>
			<TabsContent value="login">
				<LoginForm />
			</TabsContent>
			<TabsContent value="validation">
				<UserValidationForm />
			</TabsContent>
		</Tabs>
	);
}
