import { useField } from '../hooks'

const CreateNew = ({ addNew }) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const handleReset = (e) => {
    e.preventDefault()
    content.onReset()
    author.onReset()
    info.onReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          content{' '}
          <input {...content} />
        </div>
        <div>
          author{' '}
          <input {...author} />
        </div>
        <div>
          url for more info{' '}
          <input {...info} />
        </div>
        <button type='submit'>create</button>
        <button type='reset'>reset</button>
      </form>
    </div>
  )
}

export default CreateNew