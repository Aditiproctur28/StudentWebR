import React from "react";
import StudymFilter from "../StudyM/studymfilter";
import StudyMNav from "../StudyM/studymnav";
import StudyMaterialCard from "../StudyM/studymaterialcard";
// import StudydocMaterial from '../StudyM/studydocmaterial';
import Header from "../../components/header";
import api from "../../api/api";
import { connect } from "react-redux";
import Loader from "../../components/loader";
import config from "../../config";
import { getMimeType } from "../DOC/function";
import { ErrorMessageHandling } from "../../components/error.js";
import { ToastContainer, toast } from "react-toastify";
import URL from "../../api/url";
import NoStudyMAterial from "./noStudyMaterial";
import { faCommentsDollar } from "@fortawesome/free-solid-svg-icons";
import AudioPlayer from "../../services/AudioPlayer";
import VideoCipherPlayer from "../../services/Videocipherplayer";
import Vimeo from "../../components/popupVimeo/vimeo";
import NoStudyMAterialmsg from "./NoStudyMaterialmsg";

class StudyMaterial extends React.Component {
  videoData = [];

  constructor(props) {
    super();
    this.state = {
      course_type: [],
      isPaid: "",
      selected_course: 0,
      search: "",
      subjects: [],
      Material_topic: [],
      loader: false,
      selectedtab: "StudyLibrary",
      audioFlag: false,
      audiofileName: "",
      search: "",
      searchfilterData: [],
      videocypher_playdata: "",
      otp: "",
      playbackInfo: "",
      type: "",
      videoID: "",
      youtubeVideoID: "",
      file_name: "",
      open_modal: false,
      vimeo_download_links: "",
      showMsg: true,
    };
  }
  selecttab = (selectedtab) => {
    this.setState({ selectedtab });
  };
  selectCourse = (selected_course) => {
    this.setState({ selected_course });
  };
  audiocancle = (audioFlag) => {
    this.setState({ audioFlag });
  };
  setsearch = (search) => {
    this.setState({ search });
  };
  changedmsg = () => {
    this.setState({ showMsg: true });
  };

  componentDidMount() {
    let is_open_user =
      this.props.auth.user_type == 99 || this.props.auth.user_type == "99"
        ? true
        : false;
    let url = "";
    if (is_open_user == false) {
      url =
        "/api/v1/instFileSystem/get-student-ecourses/" +
        this.props.auth.institute_id +
        "/" +
        this.props.auth.student_id +
        "?source=STUDENT_PORTAL";
    } else {
      url =
        "/api/v1/instFileSystem/get-student-ecourses/" +
        this.props.auth.institute_id +
        "/" +
        this.props.auth.user_id +
        "?source=STUDENT_PORTAL";
    }
    let request = { url: url, token: this.props.auth.student_auth };

    this.setState({ loader: true });
    api
      .getAuth(request)
      .then((data) => {
        this.setState({ course_type: data.data });
        this.setState({ loader: false });
      })
      .catch((err) => {
        if (err && err.response && err.response.status == 403) {
          {
            this.props.dispatch({
              type: "LOGOUT",
              msg: err.response.data.message,
            });
          }
        } else if (
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          toast.error(err.response.data.message);
        } else {
          toast.error(ErrorMessageHandling(err));
        }
      });
  }
  detailSubject = (el) => {
    this.setState({ showMsg: false });
    let request = {
      url: `/api/v1/instFileSystem/get-study-material`,
      token: this.props.auth.student_auth,
      data: {
        ecourse_id: el.course_type_id,
        institute_id: this.props.auth.institute_id,
        product_id: el.product_id,
      },
    };
    this.setState({ loader: true });
    api
      .postAuth(request)
      .then((data) => {
        this.setState({ subjects: data.data.result });
        this.setState({ loader: false });
      })
      .catch((err) => {
        if (err && err.response && err.response.status == 403) {
          {
            this.props.dispatch({
              type: "LOGOUT",
              msg: err.response.data.message,
            });
          }
        } else if (
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          toast.error(err.response.data.message);
        } else {
          toast.error(ErrorMessageHandling(err));
        }
      });
  };

