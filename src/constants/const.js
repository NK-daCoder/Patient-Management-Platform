import { appointment, consultation, departments, doctors, earnings, home, inventory, logout, medication, patient, record, settings, support } from "./icons.js"


const AdminNavLabels = {
    Home: "Overview",
    Appointments: "Appointments",
    Patients: "Patients",
    Inventory: "Inventory",
    Doctors: "Doctors",
    Departments: "Departments",
    Earnings: "Earnings",
    Settings: "Settings",
    Support: "Support",
    LogOff: "Logout"
}

const PatientNavLabels = {
    Home: "Home",
    Appointments: "Appointments",
    Medications: "Medications",
    Records: "Record",
    Consultation: "Consultation",
    Notifications: "Notifications",
    Emergency: "Emergency",
    Record: "Record",
    Consultation: "Consultation"

}

const PatientDashboardElements = {
    PrimaryNavigations: [
        { label: PatientNavLabels.Home, icon: home },
        { label: PatientNavLabels.Appointments, icon: appointment },
        { label: PatientNavLabels.Medications, icon: medication },
        { label: PatientNavLabels.Record, icon: record},
        { label: PatientNavLabels.Consultation, icon: consultation },

    ],
    SecondaryNavigations: [
        { label: "Support", icon: support },
        { label: "Settings", icon: settings },
        { label: "Logout", icon: logout }
    ],

    MedicationTabs: [
        {label: "💊 Active Medications"},
        {label: "🗓️ Medication Reminders"},
        {label: "🧾 Prescriptions History"},

    ]
    
}

const AdminDashboardElements = {
    PrimaryNavElements: [
        {label: AdminNavLabels.Home, icon: home},
        {label: AdminNavLabels.Patients, icon: patient},
        {label: AdminNavLabels.Inventory, icon: inventory},
        {label: AdminNavLabels.Doctors, icon: doctors},
        {label: AdminNavLabels.Departments, icon: departments},
        {label: AdminNavLabels.Earnings, icon: earnings},
    ],
    SecondaryNavElements: [
        {label: AdminNavLabels.Settings, icon: settings},
        {label: AdminNavLabels.Support, icon: support},
        {label: AdminNavLabels.LogOff, icon: logout}
    ]
}

export { PatientDashboardElements, PatientNavLabels, AdminDashboardElements, AdminNavLabels }