/* @refresh reload */
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";
import { ErrorBoundary } from "solid-js";

import { Header } from "compoments/Headder.tsx";
import { route_config } from "src/route_config";
import "./index.css";
import "./app.css";

function App() {
	return (
		<>
			<div class="flex justify-center">
				<ErrorBoundary fallback={(err) => err}>
					<Router>
						<Route>{route_config}</Route>
						<Route path="*" component={() => <div>404 Not Found</div>} />
					</Router>
				</ErrorBoundary>
			</div>
		</>
	);
}

const Root = () => {
	return (
		<>
			<div class="">
				<Header />
				<App />
			</div>
		</>
	);
};

render(Root, document.getElementById("root")!);
