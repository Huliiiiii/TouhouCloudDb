import { MetaProvider, Title } from "@solidjs/meta";
import { useNavigate } from "@SolidJS/router";
import { createEffect, createSignal, onMount, Show } from "solid-js";
export const buttonClass = "border w-20 hover:ring-1 rounded px-2 py-1 ";

export type data = {
	username: string;
	password: string;
};

const fetcher = async (data: data) => {
	const res = await fetch("http://localhost:3007/api/login", {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		}
	});
	return res.json();
};
export default function SignIn() {
	const navigate = useNavigate();
	const [correctPassword, setCorrectPassword] = createSignal<boolean>();

	const logIn = async (e: SubmitEvent) => {
		e.preventDefault();
		const target = e.target as HTMLFormElement;
		const data = Object.fromEntries(new FormData(target)) as data;
		const result = await fetcher(data);

		if (result === false) {
			setCorrectPassword(false);
		} else if (result === true) {
			localStorage.setItem("signIn", "true");
			setTimeout(() => {
				navigate("/", { replace: true });
				window.location.reload();
			}, 50);
		}
	};

	createEffect(() => {
		if (localStorage.getItem("signIn") === "true") {
			navigate("/", { replace: true });
		}
	});
	return (
		<>
			<MetaProvider>
				<Title>Sigh In</Title>
			</MetaProvider>
			<div class="flex flex-col">
				<h1>Login</h1>
				<form onSubmit={logIn}>
					<div class="flex flex-col">
						<label for="username">User Name</label>
						<input type="text" name="username" autocomplete="username" required />
					</div>
					<div class="flex flex-col">
						<label for="password">Password</label>
						<input
							type="password"
							name="password"
							autocomplete="current-password"
							onInput={() => setCorrectPassword()}
							required
						/>
						<Show when={correctPassword() === false}>
							<p class="text-red-600">Incorrect username or password</p>
						</Show>
					</div>
					<div class="flex justify-between">
						<button class={buttonClass} type="submit">
							Sigh In
						</button>
						<button
							class={buttonClass}
							type="button"
							onClick={() => navigate("/signup", { replace: true })}
						>
							Sigh Up
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
