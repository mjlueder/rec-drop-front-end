import styles from './Add.module.css'

const AddForm = (props) => {
  const { playlist, rec, handlePlaylistExpand, handleAddToPlaylist } = props

  const form = {
    title: playlist.title,
    recs: [...playlist.recs, rec._id]
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handlePlaylistExpand()
    handleAddToPlaylist(form, playlist._id)
  }
  
  return (
    <div className={styles.playlistCard}>
      <div className={styles.title}>{playlist.title}</div>
      <form onSubmit={handleSubmit} >
        <button className={styles.button}>+</button>
      </form>
    </div>
  )
}

export default AddForm