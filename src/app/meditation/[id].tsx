import { Link, router, useLocalSearchParams } from 'expo-router';
import { Text, View, Pressable } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import { meditations } from '@/data';
import audio from '@assets/meditations/audio1.mp3';

export default function MeditationDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const meditation = meditations.find((m) => m.id === Number(id));

  const player = useAudioPlayer(audio);

  const playerStatus = useAudioPlayerStatus(player);

  const formatSeconds = (milliseconds: number) => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!meditation) {
    return <Text>Meditation not found!</Text>;
  }

  return (
    <SafeAreaView className="bg-sky-600 flex-1 p-2 justify-between">
      {/* Page content */}
      <View className="flex-1">
        {/* Top part of the screen */}
        <View className="bg-sky-300 flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between p-10">
            <AntDesign name="infocirlceo" size={24} color="black" />

            <View className="bg-zinc-800 p-2 rounded-md">
              <Text className="text-zinc-100 font-semibold">
                Today's Meditation
              </Text>
            </View>

            <AntDesign
              onPress={() => router.back()}
              name="close"
              size={26}
              color="black"
            />
          </View>

          <Text className="text-3xl text-center text-zinc-800 font-bold">
            {meditation?.title}
          </Text>
        </View>

        {/* Middle part of the screen */}
        <View className="bg-sky-500 flex-1 justify-center items-center">
          {/* Play/Pause Button */}
          <Pressable
            onPress={() => (player.playing ? player.pause() : player.play())}
            className="bg-zinc-800 self-center w-20 aspect-square rounded-full items-center justify-center"
          >
            <FontAwesome6
              name={playerStatus.playing ? 'pause' : 'play'}
              size={24}
              color="snow"
            />
          </Pressable>
        </View>

        {/* Bottom part of the screen */}
        <View className="flex-1">
          {/* Footer: Player */}
          <View className="p-5 mt-auto gap-5">
            <View className="flex-row justify-between">
              <MaterialIcons name="airplay" size={24} color="black" />
              <MaterialCommunityIcons name="cog-outline" size={24} color="black" />
            </View>

            {/* Playback Indicator */}
            <View>
              {/* <View className="bg-blue-400 h-2" /> */}
              <Slider
                style={{width: "100%", height: 40}}
                value={playerStatus.currentTime / playerStatus.duration}
                onSlidingComplete={(value) => player.seekTo(value * playerStatus.duration)}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#7dd4fc"
                maximumTrackTintColor="#000000"
                thumbTintColor="#7dd4fc"
              />
            </View>

            {/* Timer */}
            <View className="flex-row justify-between">
              <Text className="text-sky-100">
                {formatSeconds(playerStatus.currentTime)}
              </Text>
              <Text className="text-sky-100">
                {formatSeconds(playerStatus.duration)}
              </Text>
            </View>

          </View>
          
        </View>
      </View>
      
    </SafeAreaView>
  );
}
