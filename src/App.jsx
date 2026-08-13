import { Routes, Route } from 'react-router'
import AppLayout from './components/layout/AppLayout'
import HomePage from './pages/HomePage'
import RoadmapPage from './pages/RoadmapPage'
import StagePage from './pages/StagePage'
import LessonViewPage from './pages/LessonViewPage'
import CheckpointPage from './pages/CheckpointPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import DashboardPage from './pages/DashboardPage'
import SpecializationPage from './pages/SpecializationPage'
import SearchModal from './components/search/SearchModal'

export default function App() {
  return (
    <>
      <SearchModal />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="roadmap" element={<RoadmapPage />} />
          <Route path="roadmap/:stageId" element={<StagePage />} />
          <Route path="learn/:stageId/:lessonId" element={<LessonViewPage />} />
          <Route path="checkpoint/:stageId" element={<CheckpointPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:projectId" element={<ProjectDetailPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="specialization" element={<SpecializationPage />} />
        </Route>
      </Routes>
    </>
  )
}
