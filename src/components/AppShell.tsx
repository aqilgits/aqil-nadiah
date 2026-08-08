"use client";

import { useState } from "react";
import DoorOpening from "./DoorOpening";
import MusicPlayer from "./MusicPlayer";

export default function AppShell() {
  const [doorOpened, setDoorOpened] = useState(false);

  return (
    <>
      <DoorOpening onOpen={() => setDoorOpened(true)} />
      <MusicPlayer autoPlay={doorOpened} />
    </>
  );
}
