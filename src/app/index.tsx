import { FlatList, View, StyleSheet, Text} from 'react-native';
import { meditations } from '@/data';
import { MeditationListItem } from '@/components/MeditationListItem';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  return (
    // style={{
      // backgroundColor: 'linear-gradient(to right, #3b82f6, #9333ea)', // Custom gradient fallback
      // backgroundColor: "bg-gradient-to-r from-sky-200 via-sky-400 to-sky-600 h-full"
    //   backgroundColor: "linear-gradient(#3b82f6)"
    // }}
    <LinearGradient
      colors={["#a5d8ff", "#38bdf8", "#0284c7"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <FlatList
        data={meditations}
        // className="bg-sky-500"
        // className="bg-gradient-to-r from-sky-200 via-sky-400 to-sky-600 h-full"
        contentContainerClassName="gap-8 p-3"
        renderItem={({ item }) => <MeditationListItem meditation={item} />}
      />
    </LinearGradient>
  );
}