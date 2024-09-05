import { Toaster } from "sonner";
import Mainlayout from "./components/layouts/Mainlayout";

const App = () => {
  return (
    <div className="mx-auto max-w-[1400px]">
      <Toaster
        position="top-center"
        toastOptions={{
          unstyled: true,
          classNames: {
            toast: "bg-blue-400",
            title: "text-red-400",
            description: "text-red-400",
            actionButton: "bg-zinc-400",
            cancelButton: "bg-orange-400",
            closeButton: "bg-lime-400",
          },
        }}
      />
      <Mainlayout />
    </div>
  );
};

export default App;