  download = (el) => {
    window.open(el.file_name);
    let request = {
      url: `/api/v1/instFileSystem/fileDownloadCount`,
      headers: { Authorization: this.props.auth.student_auth, Source: "WEB" },
      data: {
        file_id: el.file_id,
        institute_id: this.props.auth.institute_id,
      },
    };
    api
      .postOther(request)
      .then((data) => {})
      .catch((err) => {
        if (err && err.response && err.response.status == 403) {
          {
            this.props.dispatch({
              type: "LOGOUT",
              msg: err.response.data.message,
            });
          }
        } else if (
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          toast.error(err.response.data.message);
        } else {
          toast.error(ErrorMessageHandling(err));
        }
      });
  };

  UpdatVimeoWatchCall = (el, inst) => {
    let request = {
      url: `/api/v1/instFileSystem/update-watch-count`,
      token: this.props.auth.student_auth,
      data: {
        video_id: el.videoID,
        institute_id: this.props.auth.institute_id,
      },
    };

    api
      .putAuth(request)
      .then((data) => {})
      .catch((err) => {
        if (err && err.response && err.response.status == 403) {
          {
            this.props.dispatch({
              type: "LOGOUT",
              msg: err.response.data.message,
            });
          }
        } else if (
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          toast.error(err.response.data.message);
        } else {
          toast.error(ErrorMessageHandling(err));
        }
      });
  };

  view = (el) => {
    let fname = el?.file_name ?? "";
    fname = fname.split(".").pop();
    if (fname == "pdf" && this.props.auth.institute_id != 102617) {
      window.open("https://viewpdf.proctur.com/?fileurl=" + el.file_name);
    } else {
      this.setState({ type: "file", file_name: el.file_name, audioFlag: true });
    }
  };

  listen = (el) => {
    this.setState({
      audioFlag: true,
      audiofileName: el.file_name,
      type: "audio",
    });
  };

  youtubeVideo = (el) => {
    this.setState({
      audioFlag: true,
      type: "youtube",
      youtubeVideoID: el.youtubeVideoID,
    });
  };

  vimeo = (el) => {
    this.setState({ type: "vimeo", videoID: el.videoID, audioFlag: true });
  };

  image = (el) => {
    // var myWindow = window.open("", "MsgWindow", "width=800,height=800");
    // myWindow.document.write("<image src='" + el.file_name + "' />");

    this.setState({ type: "image", file_name: el.file_name, audioFlag: true });
  };

  vdocipherApicalling = (el) => {
    let request = {
      url: "/api/v1/instFileSystem/videoOTP?source=IOS-APP",
      token: this.props.auth.student_auth,
      data: {
        videoID: el.videoID,
        institute_id: this.props.auth.institute_id,
        user_id: this.props.auth.user_id,
        file_id: el.file_id,
      },
    };
    api
      .postAuth(request)
      .then((data) => {
        if (
          data.status == 403 ||
          (data.data && data.data.status == 403) ||
          (data.data && data.data.statusCode == 403)
        ) {
          toast.error(data.data.message);
        } else if (data.status == 200 && data.data && data.data.otp) {
          console.log("vdo cipher", data);
        } else {
          toast.error(data.data.message);
        }
        this.setState({
          playbackInfo: data.data.playbackInfo,
          otp: data.data.otp,
          audioFlag: true,
          type: "vdo",
          videoID: el.videoID,
        });
      })
      .catch((err) => {
        if (err && err.response && err.response.status == 403) {
          {
            this.props.dispatch({
              type: "LOGOUT",
              msg: err.response.data.message,
            });
          }
        } else if (
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Network error");
        }
      });
  };

