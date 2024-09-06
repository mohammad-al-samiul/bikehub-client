import { Toaster } from "sonner";
import Mainlayout from "./components/layouts/Mainlayout";

const App = () => {
  return (
    <div className="mx-auto max-w-[1400px]">
      <Toaster position="top-center" />
      <Mainlayout />
    </div>
  );
};

export default App;
