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
                component: () => import('@/views/reception/Appointments.vue'),
                alias: '/dashboard'
            },
            {
                path: 'WaitingRoom',
                name: 'Waiting for appointments',
                component: () => import('@/views/reception/AppointmentList.vue'),
                alias: '/dashboard'
            },
        ]
    }
]