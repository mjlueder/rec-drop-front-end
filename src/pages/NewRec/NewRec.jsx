import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const NewRec = ({ handleAddRec }) => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    category: '',
    title: '',
    creator: '',
    year: '',
    genre: ''
  })
  const [category, setCategory] = useState('')
  const [photoData, setPhotoData] = useState({})

  const handleChange = ({ target }) => {
    setForm({...form, [target.name]: target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleAddRec(form, photoData.photo)
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   try {
  //     await handleAddRec(form, photoData.photo)
  //     navigate('/recs')
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  const handleChangePhoto = (evt) => {
    setPhotoData({ photo: evt.target.files[0] })
  }

  const handleCategorySelect = ({ target }) => {
    setCategory(target.value)
    setForm({...form, 'category': target.value})
  }

  const displayCreatorLabel = () => {
    if (category === 'Movie' || category === 'TV Show') {
      return 'Director'
    } else if (category === 'Song' || category === 'Album') {
      return 'Artist'
    } else if (category === 'Book') {
      return 'Author'
    }
  }

  return ( 
    <main>
      <form onSubmit={handleSubmit}>
        <div>{!category && 'Select a category:'}</div>
        <label htmlFor="category-select">Category:</label>
        <select
          required
          name="category"
          id="category-select"
          onChange={handleCategorySelect}>
            <option value="">Select...</option>
            <option value="Movie">Movie</option>
            <option value="TV Show">TV Show</option>
            <option value="Song">Song</option>
            <option value="Album">Album</option>
            <option value="Book">Book</option>
        </select>
        {category && <div>
            <label htmlFor="title-input">Title:</label>
            <input 
              required
              type='text'
              name='title'
              id='title-input'
              value={form.title}
              placeholder={`${category} Title`}
              onChange={handleChange}
            />
            <label htmlFor="creator-input">{displayCreatorLabel()}:</label>
            <input 
              type='text'
              name='creator'
              id='creator-input'
              value={form.creator}
              placeholder={displayCreatorLabel()}
              onChange={handleChange}
            />
            <label htmlFor="year-input">Year:</label>
            <input 
              type='number'
              name='year'
              id='year-input'
              value={form.year}
              placeholder='Year'
              onChange={handleChange}
            />
            <label htmlFor="genre-input">Genre:</label>
            <input 
              type='text'
              name='genre'
              id='genre-input'
              value={form.genre}
              placeholder='Genre'
              onChange={handleChange}
            />
            <label htmlFor="photo-upload">
              Upload Photo
            </label>
            <input
              type="file"
              id="photo-upload"
              name="photo"
              onChange={handleChangePhoto}
            />
            <label htmlFor="description-input">Additional Comments:</label>
            <textarea 
              type='text'
              name='description'
              id='description-input'
              value={form.description}
              placeholder='Comment'
              onChange={handleChange}
            />
            <button type='submit'>SUBMIT</button>
          </div>
        }
      </form>
    </main>
  );
}

export default NewRec