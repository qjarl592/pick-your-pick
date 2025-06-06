import React, { HTMLAttributes, KeyboardEvent } from "react";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useAudioStore } from "@/store/audioStore";

export default function Metronome() {
  const { isMetronomeOn, currentBPM, toggleMetronome, setBPM } = useAudioStore();
  const handleToggleSwitch = (isOpen: boolean) => {
    toggleMetronome(isOpen);
  };

  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key.toLowerCase() !== "enter") return;
    const newValue = Number((e.target as HTMLInputElement).value);
    console.log(newValue);
    if (Number.isNaN(newValue)) return;
    if (newValue > 0 && newValue <= 300) {
      setBPM(newValue);
    }
  };

  return (
    <div className="flex items-center justify-between text-base">
      <div className="font-semibold">메트로놈</div>
      <div className="flex items-center gap-1">
        <Switch disabled={currentBPM === 0} checked={isMetronomeOn} onCheckedChange={handleToggleSwitch} />
        <div className="relative">
          <MetronomeIcon className="absolute left-2 top-4 -translate-y-1/2" />
          <Input className="h-8 w-20 pl-8 text-right" placeholder="BPM" onKeyDown={handleKeydown} />
        </div>
      </div>
    </div>
  );
}

const MetronomeIcon = (props: HTMLAttributes<HTMLOrSVGElement>) => {
  return (
    <svg
      fill="#000000"
      height="20px"
      width="20px"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 314 314"
      xmlSpace="preserve"
      {...props}
    >
      <path
        d="M281.853,46.631c-0.39-2.035-1.66-3.794-3.47-4.802l-11.257-6.271l5.297-9.511c1.881-3.378,0.668-7.641-2.709-9.521
	c-3.38-1.881-7.641-0.667-9.521,2.709l-5.297,9.511l-11.257-6.269c-1.81-1.008-3.975-1.162-5.908-0.422
	c-1.936,0.74-3.442,2.3-4.117,4.259l-13.806,40.109c-1.103,3.207,0.25,6.743,3.213,8.394l4.741,2.642l-23.115,41.501L184.592,17.11
	C182.703,7.516,173.563,0,163.783,0h-56.052c-9.778,0-18.918,7.516-20.809,17.11L46.102,224.425
	c-0.002,0.012-0.004,0.023-0.006,0.035l-13.729,69.725c-0.998,5.067,0.205,10.132,3.3,13.895C38.76,311.842,43.496,314,48.66,314
	h174.195c5.163,0,9.898-2.158,12.993-5.92c3.095-3.763,4.298-8.827,3.301-13.896l-13.732-69.741
	c-0.001-0.002-0.001-0.004-0.001-0.004l-16.584-84.225l31.16-55.944l4.742,2.642c1.072,0.598,2.243,0.885,3.402,0.885
	c2.046,0,4.056-0.896,5.425-2.571l26.836-32.853C281.708,50.769,282.241,48.665,281.853,46.631z M100.659,19.816
	c0.6-3.044,3.971-5.816,7.072-5.816h56.052c3.103,0,6.473,2.771,7.072,5.815l23.249,118.069L164,191.933
	c-6.17-2.645-13.121-4.627-21.242-5.363v-14.92h10.96c3.866,0,7-3.134,7-7s-3.134-7-7-7h-10.96v-41.211h10.96c3.866,0,7-3.134,7-7
	c0-3.866-3.134-7-7-7h-10.96v-41.21h10.96c3.866,0,7-3.134,7-7s-3.134-7-7-7h-10.96V34.938c0-3.866-3.134-7-7-7
	c-3.866,0-7,3.134-7,7v12.291h-10.96c-3.866,0-7,3.134-7,7s3.134,7,7,7h10.96v41.21h-10.96c-3.866,0-7,3.134-7,7
	c0,3.866,3.134,7,7,7h10.96v41.211h-10.96c-3.866,0-7,3.134-7,7s3.134,7,7,7h10.96v14.92c-19.447,1.763-32.189,10.688-43.564,18.666
	c-7.894,5.536-14.975,10.493-23.52,12.573L100.659,19.816z M225.036,299.188c-0.432,0.523-1.206,0.813-2.181,0.813H48.66
	c-0.976,0-1.75-0.289-2.181-0.814c-0.432-0.524-0.565-1.34-0.377-2.297l12.675-64.372c14.147-1.593,24.455-8.807,34.455-15.82
	c12.059-8.457,23.448-16.444,42.525-16.444c19.077,0,30.466,7.987,42.524,16.444c10.001,7.014,20.308,14.228,34.456,15.82
	l12.675,64.371C225.602,297.846,225.468,298.662,225.036,299.188z M209.842,217.809c-8.545-2.08-15.627-7.037-23.521-12.574
	c-3.175-2.227-6.456-4.527-9.959-6.726l21.928-39.367L209.842,217.809z M246.427,71.829l-11.474-6.392l9.177-26.662l20.136,11.216
	L246.427,71.829z"
      />
    </svg>
  );
};
