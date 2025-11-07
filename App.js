import RootNavigation from "./src/navigation/RootNavigation";
import AppProvider from "./src/provider/AppProvider";
import StorageProvider from "./src/provider/StorageProvider";

export default function App() {
  return (
    <AppProvider>
      <StorageProvider>
        <RootNavigation />;
      </StorageProvider>
    </AppProvider>
  );
}
