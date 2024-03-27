# Icy-Form
<p align="center"><img src="https://ik.imagekit.io/atcan/Group%2043.png?updatedAt=1711253259959" alt="icepanel-logo" width="400"></p>

<p align="center"><a href="https://ik.imagekit.io/atcan/Screenshot%202024-03-23%20at%207.58.33%E2%80%AFPM.png?updatedAt=1711249349259"></a></p>

<h2>Project Screenshots:</h2>
<img src="https://ik.imagekit.io/atcan/Screenshot%202024-03-23%20at%208.53.11%E2%80%AFPM.png?updatedAt=1711252407535" alt="project-screenshot" />

<h2>C4 Model Abstraction:</h2>
<img src="https://ik.imagekit.io/atcan/Group%2045.png?updatedAt=1711496937673" />
To capture the overview of this product, diagrams were designed following the C4 model abstraction. This approach facilitated the clarification of Container and Context diagrams, organization of the necessary components, and ensured the maintenance of clean code.
<a href="https://s.icepanel.io/wSllDzMcL145kD/bf4t" alt="icepanel-link">Click the link</a> to view a C4 model abstraction diagram created using IcePanel.

## Video Showcase

https://github.com/gyunayK/Icy-Form/assets/112416257/4488ba96-9a1a-4d58-aaf2-0b6da17c9497


https://github.com/gyunayK/Icy-Form/assets/112416257/36c29d9b-2391-44e3-a5b2-69f35b9e3e3a


<h2>Built With:</h2>
<ul>
  <li>Vue 3</li>
  <li>TailwindCSS</li>
  <li>NodeJS</li>
</ul>

<h2>Key Libraries Used:</h2>
<p>The following libraries are integral to the functionality of our application, both on the frontend and backend:</p>

<h3>Backend:</h3>
<ul>
  <li><strong>Express:</strong> Chosen for its minimalism and flexibility in creating API endpoints.</li>
  <li><strong>Mongoose:</strong> Preferred for object data modelling (ODM) to interface with MongoDB, providing a straightforward schema-based solution to model application data.</li>
  <li><strong>Cors:</strong> Essential for enabling Cross-Origin Resource Sharing, allowing our front end to communicate with the backend safely.</li>
  <li><strong>Multer:</strong> Used for handling multipart/form data, primarily for uploading files.</li>
  <li><strong>Morgan:</strong> Integrated for HTTP request logging, which aids in debugging and logging server requests.</li>
</ul>

<h3>Frontend:</h3>
<ul>
  <li><strong>Vue:</strong> A progressive framework for building user interfaces, chosen for its reactivity and component-based architecture.</li>
  <li><strong>Vue Router:</strong> Utilized for single-page application routing, enabling navigation between pages without refreshing the page.</li>
  <li><strong>Pinia:</strong> The store of choice for Vue, employed for state management with its simplicity and tight integration with the Vue DevTools.</li>
  <li><strong>Axios:</strong> Selected for promise-based HTTP client requests, offering a straightforward way to interact with our backend's APIs.</li>
  <li><strong>FontAwesome:</strong> Included for its comprehensive collection of icons, easily integrated into Vue components for enhanced UI design.</li>
  <li><strong>Zod:</strong> Incorporated for schema declaration and validation, improving the robustness of data handling.</li>
</ul>

<h2>Estimates of Time Taken:</h2>
<p>6 hours</p>

## Improvements

<p>A valuable improvement for this project could be migrating icon and image storage from the backend's file system to an Amazon S3 bucket. While direct filesystem access offers speed benefits, using S3 can significantly enhance scalability and reliability across distributed systems. </p>

<h2>How to Run the Project:</h2>
<p>Follow these steps to set up your development environment for both the frontend and backend:</p>

<p><strong>Step 1:</strong> Clone the repository to your local machine:</p>

<pre><code>git clone https://github.com/your-repository/OpenhouseAi.git</code></pre>

<p><strong>Step 2:</strong> Navigate to the frontend directory, install the dependencies, and start the frontend server:</p>

<pre><code>cd frontend
pnpm install
pnpm run dev</code></pre>

<p>This will start the frontend part of the project and will be available on <code>http://localhost:5173</code>.</p>

<p><strong>Step 3:</strong> In a new terminal window, navigate to the backend directory, install the dependencies, and start the backend:</p>

<pre><code>cd backend
pnpm install
pnpm run dev</code></pre>

<p>This will start the backend.</p>


