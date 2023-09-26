"use client";
import { useEffect, useState } from "react";
import Input from "./Input";
import AuthButton from "./AuthButton";
import GoogleIcon from "./GoogleIcon";
import OpenEyeIcon from "./OpenEyeIcon";
import CloseEyeIcon from "./CloseEyeIcon";
import PasswordTypeButton from "./PasswordTypeButton";
import LoginProviderButton from "./LoginProviderButton";
import { validateForm } from "@/lib/validateForm";
import { useLoginMutation } from "@/store/api/authApi";
import WarningIcon from "./WarningIcon";
import { signIn, useSession } from "next-auth/react";
import { setCookie } from "cookies-next";
import { userLoggedIn } from "@/store/slices/authSlice";
import { useDispatch } from "react-redux";
import FacebookIcon from "./FacebookIcon";
const { redirect } = require("next/navigation");

const LoginModal = () => {
	const dispatch = useDispatch();
	const { data: session, status } = useSession();
	const [loading, setLoading] = useState(false);
	const [login, { isLoading, isError, error }] = useLoginMutation();

	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState({});
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const validationErrors = validateForm(formData);
		setErrors(validationErrors);

		// Handle form submission logic here...
		const keys = Object.keys(validationErrors);
		if (keys.length === 0) {
			// login(formData);
			try {
				setLoading(true);
				const resp = await signIn("credentials", {
					email: formData.email,
					password: formData.password,
					redirect: false,
				});
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		if (session?.access_token && session?.user) {
			setCookie("token", session?.access_token);
			setCookie("user", session?.user);

			dispatch(
				userLoggedIn({
					token: session?.access_token,
					user: session?.user,
				})
			);
		}
	}, [dispatch, session?.access_token, session?.user]);

	useEffect(() => {
		if (status === "authenticated") {
			redirect("/");
		}
	});

	return (
		<div className="auth-shadow max-w-md md:max-w-lg w-full bg-white p-8 sm:p-10 rounded-2xl lg:rounded-3xl">
			<h3 className="text-center text-xl md:text-2xl font-bold dark-primary mb-6 break-all">
				Sign in
			</h3>
			<div className="space-y-4 md:space-y-6">
				<LoginProviderButton
					onClick={() => signIn("google")}
					title="Continue with Google"
					icon={<GoogleIcon />}
				/>
				<LoginProviderButton
					onClick={() => signIn("facebook")}
					title="Continue with Facebook"
					icon={<FacebookIcon />}
				/>
			</div>
			<p className="text-center my-5 text-sm md:text-base text-dark-primary break-all">
				Or sign in with your email
			</p>
			<form onSubmit={handleSubmit}>
				<div className="space-y-4 md:space-y-6">
					<div className="flex flex-col space-y-1">
						<label
							htmlFor="email"
							className="text-sm md:text-base font-medium text-dark-primary break-all"
						>
							Email Address
						</label>
						<Input
							value={formData.email}
							onChange={handleChange}
							type="text"
							name="email"
						/>
						{errors.email && (
							<span className="text-xs text-red-600 break-all">
								{errors.email}
							</span>
						)}
					</div>
					<div className="flex flex-col space-y-1">
						<label
							htmlFor="password"
							className="text-sm md:text-base font-medium text-dark-primary break-all"
						>
							Password
						</label>
						<div className="relative">
							<Input
								value={formData.password}
								onChange={handleChange}
								type={showPassword ? "text" : "password"}
								name="password"
							/>
							<PasswordTypeButton
								onClick={() => setShowPassword((prev) => !prev)}
								icon={
									showPassword ? (
										<OpenEyeIcon />
									) : (
										<CloseEyeIcon />
									)
								}
							/>
						</div>
						{errors.password && (
							<span className="text-xs text-red-600 break-all">
								{errors.password}
							</span>
						)}
					</div>
					{!isLoading && isError && (
						<div className="flex items-center gap-2 text-xs text-red-600 break-all">
							<WarningIcon />
							<span>
								{error?.data?.response?.status?.message}
							</span>
						</div>
					)}
					<div className="flex flex-col space-y-1">
						<AuthButton type="submit" isLoading={loading} />
					</div>
				</div>
			</form>
		</div>
	);
};

export default LoginModal;
