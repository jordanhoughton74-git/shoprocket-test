import Hero from "@/components/move-down/hero";
import Collaboration from "@/components/move-down/colloboration";
import SamePage from "@/components/move-down/same-page";
import Features from "@/components/move-down/features";
import FormFade from "@/components/move-down/form-fade";
import Cta from "@/components/move-down/cta"

export default function Home() {
  return (
    <main className="bg-gray-900 max-w-[1132px] mx-auto">
      <Hero />
      <div className="overflow-x-clip">
        <Collaboration />
        <SamePage />
        <FormFade />
        <Features />
        <Cta />
        {/* <StreamlinedExperience /> */}
      </div>
    </main>
  );
}
