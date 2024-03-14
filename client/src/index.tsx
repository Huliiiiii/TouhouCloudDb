/* @refresh reload */
import { render } from "solid-js/web";
import { Route, Router, redirect, useNavigate } from "@solidjs/router";
import { ErrorBoundary, JSXElement, createEffect, lazy } from "solid-js";

import { Header } from "compoments/Headder.tsx";
import { route_config } from "src/route_config";
import "./index.css";
import "./app.css";
import HomePage from "./homepage";

const Root = (props: any) => {
	return (
		<div class="flex flex-col justify-center">
			<Header />
			<ErrorBoundary fallback={(err) => err}>
				<div class="flex justify-center">{props.children}</div>
			</ErrorBoundary>
			<div>Footer</div>
		</div>
	);
};

const RouteGuard = () => {
	return <></>;
};
const loginPage = lazy(() => import("./routes/SignIn.tsx"));
const App = () => {
	return (
		<Router root={Root}>
			<Route path="/" component={HomePage} />
			<Route>{route_config}</Route>
			<Route path="*" component={() => <div>404 Not Found</div>} />
		</Router>
	);
};

render(App, document.getElementById("root")!);
