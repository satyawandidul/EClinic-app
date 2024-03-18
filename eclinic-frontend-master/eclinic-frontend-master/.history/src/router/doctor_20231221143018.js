export default [
    {
        path: '/doctor',
        name: 'Reception Desk',
        component: () => import('@/views/Layout'),
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