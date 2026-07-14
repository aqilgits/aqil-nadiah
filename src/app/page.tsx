import Cover from "@/components/Cover";
import Invitation from "@/components/Invitation";
import EventDetails from "@/components/EventDetails";
import Doa from "@/components/Doa";
import Countdown from "@/components/Countdown";
import Gallery from "@/components/Gallery";
import RSVP from "@/components/RSVP";
import Wishes from "@/components/Wishes";
import Gift from "@/components/Gift";
import Location from "@/components/Location";

export default function Home() {
  return (
    <>
      <Cover />
      <Invitation />
      <EventDetails />
      <Doa />
      <Countdown />
      <Gallery />
      <RSVP />
      <Wishes />
      {/* <Gift /> */}
      <Location />
    </>
  );
}
