#  Kharj Yab (Expense Tracker)

![Preview](./Kharj-Yab.png)

Kharj Yab is a full-stack expense tracker application built with React, Node.js and MongoDB.

##  Features
- Add income and expenses
- View all transactions
- Delete transactions
- Calculate total balance
- Simple and clean user interface

##  Tech Stack
- React
- Node.js
- Express.js
- MongoDB

##  Installation

1. Clone the repository:
```

## Profile image storage on Render

Profile images are saved locally in `Backend/uploads` by default. Render's
filesystem is temporary, so add a persistent disk to the backend service and
set the `UPLOADS_DIR` environment variable to the disk mount path (for example,
`/var/data/uploads`). Mount the disk at `/var/data` so uploaded profile images
remain available after deploys and restarts.bash
git clone https://github.com/kamranshakib/expense-tracker.git
