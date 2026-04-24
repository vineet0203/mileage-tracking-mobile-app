import React from "react";
import { View } from "react-native";
import { TripListItem, TripListItemProps } from "./TripListItem";

interface TripListProps {
  trips: TripListItemProps[];
}

export const TripList: React.FC<TripListProps> = ({ trips }) => {
  return (
    <View className="gap-y-3">
      {trips.map((trip) => (
        <TripListItem key={trip.id} {...trip} />
      ))}
    </View>
  );
};
