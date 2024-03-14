import { useNavigate } from "@solidjs/router";
import { Show, createEffect, createSignal, onMount } from "solid-js";

export function Header() {
	const headerContainer = "flex justify-center w-full shadow h-10";
	const headerMain = "";
	const headerItemContainer = "flex";
	const headerItem = "px-4 ";
	const [signIn, setSignIn] = createSignal(false);
	createEffect(() => {
		if (localStorage.getItem("signIn") !== "true") {
			setSignIn(false);
		} else {
			setSignIn(true);
		}
	});
	return (
		<>
			<div class="cell"></div>
			<header class={headerContainer}>
				<nav class={headerMain}>
					<ul class={headerItemContainer}>
						<li>
							<a href="/" class={headerItem}>
								LOGO
							</a>
						</li>
						<li>
							<a href="/" class={headerItem}>
								Return
							</a>
						</li>
						<li>
							<a href="/dev/list/song" class={headerItem}>
								曲目列表
							</a>
						</li>
						<li>
							<a href="/" class={headerItem}>
								placeholder
							</a>
						</li>
						<li>
							<input type="text" placeholder="Search" />
						</li>
						<li>
							<a href="/" class={headerItem}>
								placeholder
							</a>
						</li>
						<li>
							<a
								href="/"
								class={headerItem}
								onMouseDown={() => {
									console.log(document.cookie);
								}}
							>
								cookie
							</a>
						</li>
						<Show when={signIn() === true}>
							<li>
								<a
									href="/"
									class={headerItem}
									onClick={() => {
										localStorage.clear();
										setSignIn(false);
										window.location.reload();
									}}
								>
									Sign Out
								</a>
							</li>
						</Show>
						<Show when={!signIn()}>
							<li>
								<a href="/signin" class={headerItem}>
									Sign In/Sign Up
								</a>
							</li>
						</Show>
					</ul>
				</nav>
			</header>
		</>
	);
}
