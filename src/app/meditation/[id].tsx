import { Link, router, useLocalSearchParams } from 'expo-router';
import { Text, View, Pressable } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { meditations } from '@/data';

export default function MeditationDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { top, bottom } = useSafeAreaInsets();
  const meditation = meditations.find((m) => m.id === Number(id));

  if (!meditation) {
    return <Text>Meditation not found!</Text>;
  }

  return (
    <SafeAreaView className="bg-blue-400 flex-1 p-2 justify-between">
      {/* Page content */}
      <View className="flex-1">
        {/* Top part of the screen */}
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between p-10">
            <AntDesign name="infocirlceo" size={24} color="black" />

            <View className="bg-zinc-800 p-2 rounded-md">
              <Text className="text-zinc-100 font-semibold">
                Today's meditation
              </Text>
            </View>

            <View className="bg-zinc-800 p-2 rounded-md">
              <Text className="text-zinc-100 font-semibold">
                Top: {top}
              </Text>
            </View>

            <View className="bg-zinc-800 p-2 rounded-md">
              <Text className="text-zinc-100 font-semibold">
                Bottom: {bottom}
              </Text>
            </View>

            <AntDesign
              onPress={() => router.back()}
              name="close"
              size={26}
              color="black"
            />
          </View>

          <Text className="text-3xl mt-20 text-center text-zinc-800 font-semibold">
            {meditation?.title}
          </Text>
        </View>

      </View>
    </SafeAreaView>
  );
}
