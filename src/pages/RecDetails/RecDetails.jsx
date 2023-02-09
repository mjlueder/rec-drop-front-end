import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import CommentList from "../../components/CommentList/CommentList";
import Likes from "../../components/Likes/Likes";
import NewComment from "../../components/NewComment/NewComment";
import OwnerDate from "../../components/OwnerDate/OwnerDate";
import AddToPlaylist from "../../components/AddToPlaylist/AddToPlaylist";
import Icon from "../../components/Icon/Icon";
import styles from "./RecDetails.module.css"

import * as recService from '../../services/recService'

const RecDetails = ({ user, playlists, handleDeleteRec, handleAddToPlaylist, handleCreatePlaylist, handlePageChange, updateRecState }) => {
  const {id} = useParams()
  const [rec, setRec] = useState(null)
  const [playlistExpand, setPlaylistExpand] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    handlePageChange()
  }, [])

  const handleAddComment = async (commentData) => {
    const newComment = await recService.createComment(id, commentData)
    setRec({...rec, comments: [...rec.comments, newComment]})
  }

  const handleAddLike = async () => {
    const updatedRec = await recService.like(id)
    setRec(updatedRec)
  }

  const handleDeleteComment = async (recId, commentId) => {
    await recService.deleteComment(recId, commentId)
    setRec({...rec, comments: rec.comments.filter((c) => c._id !== commentId)})
  }

  const handlePlaylistExpand = () => {
    setPlaylistExpand(!playlistExpand)
  }

  useEffect(() => {
    const fetchRec = async () => {
      const data = await recService.show(id)
      setRec(data)
    }
    fetchRec()
  }, [id])

  const displayCreatorLabel = () => {
    if (rec.category === 'Movie' || rec.category === 'TV Show') {
      return 'Director'
    } else if (rec.category === 'Song' || rec.category === 'Album') {
      return 'Artist'
    } else if (rec.category === 'Book') {
      return 'Author'
    }
  }

  return ( 
    <main className={styles.main}>  
      {rec 
        ? <>
            <div className={styles.pageTop}>
              <div className={styles.content}>
                <div className={styles.contentLeft}>
                  <h2>{rec.title}</h2>
                  {rec.creator && <h3>{displayCreatorLabel(rec)}: {rec.creator}</h3>}
                  {rec.year && <h4>Year: {rec.year}</h4>}
                  {rec.genre && <h4>Genre: {rec.genre}</h4>}
                </div>
                <div className={styles.contentRight}>
                  <Icon category={rec.category} />
                  <OwnerDate authorInfo={rec}/>
                </div>
                <div className={styles.contentMid}>
                  {rec.description && 
                    <p className={`${rec.photo 
                      ? `${styles.wPhoto}` 
                      : `${styles.woPhoto}`}`}>
                        {rec.description}
                    </p>}
                  {rec.photo && 
                    <img src={rec.photo} alt=""  
                      className={`${rec.description 
                        ? `${styles.wDescription}` 
                        : `${styles.woDescription}`}`}
                    />}
                </div>
                {rec.owner._id === user.profile &&
                  <div className={styles.contentFooter}>
                    <Link to={`/recs/${id}/edit`} state={rec}>
                      <div className={styles.likeToolTip}>
                        <Icon category='Edit'/>
                      </div>
                    </Link>
                    <div className={styles.delToolTip} onClick={() => handleDeleteRec(id)}>
                      <Icon category='Delete'/>
                    </div>
                  </div>
                }
              </div>
              <div className={styles.buttonContainer}>
                <Likes 
                  user={user} 
                  handleAddLike={handleAddLike} 
                  likes={rec.likes}
                />
                <AddToPlaylist 
                  user={user} 
                  rec={rec} 
                  playlistExpand={playlistExpand} 
                  handlePlaylistExpand={handlePlaylistExpand} 
                  playlists={playlists}
                  handleAddToPlaylist={handleAddToPlaylist}
                  handleCreatePlaylist={handleCreatePlaylist}
                />
              </div>
            </div>
            <div className={styles.commentContainer}>
              <h2>Comments</h2>
              <NewComment 
                handleAddComment={handleAddComment} 
              />
              <CommentList 
                recId={id}
                user={user}
                comments={rec.comments}
                handleDeleteComment={handleDeleteComment}
                recOwner={rec.owner}
              />
            </div>
          </>
        : <h2 className={styles.h2}>Loading...</h2>
      }
    </main>
  );
}

export default RecDetails;