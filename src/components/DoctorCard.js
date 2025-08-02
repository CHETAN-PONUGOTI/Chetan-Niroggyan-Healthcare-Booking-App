import React from 'react'

const DoctorCard = ({doctor}) => (
  <div className="doctor-card">
    <img src={doctor.image} alt={doctor.name} className="doctor-image" />
    <h3>{doctor.name}</h3>
    <p>{doctor.specialization}</p>
    <span
      className={`status ${doctor.availabilityStatus
        .toLowerCase()
        .replace(/\s+/g, '-')}`}
    >
      {doctor.availabilityStatus}
    </span>
  </div>
)

export default DoctorCard;