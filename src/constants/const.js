import { appointment, consultation, home, logout, medication, record, settings, support } from "./icons.js"

const PatientDashboardElements = {
    PrimaryNavigations: [
        { label: "Home", icon: home },
        { label: "Appointments", icon: appointment },
        { label: "Medications", icon: medication },
        { label: "Records", icon: record},
        { label: "Consultation", icon: consultation },

    ],
    SecondaryNavigations: [
        { label: "Support", icon: support },
        { label: "Settings", icon: settings },
        { label: "Logout", icon: logout }
    ]
}

export { PatientDashboardElements }