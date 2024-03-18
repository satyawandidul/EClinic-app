export default [
    {
        path: '/doctor',
        name: 'Doctor Desk',
        component: () => import('@/views/Layout'),
        children: [
            {
                path: 'Consultation',
                name: 'ConsultationView',
                component: () => import('@/views/doctor/ConsultationView'),
                alias: '/dashboard'
            },
            {
                path: 'Dashboard',
                name: 'Today\'s Appointments',
                component: () => import('@/views/doctor/Dashboard'),
                alias: '/dashboard'
            },
            {
                path: 'WaitingRoom',
                name: 'Waiting for appointments',
                component: () => import('@/views/doctor/WaitingRoom'),
                alias: '/dashboard'
            },
        ]
    }
]