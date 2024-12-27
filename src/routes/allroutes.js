import Login from '../modules/login/login';
import Dashboard from '../modules/dashboard/dashboard';
import Assignment from '../modules/Assignment_Page/Assignment_Page';
import Liveclass from '../modules/liveClass/LiveClass';
import Doc from '../modules/DOC/document';
import Profile from '../modules/profile/profile';
import Products from '../modules/Products/product'
import StudyM from '../modules/StudyM/studymaterial'
import timetable from '../modules/timetable/timetable'
import Exam from '../modules/ExamReports';
import MyExam from '../modules/MyExam';
import Messages from '../components/header/messages';
import PastView from '../modules/Assignment_Page/viewassignmentpage/past_assignment_main_page';
import CompletedProd from '../modules/Products/completdProd';
import Announcement from '../components/header/announcement/announcement';
import Eventcalender from '../modules/eventCalender'



const dashboardRoutes = [
    {path: '/dashboard', exact: true, strict:true, component:  Announcement},
    {path: '/Messages', exact: true, strict:true, component: Messages},
    {path: '/announcement', exact: true, strict:true, component: Announcement},
    {path: '/exam', exact: true, strict:true, component:  MyExam},
    {path: '/report', exact: true, strict:true, component:  Exam},
    {path: '/assignment', exact: true, strict:true, component:  Assignment},
    {path:'/live', exact: true, strict:true, component:  Liveclass},
    {path: '/document', exact: true, strict:true, component:  Doc },
    {path: '/profile', exact: true, strict:true, component: Profile },
    {path: '/product', exact: true, strict:true, component:Products},
    {path: '/studymaterial', exact: true, strict:true, component:StudyM},
    {path: '/timetable', exact: true, strict:true, component:timetable},
    {path: '/assignment/:fileId', exact: true, strict:true, component:PastView },
    {path: '/product/:id', exact: true, strict:true, component:CompletedProd },
    {path: '/eventCalender', exact: true, strict:true, component:Eventcalender }
    
 
   ]

const siteRoutes = [
    {path: '/', exact: true, strict:true, component: Login}
]

export {siteRoutes ,  dashboardRoutes};