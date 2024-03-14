import { useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";

export function RouteGuard() {
	const navigate = useNavigate();
	const token = localStorage.getItem("signIn");
	return createEffect(() => {
		if (!token) {
			navigate("/signin");
		}
	});
}
