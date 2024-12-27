import React, { Component } from "react";
import { ErrorMessageHandling } from "../../components/error.js";
import { Link } from "react-router-dom";
import "./document.css";
import DocFilter from "./docfilter.js";
import DocCard from "./docCard.js";
import { useState, useEffect } from "react";
import api from "../../api/api";
import { connect } from "react-redux";
import Header from "../../components/header";
import NoDocument from "./noDocument";
import BASEURL from "../../api/url";
import config from "../../config";
import { getMimeType } from "./function";
import Vimeo from "../../components/popupVimeo/vimeo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../components/loader";
import base64 from "base-64";
import AudioPlayer from "../../services/AudioPlayer";
// import URL from '../../api/url';

class Document extends React.Component {
  constructor() {
    super();
    this.state = {
      subject_id: "",
      subjects: [],
      documents: [],
      document_type: "",
      filemap: {},
      vimeo_video_downlodable: false,
      vimeo_download_links: [],
      open_modal: false,
      flag: false,
      audioFlag: false,
      audiofileName: "",
      type: "",
      videoID: "",
      youtubeVideoID: "",
      file_name: "",
      vimeo_video_id: "",
    };
  }
  audiocancle = (audioFlag) => {
    this.setState({ audioFlag });
  };

  componentDidMount() {
    let is_open_user =
      this.props.auth.user_type == 99 || this.props.auth.user_type == "99"
        ? true
        : false;
    let url = "";
    if (is_open_user == false) {
      url =
        "/api/v1/fileShare/" +
        this.props.auth.institute_id +
        "?student_id=" +
        this.props.auth.student_id;
    } else {
      url =
        "/api/v1/fileShare/" +
        this.props.auth.institute_id +
        "?user_id=" +
        this.props.auth.user_id;
    }
    let request = { url: url, token: this.props.auth.student_auth };
    api
      .getAuth(request)
      .then((data) => {
        let subject_id =
          data.data.result.subject_list.length == 0
            ? 0
            : is_open_user
            ? data.data.result.subject_list[0].course_id
            : data.data.result.subject_list[0].subject_id;
        this.setState({ subjects: data.data.result.subject_list, subject_id });
        this.fetchDocuments(subject_id);
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

  fetchDocuments = (subject_id) => {
    if (subject_id != 0) {
      let url = "";
      if (this.props.auth.user_type == 1 || this.props.auth.user_type == "1") {
        url =
          "/api/v1/fileShare/subject-level/" +
          this.props.auth.institute_id +
          "?student_id=" +
          this.props.auth.student_id +
          "&subject_id=" +
          subject_id +
          "&share_with=2";
      } else {
        url =
          "/api/v1/fileShare/subject-level/" +
          this.props.auth.institute_id +
          "?share_with=2&user_id=" +
          this.props.auth.user_id +
          "&eCourse_id=" +
          subject_id;
      }
      this.setState({ flag: true });
      let request = { url: url, token: this.props.auth.student_auth };
      api
        .getAuth(request)
        .then((data) => {
          this.setState({ flag: false });
          let docType = [
            "Assignment",
            "EBook",
            "Exam",
            "Other",
            "Vimeo",
            "Youtube",
          ];
          let allData = [];
          for (let index = 0; index < docType.length; index++) {
            let docData = data.data.result.fileMap[docType[index]];
            allData = [...allData, ...docData];
          }
          this.setState({
            documents: allData,
            filemap: data.data.result.fileMap,
            vimeo_video_downlodable: data.data.result.vimeo_video_downlodable,
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
            toast.error(ErrorMessageHandling(err));
          }
        });
    }
  };

  changeSubject = (subject_id) => {
    this.setState({ subject_id });
  };

  changeDocument = (document_type) => {
    this.setState({ document_type });
  };

  download = (el) => {
    let request = {
      url: `/api/v1/instFileSystem/downloadFile/${this.props.auth.institute_id}?fileId=${el.file_id}`,
      headers: {
        headers: {
          Authorization: this.props.auth.student_auth,
          Source: "WEB",

          //  "Content-Type": "video/mp4",
        },
        responseType: "blob",
      },
    };
    this.setState({ flag: true });
    api
      .getAuthVideo(request)
      .then((data) => {
        this.setState({ flag: false });
        let blob = new Blob([data.data], { type: getMimeType(el.file_name) });
        let dd = URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = dd;
        a.download = el.file_name;
        a.target = "_blank";
        a.click();
        URL.revokeObjectURL(a.href);
      })
      .catch((err) => {
        this.setState({ flag: false });
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

  youtubeVideo = (el) => {
    this.setState({
      audioFlag: true,
      type: "youtube",
      youtubeVideoID: base64.decode(el.proc_id),
    });
  };
  image = (el) => {
    this.setState({ type: "image", file_name: el.file_name, audioFlag: true });
  };

  view = (el) => {
    let fname = el?.file_url ?? "";
    fname = fname.split(".").pop();
    if (fname == "pdf" && this.props.auth.institute_id != 102617) {
      window.open("https://viewpdf.proctur.com/?fileurl=" + el.file_url);
    } else {
      this.setState({
        type: "file",
        file_name: `${
          BASEURL[config.env].PROCTUR_API_URL
        }/api/v1/instFileSystem/${
          this.props.auth.institute_id
        }/files/download?fileId=${el.file_id}`,
        audioFlag: true,
      });
    }
  };

  vimeo = (el) => {
    this.setState({
      type: "vimeo",
      vimeo_video_id: el.vimeo_video_id,
      audioFlag: true,
    });
  };

  UpdatVimeoWatchCall = (el, inst) => {
    let request = {
      url: `/api/v1/instFileSystem/update-watch-count`,
      token: this.props.auth.student_auth,
      data: {
        video_id: el.vimeo_video_id,
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

  downloadvimeo = (el) => {
    let request = {
      url: `/prod/vimeo/download-links/${el.vimeo_video_id}`,
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
  render() {
    const data = [];
    const {
      documents,
      filemap,
      document_type,
      vimeo_download_links,
      open_modal,
    } = this.state;
    return (
      <>
        <div>{this.state.flag && <Loader />}</div>

        {this.state.audioFlag && (
          <AudioPlayer
            audiofileName={this.state.audiofileName}
            audiocancle={this.audiocancle}
            type={this.state.type}
            videoID={this.state.vimeo_video_id}
            youtubeVideoID={this.state.youtubeVideoID}
            file_name={this.state.file_name}
          />
        )}

        <div>
          {open_modal && (
            <Vimeo
              vimeo_download_links={vimeo_download_links}
              open_modal={() => this.setState({ open_modal: false })}
            />
          )}
          <Header />
          <DocFilter
            {...this.state}
            changeSubject={this.changeSubject}
            changeDocument={this.changeDocument}
            onFilter={this.fetchDocuments}
            is_open_user={
              this.props.auth.user_type == 99 ||
              this.props.auth.user_type == "99"
                ? true
                : false
            }
          />
          <div className="doc-card-main-div">
            <div className="doc-card-container">
              {documents.length > 0 &&
                documents.map((item, index) => (
                  <DocCard
                    key={index}
                    el={item}
                    // image_subject={item.subject_name}
                    // heading_name={item.title}
                    // date={item.student_file_share_date}
                    // class_name={item.subject_name}
                    // thumbnail_list={item.thumbnail_list}
                    // posterUrl={item.posterUrl}
                    // type={item.standard_name}
                    // category_name={item.category_name}
                    filter={this.onFilter}
                    // file_name={item.file_name}
                    // category_name={item.category_name}
                    document_type={this.state.document_type}
                    // video_url={item.video_url}
                    download={this.download}
                    view={this.view}
                    downloadvimeo={this.downloadvimeo}
                    UpdatVimeoWatchCall={this.UpdatVimeoWatchCall}
                    image={this.image}
                    vimeo={this.vimeo}
                    youtubeVideo={this.youtubeVideo}
                    vimeo_video_downlodable={this.state.vimeo_video_downlodable}
                    // size={item.size}
                  />
                ))}
              {((filemap &&
                filemap[document_type] &&
                filemap[document_type].length == 0) ||
                documents.length == 0) && <NoDocument />}
            </div>
          </div>
          <ToastContainer />
        </div>
      </>
    );
  }
}

//  export default Document;

const mapStateToProps = (state) => ({ auth: state.auth });
export default connect(mapStateToProps)(Document);
