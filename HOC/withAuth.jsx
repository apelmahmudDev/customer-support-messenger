"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// This function checks if the user is authenticated and redirects if not.
const withAuth = (WrappedComponent) => {
	const WithAuth = (props) => {
		const router = useRouter();

		// Implement your authentication logic here
		const isAuthenticated = false;

		useEffect(() => {
			if (!isAuthenticated) {
				// If the user is not authenticated, redirect to the login page
				router.push("/login");
			}
		}, []);

		// If the user is authenticated, render the protected component
		return isAuthenticated ? <WrappedComponent {...props} /> : null;
	};

	WithAuth.displayName = `withAuth(${getDisplayName(WrappedComponent)})`;

	return WithAuth;
};

function getDisplayName(WrappedComponent) {
	return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default withAuth;
