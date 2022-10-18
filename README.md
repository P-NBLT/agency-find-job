# Digital agency searchable database

---

# What this app is about.
---

[Find out the latest working version here.](https://agency-find-g8m369018-p-nblt.vercel.app/) For now it doesn't include the form and the crud features.

This application allows you to look for agencies that are hiring developers in the Netherlands. The coming version will add an authentification feature plus the possibility to interact with the database whether you want to update an agency, add a new one or, delete the one which doesn't exist anymore. Your request will be then analyzed before it gets confirmed or rejected.

---

# Goal for this project
---

1. Decide between callback props and useContext for my components.
2. Build a form with React-hook-from, and design data validation with yup.
3. Implement a database with Prisma and SQLite and connect it to the frontend interface.

--- 

# Table of contents

---

- [App demo](#app-demo)
- [Used technologies and concepts](#used-technologies-and-concepts)

---

App demo
---

![demo](https://user-images.githubusercontent.com/98712114/196496480-c56a7562-6f31-410e-8312-2245cd7373c4.gif)

note: some of the features from this demo aren't available in the working version. I need to create an admin lvl inside my auth to control who and what is being modified.

# Used technologies and concepts
---
## 👇 Click links to see code sample in this project 👇

- [Next for UI building](https://github.com/P-NBLT/static-website-project/blob/main/pages/index.js)
- [Prisma to host and interact with the database (PostgresSQL)](https://github.com/P-NBLT/agency-find-job/blob/main/prisma/schema.prisma) 🐣
- [React-hook-form forthe form](https://github.com/P-NBLT/agency-find-job/blob/main/component/organism/AgencyForm/AgencyForm.js) 🐣
- [Yup for data validation (works with the form)](https://github.com/P-NBLT/agency-find-job/blob/main/validation/signup.js) 🐣

🐣 *New technology learned during this project*
