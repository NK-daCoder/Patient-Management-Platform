import { appointment, consultation, home, logout, medication, record, settings, support } from "./icons.js"


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
    
}

export { PatientDashboardElements, PatientNavLabels }