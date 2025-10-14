import InputPanel from "./components/organisms/InputPanel";
import HistoricalList from "./components/organisms/HistoricalList";

export default function App() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-start justify-center p-10"
      style={{
        backgroundImage: `url('/src/assets/background.jpg')`,
        opacity: 0.9,
      }}
    >
      <div className="grid grid-cols-3 gap-6 w-full ">
        <HistoricalList />
        <div className="col-span-2">
          <InputPanel />
        </div>
      </div>
    </div>
  );
}
