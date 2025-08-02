import { rest } from 'msw'

const doctorsData = [
  {
    id: 1,
    name: 'Dr. Anjali Sharma',
    specialization: 'Cardiologist',
    image: 'images/doc1.jpg',
    availabilityStatus: 'Available Today',
    schedule: [
      { day: 'Monday', time: '10:00 AM - 1:00 PM' },
      { day: 'Wednesday', time: '2:00 PM - 5:00 PM' },
      { day: 'Friday', time: '10:00 AM - 1:00 PM' },
    ],
  },
  {
    id: 2,
    name: 'Dr. Vikram Singh',
    specialization: 'Dermatologist',
    image: 'images/doc2.jpg',
    availabilityStatus: 'Fully Booked',
    schedule: [
      { day: 'Tuesday', time: '9:00 AM - 12:00 PM' },
      { day: 'Thursday', time: '3:00 PM - 6:00 PM' },
    ],
  },
  {
    id: 3,
    name: 'Dr. Priya Desai',
    specialization: 'Pediatrician',
    image: 'images/doc3.jpg',
    availabilityStatus: 'On Leave',
    schedule: [],
  },
]

// This is the crucial part: handlers must be an array.
export const handlers = [
  // Mock endpoint to get all doctors
  rest.get('/api/doctors', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(doctorsData))
  }),

  // Mock endpoint to get a single doctor by ID
  rest.get('/api/doctors/:id', (req, res, ctx) => {
    const { id } = req.params
    const doctor = doctorsData.find(doc => doc.id === parseInt(id, 10))
    if (doctor) {
      return res(ctx.status(200), ctx.json(doctor))
    }
    return res(ctx.status(404), ctx.json({ message: 'Doctor not found' }))
  }),
]