import dp_change from '../../assets/profile/dp_change_icon.png'
import profile_img2 from '../../assets/profile/profile_image2.png'

function ProfileImage() {
  return (
    <>
      <div className='image_div'>
        <div className='dp_change_icon'>
        </div>
        <div className='profile_image_div'>
          <img src={profile_img2}></img>
        </div>
      </div>
    </>
  )
}

export default ProfileImage
