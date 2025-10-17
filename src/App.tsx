import InputPanel from "./components/organisms/InputPanel";
import HistoricalList from "./components/organisms/HistoricalList";

export default function App() {
  return (
    <div className="relative min-h-screen flex items-start justify-center p-10">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/bg.jpg')`,
        }}
      />

      {/* Overlay (Opacity 0.6) */}
      <div className="absolute inset-0 bg-white/60" />

      {/* Main Content */}
      <div className=" lg:grid lg:grid-cols-3 flex flex-col-reverse gap-6 w-full z-10 h-full lg:h-[90vh]">
        <HistoricalList />
        <div className="lg:col-span-2">
          <InputPanel />
        </div>
      </div>
    </div>
  );
}
