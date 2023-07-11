import { useEffect } from 'react'
import { Center, Box, Heading, VStack, Checkbox, HStack, Text } from 'native-base'
import TodoHeader from './TodoHeader'

export default function TodoList({ todos, setTodos, user }) {

  useEffect(() => {
    if (user) {
      fetch(`https://chekov-api-c11.web.app/tasks/${user.uid}`)
        .then(res => res.json())
        .then(setTodos)
        .catch(alert)
    }
  }, [user])

  const handleItemUpdate = (id, title) => {
    const itemUpdate = {
      id,
      title,
    }
    fetch(`https://chekov-api-c11.web.app/tasks/${user.uid}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(itemUpdate),
    })
      .then(res => res.json())
      .then(data => {
        setTodos(data)
      })
      .catch(alert)
  }
  
  return (
    <Center w='100%'>
      <Box maxW='300' w='100%' bgColor='darkBlue.900'>
        <Heading mb='2' size='xl' textAlign='center' color='coolGray.200'>
          Chekov Todo
        </Heading>
        <VStack space={4}>
          <TodoHeader setTodos={setTodos} user={user} />
          {!todos ? (
            <Text>Loading...</Text>
          ) : (
            <VStack space={4}>
              {todos?.map(item => (
                <HStack w='100%' justifyContent='space-between' alignItems='center' key={item.id}>
                  <Checkbox
                    aria-label={item.title}
                    isChecked={item.isCompleted}
                    onChange={() => handleItemUpdate(item.id, item.title)}
                    value={item.done}></Checkbox>
                  <Text
                    width='100%'
                    fontSize={18}
                    flexShrink={1}
                    textAlign='left'
                    mx='2'
                    strikeThrough={item.isCompleted}
                    color={item.done ? 'coolGray.500' : 'coolGray.100'}
                    onPress={() => handleItemUpdate(item.id, item.title)}>
                    {item.title}
                  </Text>
                </HStack>
              ))}
            </VStack>
          )}
        </VStack>
      </Box>
    </Center>
  )
}
