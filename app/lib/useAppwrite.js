import { useState, useEffect } from "react";
import { Alert } from "react-native";

// Custom hook to call appwrite functions
const useAppwrite = (fn, params = []) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const response = await fn(...params);
			setData(response);
		} catch (error) {
			Alert.alert("Error", error.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const refetch = () => fetchData();

	return { data, isLoading, refetch };
};

export default useAppwrite;
