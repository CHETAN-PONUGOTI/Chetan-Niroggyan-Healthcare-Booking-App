🩺 Healthcare Appointment Booking App
A responsive web application for finding doctors and booking healthcare appointments. This project is built primarily with React (using class components) and features a mock API to simulate backend interactions.

✨ Features

. View Doctor Listings: See a list of available doctors on the landing page.

. Search & Filter: Easily search for doctors by their name or specialization.

. Detailed Profiles: Click on a doctor to view their detailed profile, including their weekly availability schedule.

. Appointment Booking: A simple and intuitive form to book an appointment with a selected doctor.

. Client-Side Validation: Ensures that the data submitted in the booking form is valid.

. Mock API: Uses Mock Service Worker (MSW) to simulate network requests for a realistic development experience without needing a live backend.

. Responsive Design: The layout is fully responsive and works smoothly on desktop, tablet, and mobile devices.


🛠️ Tools & Libraries Used

. Frontend: React.js (v17, Class Components)

. Routing: React Router DOM (v5.2.0)

. API Mocking: Mock Service Worker (MSW)

. Styling: CSS3

. Icons: React Icons

. Loaders: React Loader Spinner

. Cookies: JS-Cookie

. Development Tools:

. ESLint (for code linting)

. Prettier (for code formatting)


💡 Improvements with More Time

. Given more time, I would implement the following enhancements:

. Full Backend Integration: Replace the Mock Service Worker with a real backend using Node.js, Express, and a database like MongoDB or PostgreSQL to persist user and appointment data.

. User Authentication: Add user registration and login for patients. This would allow users to view their appointment history and manage their profiles.

. Advanced State Management: For a larger application, I would integrate a global state management library like Redux Toolkit or Zustand to handle shared state more efficiently.

. Interactive Calendar: Replace the default date/time input with a more user-friendly calendar component (e.g., react-big-calendar) to visualize the doctor's schedule and select appointment slots.

. Notifications: Implement email or SMS notifications for appointment confirmations and reminders using services like SendGrid or Twilio.

. Comprehensive Testing: Add more robust testing, including unit tests for components and end-to-end tests using a framework like Cypress or Playwright.


Challenges Faced and Solutions

. During development, I encountered several technical challenges:

. Challenge: Node.js Version Incompatibility

. Problem: After setting up the project, the development server would crash with a cryptic error: error:0308010C:digital envelope routines::unsupported. This was caused by an incompatibility between a modern version of Node.js (v17+) and an older version of react-scripts.

. Solution: I resolved this by modifying the start script in package.json to include the --openssl-legacy-provider flag, which tells Node.js to use an older, compatible security provider.

. Challenge: Mock Service Worker (MSW) Initialization

. Problem: The application would load a blank white screen. Through browser debugging tools, I discovered that the mock API was not starting, causing data-fetching components to crash.

. Solution: This required a multi-step fix:

. First, I ran npx msw init public/ to generate the necessary mockServiceWorker.js file.

. Next, I corrected the src/index.js file to properly start the worker, eventually using if (window.location.hostname === 'localhost') to avoid process is not defined errors.

. Finally, I had to ensure all files in the src/mocks/ directory (browser.js and handlers.js) were present and exporting the correct objects and arrays.

. Challenge: Git Pre-Commit Hook Failures on Windows

. Problem: When trying to commit code, Git would fail due to issues with line endings (LF vs. CRLF). A pre-commit hook was running Prettier, which changed the line endings, but these changes were not being included in the commit.

. Solution: I established a clean workflow: first, run npm run format manually to apply all formatting changes. Then, run git add . to stage these changes. Finally, run git commit, which allows the pre-commit hook to pass without issues.
