import React from 'react'
import { Lightbulb, Target, Trophy, Rocket, Star } from "lucide-react";

const iconList = [
  Lightbulb,
  Target,
  Rocket,
  Star,
];
export const IconComponent = ({ text }: { text:string}) => {
 function getDeterministicIcon(text: string) {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % iconList.length;
  const IconComponent = iconList[index];
  return <IconComponent className="w-5 h-5" />;
}
  return (
    getDeterministicIcon(text)
  )
}
