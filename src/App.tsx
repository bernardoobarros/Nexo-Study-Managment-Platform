import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NewInquiryModal from "./components/NewInquiryModal.tsx";
import Sidebar from "./components/Sidebar.tsx";
import ArchivePage from "./pages/ArchivePage.tsx";
import AssignmentPage from "./pages/AssignmentPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import IntegrationPage from "./pages/IntegrationPage.tsx";

function App() {
  const [inquiryOpen, setInquiryOpen] = useState(false);

  return (
    <div className="flex h-svh min-h-0 w-full overflow-hidden bg-white">
      <Sidebar onNovaConsulta={() => setInquiryOpen(true)} />
      <main className="min-h-0 min-w-0 flex-1 overflow-y-auto bg-slate-50/50">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/tarefas" element={<AssignmentPage />} />
          <Route path="/integracoes" element={<IntegrationPage />} />
          <Route path="/arquivo" element={<ArchivePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {inquiryOpen ? <NewInquiryModal onClose={() => setInquiryOpen(false)} /> : null}
    </div>
  );
}

export default App;
