import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState, } from 'react';
import { Button } from "@/components/ui/button"

// API function to create a todo
async function createTodo(newTask) {
  const response = await fetch('http://localhost:5000/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTask),
  });
  if (!response.ok) throw new Error('Failed to create todo');
  return response.json();
}

export const Task = () => {

    const [task,setTask] = useState("")

    const queryClient = useQueryClient()

    const mutation  = useMutation({
        mutationFn:createTodo,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:['tasks']})
            
        }
    })

    const handleAdd =() =>{
        mutation.mutate({title:task,completed:false})
    }
  return (
    <div>
        <input type="text" onChange={(e) => setTask(e.target.value)} />
        <button onClick={handleAdd}>Add Task</button>
       <Button variant='default' size='sm'>Add Task</Button>
    </div>
  )
}
