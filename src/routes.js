import React from 'react'

const Topic = React.lazy(() => import('./views/Admin/topic/Topic'))
const ProjectRegistered = React.lazy(() =>
  import('./views/Admin/projectRegistered/ProjectRegistered'),
)
const ProjectAwaitingApproval = React.lazy(() =>
  import('./views/Admin/projectAwaitingApproval/ProjectAwaitingApproval'),
)
const Lecturer = React.lazy(() => import('./views/Admin/lecturer/Lecturer'))
const Student = React.lazy(() => import('./views/Admin/student/Student'))
const ProjectDetail = React.lazy(() => import('./views/User/projectDetail/ProjectDetail'))
const StudentDetail = React.lazy(() => import('./views/Admin/studentDetail/StudentDetail'))
const LecturerDetail = React.lazy(() => import('./views/Admin/lecturerDetail/LecturerDetail'))
const AccountManager = React.lazy(() => import('./views/Admin/accountManager/AccountManager'))
const Tag = React.lazy(() => import('./views/Admin/tag/Tag'))
const PersonalInfoPage = React.lazy(() => import('./views/User/personalInfoPage/PersonalInfoPage'))
const LecturerInfoPage = React.lazy(() => import('./views/User/lecturerInfoPage/LecturerInfoPage'))
const CurrentProject = React.lazy(() => import('./views/User/currentProject/CurrentProject'))
const Project = React.lazy(() => import('./views/User/project/Project'))
// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const routes = [
  { path: '/accountManager', name: 'AccountManager', element: AccountManager },
  { path: '/topic', name: 'Topic', element: Topic },
  { path: '/projectRegistered', name: 'ProjectRegistered', element: ProjectRegistered },
  { path: '/project', name: 'Project', element: Project },
  { path: '/personalInfoPage', name: 'PersonalInfoPage', element: PersonalInfoPage },
  { path: '/lecturerInfoPage', name: 'LecturerInfoPage', element: LecturerInfoPage },
  { path: '/currentProject', name: 'CurrentProject', element: CurrentProject },
  {
    path: '/projectAwaitingApproval',
    name: 'ProjectAwaitingApproval',
    element: ProjectAwaitingApproval,
  },
  { path: '/lecturer', name: 'Lecturer', element: Lecturer },
  { path: '/tag', name: 'Tag', element: Tag },
  { path: '/student', name: 'Student', element: Student },
  { path: '/projectDetail/:id', name: 'ProjectDetail', element: ProjectDetail },
  { path: '/studentDetail/:id', name: 'StudentDetail', element: StudentDetail },
  { path: '/lecturerDetail/:id', name: 'LecturerDetail', element: LecturerDetail },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
]

export default routes