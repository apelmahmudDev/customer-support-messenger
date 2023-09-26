"use client";
import { useEffect } from "react";
import useAuth from "@/hook/useAuth";
import { useRouter } from "next/navigation";
import useAuthCheck from "@/hook/useAuthCheck";

const withAuth = (WrappedComponent) => {
	const WithAuth = (props) => {
		const isAuthCheck = useAuthCheck();
		const isAuth = useAuth();
		const router = useRouter();

		useEffect(() => {
			if (isAuthCheck) {
				if (!isAuth) {
					router.push("/login");
				}
			}
		}, [isAuth, router, isAuthCheck]);

		return isAuth ? <WrappedComponent {...props} /> : null;
	};

	WithAuth.displayName = `withAuth(${getDisplayName(WrappedComponent)})`;

	return WithAuth;
};

function getDisplayName(WrappedComponent) {
	return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export default withAuth;
