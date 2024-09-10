import Hero from "@/components/driving-equality/hero";
import Collaboration from "@/components/driving-equality/section-two";
import SamePage from "@/components/driving-equality/same-page";
import Features from "@/components/driving-equality/features";
import Cta from "@/components/move-down/cta"


export default function Home() {
  return (
    <main className="bg-gray-900 max-w-[1132px] mx-auto">
      <Hero />
      <div className="overflow-x-clip">
        <Collaboration />
        <SamePage />
        {/* <FormFade /> */}
        <Features />
        <Cta />
      </div>
    </main>
  );
}