  downloadvimeo = (el) => {
    let request = {
      url: `/prod/vimeo/download-links/${el.videoID}`,
      headers: { "x-prod-inst-id": this.props.auth.institute_id },
    };
    api
      .getOther(request)
      .then((data) => {
        if (data.data.result.length === 0) {
          toast.error("No Download Link Found ");
        } else {
          this.setState({
            vimeo_download_links: data.data.result,
            open_modal: true,
          });
        }
      })
      .catch((err) => {
        if (err && err.response && err.response.status == 403) {
          {
            this.props.dispatch({
              type: "LOGOUT",
              msg: err.response.data.message,
            });
          }
        } else if (
          err.response &&
          err.response.data &&
          err.response.data.message
        ) {
          toast.error(err.response.data.message);
        } else {
          toast.error(ErrorMessageHandling(err));
        }
      });
  };

  combinedMap = (Study_Material_files, topic_name) => {
    //condition for undefined file return blank array
    //add topic name

    let combinedArray = [];
    if (Study_Material_files != undefined) {
      let availKey = Object.keys(Study_Material_files);
      for (let index = 0; index < availKey.length; index++) {
        let ObjArr = Study_Material_files[availKey[index]];
        for (let index2 = 0; index2 < ObjArr.length; index2++) {
          combinedArray = [
            ...combinedArray,
            { ...ObjArr[index2], type: availKey[index], topic_name },
          ];
        }
      }
    }
    this.setState({ Study_Material_files: combinedArray });
    return combinedArray;
  };

  onClickSubjects = (Material_topic) => {
    let arr = [];
    arr = [
      ...arr,
      ...this.combinedMap(
        Material_topic.studyMaterialMap,
        Material_topic?.topicName ?? ""
      ),
    ];

    if (Material_topic.subtopicList != undefined) {
      for (let i = 0; i < Material_topic.subtopicList.length; i++) {
        arr = [...arr, ...this.onClickSubjects(Material_topic.subtopicList[i])];
      }
    }
    this.setState({ Material_topic: arr });

    return arr;
  };

  render() {
    return (
      <div>
        <div>{this.state.loader && <Loader />}</div>
        {this.state.open_modal && (
          <Vimeo
            vimeo_download_links={this.state.vimeo_download_links}
            open_modal={() => this.setState({ open_modal: false })}
          />
        )}

        {this.state.audioFlag && (
          <AudioPlayer
            audiofileName={this.state.audiofileName}
            audiocancle={this.audiocancle}
            otp={this.state.otp}
            playbackInfo={this.state.playbackInfo}
            type={this.state.type}
            videoID={this.state.videoID}
            youtubeVideoID={this.state.youtubeVideoID}
            file_name={this.state.file_name}
          />
        )}
        <Header />
        <StudyMNav
          selecttab={this.selecttab}
          selectedtab={this.state.selectedtab}
          changedmsg={this.changedmsg}
        />

        <StudymFilter
          selectedtab={this.state.selectedtab}
          course_type={this.state.course_type}
          detailSubject={this.detailSubject}
          selectCourse={this.selectCourse}
          selected_course={this.state.selected_course}
          setsearch={this.setsearch}
          search={this.state.search}
        />
        {this.state.showMsg == true && (
          <NoStudyMAterialmsg
            selectedtab={this.state.selectedtab}
            course_type={this.state.course_type}
            subjects={this.state.subjects}
          />
        )}

        {this.state.subjects.length > 0 && this.state.course_type.length > 0 ? (
          <StudyMaterialCard
            selectedtab={this.state.selectedtab}
            subjects={this.state.subjects}
            onClickSubjects={this.onClickSubjects}
            Material_topic={this.state.Material_topic}
            download={this.download}
            selected_course={this.state.selected_course}
            view={this.view}
            downloadvimeo={this.downloadvimeo}
            vdocipherApicalling={this.vdocipherApicalling}
            listen={this.listen}
            image={this.image}
            UpdatVimeoWatchCall={this.UpdatVimeoWatchCall}
            youtubeVideo={this.youtubeVideo}
            vimeo={this.vimeo}
            search={this.state.search}
          />
        ) : (
          <NoStudyMAterial
            selectedtab={this.state.selectedtab}
            course_type={this.state.course_type}
            subjects={this.state.subjects}
            showMsg={this.state.showMsg}
          />
        )}
        <ToastContainer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ auth: state.auth });
export default connect(mapStateToProps)(StudyMaterial);
