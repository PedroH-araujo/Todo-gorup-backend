 - check the database
 - connect docker to the database

 authentication {
  - register
  - jwt token
 }

 - users table
 - tasks table
 - teams table

  - users table {
    id: uuid,
    name: string,
    email: string,
    password: string,
    created_at: timestamp,
    team_id: uuid,
  }

  - tasks table {
    id: uuid,
    title: string,
    description: string,
    user_id: [uuid],
    created_at: timestamp,
    created_by: uuid,
  }

  - teams table {
    id: uuid,
    name: string,
    description: string,
    created_at: timestamp,
  }