# Study-Record-List


## Summary
This is a basic study management application.
It provides the ability to add and delete study content and time.

## USAGE
1.Clone the project
```
git clone https://github.com/Kei-dev-1213/study-record-list.git
```
2.Move to the project directory
```
cd study-record-list
```
3.Set up the env file.Create an .env file in the root directory and set the following environment variables.
```
VITE_SUPABASE_URL='YOUR_SUPABASE_URL'
VITE_SUPABASE_ANON_KEY='YOUR_SUPABASE_ANON_KEY'
```
4.Install dependencies.
```
npm i
```
5.Launch the application
```
npm run dev
```

## Specification
1. When you start the application, a list of study records will be displayed (the total study time shown on the screen will be displayed at the bottom of the screen).
2. Enter the study contents and study time in the input fields, and click the "Register" button to add the entered study records to the list.
3. Click the "Delete" button next to the learning content to delete the corresponding learning content from the list.