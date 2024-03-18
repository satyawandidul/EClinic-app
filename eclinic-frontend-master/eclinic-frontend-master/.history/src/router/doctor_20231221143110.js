export default [
    {
        path: '/doctor',
        name: 'Doctor Desk',
        component: () => import('@/'),
        children: [
            {
                path: 'dashboard',
                name: 'Reception Dashboard',
                component: () => import('@/views/reception/Dashboard.vue'),
                alias: '/dashboard'
            },
            {
                path: 'appointments',
                name: 'Today\'s Appointments',
                component: () => import('@/views/reception/Appointments.vue'),
                alias: '/dashboard'
            },
            {
                path: 'search',
                name: 'Look for appointments',
                component: () => import('@/views/reception/AppointmentList.vue'),
                alias: '/dashboard'
            },
        ]
    }
]