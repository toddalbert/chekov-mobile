import { useState } from 'react'
import { Input, Button, HStack } from 'native-base'

export default function TodoHeader({ setTodos, user }) {
  const [newItem, setNewItem] = useState('')

  const addItem = () => {
    if (!newItem) return
    const newTodoItem = {
      uid: user.uid,
      title: newItem,
    }
    fetch(`https://chekov-api-c11.web.app/tasks/${user.uid}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newTodoItem),
    })
      .then(res => res.json())
      .then(data => {
        setTodos(data)
      })
      .catch(alert)
  }

  return (
    <HStack space={2}>
      <Input size="lg" color="coolGray.200" flex={1} onChangeText={setNewItem} value={newItem} placeholder='Add Task' />
      <Button
        borderRadius='sm'
        variant='solid'
        onPress={() => {
          addItem()
          setNewItem('')
        }}>Add</Button>
    </HStack>
  )
}
