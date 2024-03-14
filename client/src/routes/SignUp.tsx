import { useNavigate } from "@SolidJS/router";
import { MetaProvider, Title } from "@solidjs/meta";
import { createEffect, createSignal } from "solid-js";
import { Dynamic, Show } from "solid-js/web";

import { buttonClass } from "./SignIn";
import { debounce, set } from "lodash";

type data = {
	username: string;
	password?: string;
	repeat_password?: string;
};

const register = async (data: data) => {
	const res = await fetch("http://localhost:3007/api/register", {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		}
	});
	return res.json();
};
const checkUsername = async (data: data) => {
	const res = await fetch("http://localhost:3007/api/checkUsername", {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		}
	});
	return res.json();
};

type message = {
	message?: string;
	success: "true" | "false" | "loading";
};
export default function SignUp() {
	const navigate = useNavigate();
	const [message, setMessage] = createSignal<message>();
	const [password, setPassword] = createSignal<string>();
	const [repeatPassword, setRepeatPassword] = createSignal<string>();
	const [equalPassword, setEqualPassword] = createSignal<boolean>();
	const signUp = async (e: SubmitEvent) => {
		e.preventDefault();
		if (equalPassword() === false) return;
		const target = e.target as HTMLFormElement;
		const data = Object.fromEntries(new FormData(target)) as data;
		const result = await register(data);
		if (result.success === true) {
			localStorage.setItem("signIn", "true");
			navigate("/", { replace: true });
			return;
		}
		setMessage(result);
	};
	const enterUsername = (e: InputEvent) => {
		const target = e.target as HTMLInputElement;
		if (target.value === "") {
			setMessage();
			return;
		}
		let result;
		setMessage({ success: "loading" });
		const func = async () => {
			if (target.value === "") {
				setMessage();
				return;
			}
			result = await checkUsername({ username: target.value });
			setMessage(result);
		};
		debounce(func, 1500)();
	};

	createEffect(() => {
		if (localStorage.getItem("signIn") === "true") {
			navigate("/", { replace: true });
		}
		if (
			password() !== repeatPassword() &&
			!(repeatPassword() === "" || repeatPassword() === undefined || repeatPassword() === null)
		) {
			setEqualPassword(false);
		} else if (password() === repeatPassword()) {
			setEqualPassword(true);
		}
	});

	const usernameMessageOptions: { [key: string]: () => any } = {
		loading: () => <div>Checking...</div>,
		true: () => <div class="text-green-600">Available Username</div>,
		false: () => <div class="text-red-600">Username already in use</div>,
		undefined: () => <div></div>
	};

	return (
		<>
			<MetaProvider>
				<Title>Sign Up</Title>
			</MetaProvider>
			<div class="flex flex-col">
				<h1>Sign Up</h1>
				<form onSubmit={signUp}>
					<div class="flex flex-col">
						<label for="username">User Name</label>
						<input
							type="text"
							name="username"
							autocomplete="off"
							onInput={enterUsername}
							required
						/>
						<Dynamic
							component={usernameMessageOptions[message()?.success || "undefined"]}
						></Dynamic>
					</div>
					<div class="flex flex-col">
						<label for="username">Password</label>
						<input
							type="password"
							name="password"
							autocomplete="new-password"
							onInput={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<div class="flex flex-col">
						<label for="username">Repeat Password</label>
						<input
							type="password"
							autocomplete="new-password"
							name="repeat_password"
							onInput={(e) => setRepeatPassword(e.target.value)}
							required
						/>
						<Show when={equalPassword() === false}>
							<div class="text-red-600">Password does not match</div>
						</Show>
					</div>
					<div class="flex justify-between">
						<button class={buttonClass}>Sign Up</button>
						<button class={buttonClass} onClick={() => navigate("/signin", { replace: true })}>
							Sigh In
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
