export default [
  {
    path: '/super',
    name: 'Super-Admin',
    component: () => import('@/views/Layout'),
    children: [
      {
        path: 'dashboard',
        name: 'Super Admin Dashboard',
        component: () => import('@/views/super/dashboard/Dashboard'),
        alias: '/dashboard',
      },
      {
        path: 'locations',
        name: 'Locations',
        component: () => import('@/views/super/locations/Locations'),
      },
      {
        path: "location/add",
        name: "Add New Location",
        component: () => import('@/views/super/locations/AddOrEditLocation'),
      },
      {
        path: 'location/:id',
        name: 'Edit Location Details',
        component: () => import('@/views/super/locations/AddOrEditLocation'),
        props: true,
      },
      {
        path: 'medicines',
        name: 'Medicines',
        component: () => import('@/views/super/medicines/Medicines'),
      },
      {
        path: 'medicine/add',
        name: 'Add New Medicine',
        component: () => import('@/views/super/medicines/AddOrEditMedicine'),
      },
      {
        path: 'medicine/:id',
        name: 'Edit Medicine Details',
        component: () => import('@/views/super/medicines/AddOrEditMedicine'),
        props: true,
      },
      {
        path: 'batches',
        name: 'Batches',
        component: () => import('@/views/super/batches/Batches'),
      },
      {
        path: 'batch/add',
        name: 'Add New Batch',
        component: () => import('@/views/super/batches/AddOrEditBatch'),
      },
      {
        path: 'batch/:id',
        name: 'Edit Batch Details',
        component: () => import('@/views/super/batches/AddOrEditBatch'),
        props: true
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('@/views/super/users/Users'),
      },
      {
        path: 'user/add',
        name: 'Add New User',
        component: () => import('@/views/super/users/AddOrEditUser'),
      },
      {
        path: 'user/:id',
        name: 'Edit User Details',
        component: () => import('@/views/super/users/AddOrEditUser'),
        props: true,
      },
      {
        path: 'stock',
        name: 'Stock-Overview',
        component: () => import('@/views/super/stock/StockOverview'),
      },
      {
        path: 'stock/add/:id',
        name: 'Add-Stock',
        component: () => import('@/views/super/stock/ImportStock'),
        props: true
      },

      {
        path: 'patients',
        name: 'Patients',
        component: () => import('@/views/shared/patients/Patients'),
      },
      {
        path: 'patient/add',
        name: 'Add New Patient',
        component: () => import('@/views/shared/patients/AddOrEditPatient'),
      },
      {
        path: 'patient/:id',
        name: 'Edit Patient Details',
        component: () => import('@/views/shared/patients/AddOrEditPatient'),
        props: true,
      },
      {
        path: 'charges',
        name: 'Consultation Charges',
        component: () => import('@/views/super/consultation/Charges'),
      },
      {
        path: 'charges/:id',
        name: 'Update Consultation Charges',
        component: () => import('@/views/super/consultation/UpdateCharges'),
        props: true
      },
      {
        path: 'panchakarma',
        name: 'Panchakarma',
        component: () => import('@/views/super/panchakarma/Panchakarma'),
      },
      {
        path: 'panchakarma/add',
        name: 'Add New Panchakarma',
        component: () => import('@/views/super/panchakarma/AddOrEditPanchakarma'),
      },
      {
        path: 'panchakarma/:id',
        name: 'Edit Panchakarma Details',
        component: () => import('@/views/super/panchakarma/AddOrEditPanchakarma'),
        props: true,
      },
      {
        path: 'tolerances',
        name: 'Tolerances',
        component: () => import('@/views/shared/tolerance/Tolerances'),
      },
      {
        path: 'tolerance/add',
        name: 'Add New Tolerance',
        component: () => import('@/views/shared/tolerance/AddOrEditTolerance'),
      },
      {
        path: 'tolerance/:id',
        name: 'Edit Tolerance Details',
        component: () => import('@/views/shared/tolerance/AddOrEditTolerance'),
        props: true,
      },
      {
        path: 'treatments',
        name: 'Treatments',
        component: () => import('@/views/super/treatments/Treatments')
      },
      {
        path: 'treatment/add',
        name: 'Add New Treatment',
        component: () => import('@/views/super/treatments/AddOrEditTreatment'),
      },
      {
        path: 'treatment/:id',
        name: 'Edit Treatment Details',
        component: () => import('@/views/super/treatments/AddOrEditTreatment'),
        props: true
      }
    ]
  }
]