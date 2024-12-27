import play from '../../../assets/timetable/play_icon.png'
import download from '../../../assets/timetable/download_icon.png'
import cross2 from '../../../assets/timetable/cross_icon.png'

function TtDownloadpopups(props) {
  return (
    <div className='entire_download_popup_container_tt'>
      <div className='inner_container_tt_popup_2'>
        <div className='top_inner_container_download_popup_tt'>
          <div className='cross_icon_2_tt_rec'>
            <img src={cross2} onClick={props.onCancel}></img>
          </div>
          <div className='left_top_div_tt_popup2'>
            <p>
              <h5>View Recording</h5>
            </p>
            <div className='horizontal_line_tt_popup2'></div>
          </div>
          <div className='right_top_div_tt_popup2'></div>
        </div>
        <div className='bottom_inner_container_download_popup_tt'>
          <div className='content1_container_table_tt_popup2'>
            <div className='content1_left_container_table_tt_popup2'>
              Illustrator Banner Design Live calss for 12th_ Lecture
              1Introduction
              <p>
                <div>21-06-2021 &nbsp;12:47:23 &nbsp;&nbsp;&nbsp;</div>
                <div className='black_dot_container_tt_popup2'>
                  <div className='circle_dot_tt_popup2'></div>
                </div>
                <div> &nbsp;&nbsp;&nbsp;1 Hour&nbsp;&nbsp;&nbsp;</div>
                <div className='black_dot_container_tt_popup2'>
                  <div className='circle_dot_tt_popup2'></div>
                </div>
                <div>&nbsp;&nbsp;&nbsp;340.12 MB</div>
              </p>
            </div>
            <div className='content1_right_container_table_tt_popup2'>
              <div className='tt_popup2_play_image'>
                <img src={play}></img>{' '}
              </div>
              <div className='tt_popup2_download_image'>
                <img src={download}></img>
              </div>
            </div>
          </div>
        </div>
        <div className='bottom_inner_container_download_popup_tt'>
          <div className='content1_container_table_tt_popup2'>
            <div className='content1_left_container_table_tt_popup2'>
              Illustrator Banner Design Live calss for 12th_ Lecture
              1Introduction
              <p>
                <div>21-06-2021 &nbsp;12:47:23 &nbsp;&nbsp;&nbsp;</div>
                <div className='black_dot_container_tt_popup2'>
                  <div className='circle_dot_tt_popup2'></div>
                </div>
                <div> &nbsp;&nbsp;&nbsp;1 Hour&nbsp;&nbsp;&nbsp;</div>
                <div className='black_dot_container_tt_popup2'>
                  <div className='circle_dot_tt_popup2'></div>
                </div>
                <div>&nbsp;&nbsp;&nbsp;340.12 MB</div>
              </p>
            </div>
            <div className='content1_right_container_table_tt_popup2'>
              <div className='tt_popup2_play_image'>
                <img src={play}></img>{' '}
              </div>
              <div className='tt_popup2_download_image'>
                <img src={download}></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default TtDownloadpopups