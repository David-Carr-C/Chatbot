import { TooltipProvider } from "@radix-ui/react-tooltip";
import Dashboard from "./components/Dashboard";

export const description =
  "An AI playground with a sidebar navigation and a main content area. The playground has a header with a settings drawer and a share button. The sidebar has navigation links and a user menu. The main content area shows a form to configure the model and messages.";

function DashboardPage() {
  return (
    <TooltipProvider>
      <Dashboard />
    </TooltipProvider>
  );
}

export default DashboardPage;