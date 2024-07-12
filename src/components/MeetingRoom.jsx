"use client";
import { cn } from "@/lib/utils";
import {
  CallControls,
  CallParticipantsList,
  PaginatedGridLayout,
  SpeakerLayout,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGrip,
  faPeopleGroup,
  faUsersViewfinder,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { Button } from "./ui/button";
import Modal from "./Modal";

const MeetingRoom = () => {
  const [layout, setLayout] = useState("grid");
  const [showParticipants, setShowParticipants] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const router = useRouter();
  const call = useCall();
  const searchParams = useSearchParams();
  const { useCallCallingState } = useCallStateHooks();

  const CallingState = useCallCallingState();

  const roomOwner =
    localParticipant &&
    call.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  const CALLING_STATE_TO_LABEL = {
    [CallingState.JOINING]: "Joining",
    [CallingState.RINGING]: "Ringing",
    [CallingState.RECONNECTING]: "Re-connecting",
    [CallingState.RECONNECTING_FAILED]: "Failed",
    [CallingState.OFFLINE]: "No internet connection",
    [CallingState.IDLE]: "Idle",
    [CallingState.UNKNOWN]: "Unknown error!",
    [CallingState.JOINED]: "Joined",
    [CallingState.LEFT]: "Left call",
  };

  const SelectedLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "participants-left":
        return <SpeakerLayout participantsBarPosition="left" />;
      case "participants-right":
        return <SpeakerLayout participantsBarPosition="right" />;
      default:
        return <PaginatedGridLayout />;
    }
  };

  useEffect(() => {
    if (CallingState === "left") {
      router.push("/");
    }
  }, [CallingState, router]);

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center overflow-hidden py-4 px-2 bg-gray-900 text-white">
      <Modal
        isOpen={modalOpen}
        title="End call for everyone?"
        buttonLabel="End"
        type="endCall"
        onClose={() => setModalOpen(false)}
      />

      <div
        id="videoPanel"
        className="w-full h-full min-h-[90vh] flex flex-col items-center justify-center"
      >
        {CallingState !== "joined" ? (
          <p className="capitalize font-bold text-xl">
            {CALLING_STATE_TO_LABEL[CallingState] || "Joining..."}
          </p>
        ) : (
          <SelectedLayout />
        )}
      </div>
      <div
        className={cn(
          "hidden absolute bottom-[10vh] right-10 bg-[#19232d] z-40 backdrop-blur-sm px-3 py-5 rounded-2xl",
          { block: showParticipants }
        )}
      >
        <CallParticipantsList
          onClose={() => {
            setShowParticipants(false);
          }}
        />
      </div>
      <div
        id="controls"
        className="flex items-center gap-4 flex-wrap justify-center mb-10"
      >
        <CallControls
          onLeave={() => {
            console.log("leaved");
            router.push("/");
          }}
        />
        <div className="flex h-16 mb-0 justify-center items-center">
          {roomOwner && (
            <Button
              variant="destructive"
              className="rounded-3xl"
              onClick={() => setModalOpen(!modalOpen)}
            >
              End call for everyone
            </Button>
          )}
          <DropdownMenu>
            <div className="flex items-center">
              <DropdownMenuTrigger className="cursor-pointer rounded-3xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
                <Image
                  src="/icons/gridView.svg"
                  width={25}
                  height={75}
                  alt="Menu"
                />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="border-dark-1 bg-dark-1 bg-[#19232d] text-white">
              {["Grid", "Participants-Left", "Participants-Right"].map(
                (item, index) => (
                  <div key={index}>
                    <DropdownMenuItem
                      onClick={() => setLayout(item.toLowerCase())}
                    >
                      {item}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="border-dark-1" />
                  </div>
                )
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            className="bg-[#19232d] hover:bg-[#4c535b] rounded-3xl"
            onClick={() => {
              setShowParticipants(!showParticipants);
            }}
          >
            <FontAwesomeIcon
              icon={faUsersViewfinder}
              size="xl"
              color="#eaeaea"
            />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MeetingRoom;
