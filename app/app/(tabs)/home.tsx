import Header from "../components/Header";
import useAppwrite from "../../lib/useAppwrite";
import { getAllArtworks } from "@/lib/appwrite";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Text } from "react-native";
import ArtworkCard from "../components/ArtworkCard";

const Home = () => {
	const { data: artworks, refetch } = useAppwrite(getAllArtworks);

	return (
		<>
			<Header />
			<SafeAreaView className="bg-background flex-1">
				{artworks ? (
					<FlatList
						data={artworks}
						keyExtractor={(item) => item.$id}
						renderItem={({ item }) => <ArtworkCard artwork={item} />}
						contentContainerStyle={{ paddingBottom: 20 }}
					/>
				) : (
					<Text>Loading...</Text>
				)}
			</SafeAreaView>
		</>
	);
};

export default Home;
