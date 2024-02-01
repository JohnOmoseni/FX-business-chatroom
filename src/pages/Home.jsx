import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LeftNav from "@components/SideNav/LeftNav";
import SideLayout from "@components/SideNav/SideLayout";
import Main from "@components/Main/Main";
import RightNav from "@components/SideNav/RightNav/RightNav";
import { paneAnimate } from "@utils";
import { auth, db } from "../config/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentuser } from "@redux/features/authUserSlice";
import { setScreenSize } from "@redux/features/appStateSlice";
import { onAuthStateChanged } from "firebase/auth";
import { setCurrencies } from "@redux/features/fxSlice";
import useFetchCurrencies from "@hooks/useFetchCurrencies";

const VisiblePaneLayout = ({
	children,
	screenSize,
	className,
	isRightLayout,
}) => {
	const val = isRightLayout ? 768 : 640;
	return (
		<AnimatePresence>
			<motion.div
				variants={screenSize < val && paneAnimate}
				initial="hidden"
				animate="animate"
				exit="exit"
				className={className}
				style={{ zIndex: "1000" }}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
};

function Home() {
	const { showPane, showRightPane, screenSize } = useSelector((state) => {
		console.log(state);
		return state.appState;
	});
	const dispatch = useDispatch();
	const { currencies: currArray } = useSelector((state) => state.fxState);
	const [currencies] = useFetchCurrencies();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				// user is signed in
				const docSnap = await getDoc(doc(db, "users", user?.uid));
				dispatch(setCurrentuser(docSnap.data()));
			} else {
				console.log("User is logged out");
			}
		});
		return () => {
			unsubscribe();
		};
	}, []);

	useEffect(() => {
		const getScreenSize = () => {
			dispatch(setScreenSize(window?.innerWidth));
		};

		window.addEventListener("resize", getScreenSize);
		getScreenSize();

		return () => {
			window.removeEventListener("resize", getScreenSize);
		};
	}, []);

	useEffect(() => {
		if (currencies && currArray.length === 0) {
			const currenciesObj = Object.entries(currencies)?.map((curr) => ({
				name: curr[1],
				symbol: curr[0],
			}));

			dispatch(setCurrencies(currenciesObj));
		}
	}, [currencies]);

	return (
		<div
			className={`relative h-screen w-full sm:grid sm:grid-cols-sm md:grid-cols-main overflow-hidden`}
		>
			<SideLayout>
				<LeftNav />
			</SideLayout>

			{screenSize < 640 ? (
				<VisiblePaneLayout
					screenSize={screenSize}
					className={`${
						showPane
							? "w-full bg-[#fff] full-height overflow-hidden fixed top-0 right-0"
							: "w-0 overflow-hidden hidden"
					}`}
				>
					<Main />
				</VisiblePaneLayout>
			) : (
				screenSize > 640 && <Main />
			)}

			{screenSize < 768 ? (
				<VisiblePaneLayout
					screenSize={screenSize}
					isRightLayout
					className={`${
						showRightPane
							? "w-full full-height overflow-hidden fixed top-0 right-0 flex-column gap-2 bg-white"
							: "w-0 overflow-hidden hidden"
					}`}
				>
					<SideLayout right>
						<RightNav />
					</SideLayout>
				</VisiblePaneLayout>
			) : (
				screenSize >= 768 && (
					<div
						className={`w-full full-height relative flex-column gap-2 overflow-hidden`}
					>
						<SideLayout right>
							<RightNav />
						</SideLayout>
					</div>
				)
			)}
		</div>
	);
}
export default Home;
