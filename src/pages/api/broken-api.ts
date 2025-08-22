import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

// Intentional issues for testing
interface UserData {
  id: number;
  name: string;
  email: string;
  age?: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Issue 1: Unused import and variable
  const unusedVariable = "this will cause linting issues";
  
  // Issue 2: Missing error handling for file operations
  const dataPath = path.join(process.cwd(), 'nonexistent-file.json');
  const rawData = fs.readFileSync(dataPath, 'utf8');
  
  // Issue 3: Type assertion without proper validation
  const userData = JSON.parse(rawData) as UserData[];
  
  // Issue 4: Potential null/undefined access
  const firstUser = userData[0];
  console.log(firstUser.name.toUpperCase());
  
  // Issue 5: Missing return type and inconsistent returns
  if (req.method === 'GET') {
    res.status(200).json(userData);
  } else if (req.method === 'POST') {
    // Issue 6: No validation of request body
    const newUser = req.body;
    userData.push(newUser);
    
    // Issue 7: Async operation without await
    fs.writeFile(dataPath, JSON.stringify(userData), (err) => {
      if (err) throw err;
    });
    
    res.status(201);
  }
  
  // Issue 8: Missing default case and return
}

// Issue 9: Unreachable code
function deadCode() {
  return "This function is never called";
}