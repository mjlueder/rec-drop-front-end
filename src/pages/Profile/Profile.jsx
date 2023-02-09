import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import * as profileService from '../../services/profileService'

import NarwhalProfile from '../../assets/narwhal-profile.jpg'
import PlaylistList from '../../components/PlaylistList/PlaylistList'
import { Link } from 'react-router-dom'
import styles from './Profile.module.css'

const Profile = ({ user, playlists, handlePageChange }) => {
  const {id} = useParams()

  const [profile, setProfile] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    handlePageChange()
  }, [])

  useEffect(() => {
    const fetchProfiles = async () => {
      const profileData = await profileService.getProfile(id)
      setProfile(profileData)
    }
    fetchProfiles()
  }, [id])

  return (
    <main className={styles.main}>
      {profile
        ? 
        <div className={styles.profileInfo}>
          <h1 className={styles.userName}>{profile.name}</h1>
          <img className={styles.profileImage} src={`${profile.photo ? profile.photo : NarwhalProfile}`} alt={profile.name}/>
          <Link to='/change-password'>
            Change Password
          </Link>
        </div>
        : <h2 className={styles.loading}>Loading...</h2>}
      
      <PlaylistList playlists={playlists}/>
    
    </main>
  )
}

export default Profile