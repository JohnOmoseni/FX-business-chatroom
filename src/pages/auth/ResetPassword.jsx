import { useState } from "react";
import Button from "@components/Button";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AiOutlineMail } from "react-icons/ai";
import sectionbg from "@assets/images/section-bg (5).jpg";
import { MdOutlineArrowBack } from "react-icons/md";
import { toast } from "react-toastify";

function ResetPassword() {
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	const onSubmit = async (e) => {
		e.preventDefault();
		if (!email) return;

		try {
			await sendPasswordResetEmail(auth, email);
			Swal.fire({
				icon: "info",
				titleText: "Password reset email link sent",
				text: `Check your gmail for password reset link`,
				showDenyButton: false,
				confirmButtonText: "Ok",
			}).then((result) => {
				if (result.isConfirmed) {
					navigate("/auth/sign-in");
				}
			});
		} catch (err) {
			console.error(err.message);
			if (err.message.includes("auth/too-many-requests")) {
				console.log("Too many requests");
			} else if (err.message.includes("auth/network-request-failed")) {
				console.log("Network Error");
			} else {
				console.log("Something went wrong");
			}
		}
	};

	return (
		<section
			className="w-full full-height relative md:grid grid-cols-2 overflow-hidden"
			id="reset-password"
		>
			<div className="w-full hidden md:block full-height self-stretch bg-green-300">
				<img src={sectionbg} alt="" className="h-full w-full" />
			</div>

			<div className="relative bg-inherit grid items-center md:pt-[6%] w-full h-full mx-auto px-[4%] shadow-md overflow-hidden">
				<div
					onClick={() => navigate("/auth/sign-in")}
					className="absolute top-4 left-4 icon rounded-md p-1 text-sm shadow-sm ring-1 ring-inset ring-gray-300 transition hover:scale-95`"
				>
					<MdOutlineArrowBack color="black" size={16} />
				</div>

				<div>
					<h2 className="text-center text-shadow capitalize text-2xl">
						Forgot your <br className="sm:hidden block" /> password?
					</h2>
					<form
						onSubmit={onSubmit}
						className="mt-10 mb-4 mx-auto w-[90%] flex-column gap-6"
					>
						<div className="w-full group">
							<label
								htmlFor="email"
								className={`text-sm relative mb-1 inline-block after:absolute after:content-['*'] after:-top-[2px] after:-right-2 after:text-red-800 after:text-sm`}
							>
								Email
							</label>
							<div className="px-3 relative rounded-md shadow-sm border border-solid form-group w-full flex-row gap-2 !justify-start align-middle">
								<span className="items-start leading-none icon pt-[1px]">
									<AiOutlineMail size={16} fill="#888" />
								</span>

								<input
									type="email"
									name="email"
									value={email}
									placeholder="example@gmail.com"
									onChange={(e) => setEmail(e.target.value)}
									className="w-full py-2.5 i-reset leading-none placeholder:text-sm md:placeholder:text-regular"
								/>
							</div>
							<p className="mt-1 ml-1 hidden group-[.is-error]:block text-pink-600 font-semibold text-tiny tracking-wide"></p>
						</div>

						<Button
							type="submit"
							title="Reset"
							loadingText="Loading"
							className="bg-gradient-100 font-kinn w-[80%] flex-row mx-auto mt-6 hover:bg-grad-100 hover:scale-[1.02]"
						/>
					</form>
					<p className="text-center text-neutral-500 font-semibold text-tiny tracking-wide -mt-1">
						Check your email to find password reset link
					</p>
				</div>
			</div>
		</section>
	);
}

export default ResetPassword;
