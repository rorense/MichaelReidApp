import React from "react";
import Header from "../components/header";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

const home = () => {
	return (
		<>
			<Header />
		</>
	);
};

export default home;
