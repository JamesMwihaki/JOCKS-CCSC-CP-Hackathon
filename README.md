# CCSC-CP-Hackathon

## Jocks 2025 CCSC-CP Hackathon

### Prerequisites
- Docker installed
- Node.js installed

---

### Installation Guide (GitHub)

1. **Clone the Repository:**
   - Open a terminal.
   - Navigate to the desired directory.
   - Run:
     ```bash
     git clone https://github.com/JamesMwihaki/JOCKS-CCSC-CP-Hackathon.git
     ```

2. **Set Up Docker:**
   - Open Docker.
   - Go back to the terminal.
   - Run:
     ```bash
     docker-compose up --build
     ```
   - Upon completion, hit `Ctrl-C` in the terminal.

3. **Install Server Dependencies:**
   - Type:
     ```bash
     cd server
     npm install
     npm install typeorm mapped-types
     ```

4. **Install Client Dependencies:**
   - Then run:
     ```bash
     cd ../client
     npm install
     npm install axios react-router-dom fuse.js leaflet mapbox-gl
     ```

5. **Close the Terminal.**

---

### Installation Guide (Zip)

1. **Download and Extract:**
   - Download the zip file.
   - Navigate to the desired directory.
   - Extract the zip file.

2. **Set Up Docker:**
   - Open Docker.
   - Open a terminal.
   - Run:
     ```bash
     docker-compose up --build
     ```
   - Upon completion, hit `Ctrl-C` in the terminal.

3. **Install Server Dependencies:**
   - Type:
     ```bash
     cd server
     npm install
     npm install typeorm mapped-types
     ```

4. **Install Client Dependencies:**
   - Then run:
     ```bash
     cd ../client
     npm install
     npm install axios react-router-dom fuse.js leaflet mapbox-gl
     ```

5. **Close the Terminal.**

---

### Running the Page

1. **Start Postgres in Docker:**
   - Open Docker and ensure Postgres is running.

2. **Run the Server:**
   - Open a terminal.
   - Run:
     ```bash
     cd server
     npm run start:dev
     ```

3. **Run the Client:**
   - Open a new terminal.
   - Run:
     ```bash
     cd client
     npm start
     ```

---

Happy coding and good luck at the hackathon!
